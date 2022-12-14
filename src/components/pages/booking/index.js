import React from 'react';
import MediaQuery from 'react-responsive'
import moment from 'moment';
import { Stepper, Step, StepLabel, Box, Grid, Button, Typography } from '@mui/material';
import FullScreenDialog from "../../../templates/dialog/fullscreen"
import GlobalContext from '../../../context/global-context'
import { useForm } from "react-hook-form"
import useConfirm from '../../../hooks/useConfirm'
import SignInForm from '../auth/signin'
import Menu from './menu';
import ServiceForm from './service';
import Form from './form'
import Review from './review'
import AuthService from "../../../services/auth"
import BookingService from "../../../services/booking";
import Submit from "../../atoms/submit";
import Staff from './staff';
import Available from './Available';

const steps = ['Staff', "Service", 'Option', 'Date', 'Details', 'Review'];

function getStepContent(handleNext, step, form, control, setValue) {
	switch (step) {
		case 0:
			return <Staff handleNext={handleNext} />
		case 1:
			return <ServiceForm handleNext={handleNext} />;
		case 2:
			return <Menu handleNext={handleNext} />;
		case 3:
			return <Available handleNext={handleNext} form={form} />;
		case 4:
			return <Form form={form} control={control} setValue={setValue} />;
		case 5:
			return <Review form={form} />;
		default:
			throw new Error('Unknown step');
	}
}

/*****************************************
 * Booking Submit Settings *
 *****************************************/

async function getUser(_, confirm, handleClose) {
	return new Promise(async resolve => {
		await AuthService.getUser()
			.then(user => {
				if (user !== null) {
					resolve({ user: user })
				}
			})
			.catch(() => {
				confirm({ alert: true, description: 'セッションがタイムアウトしました。再度ログインしてください。' })
					.then(() => {
						handleClose();
					})
				resolve(false)
			})

	})
}

async function syncUser(data) {
	return new Promise(async resolve => {
		const phoneUpdate = !data.user?.attributes?.phone_number || data.user.attributes.phone_number !== `+81${data.tel}`
		const nameUpdate = !data.user?.attributes?.nickname || data.user.attributes.nickname !== data.userName
		if (phoneUpdate || nameUpdate) {
			// const response = await AuthService.updateAttributes(
			// 	data.user,
			// 	{
			// 		nickname: data.userName,
			// 		phone_number: `+81${data.tel}`,
			// 	},
			// )
		}
		resolve(true)
	})
}

async function book(data, confirm, handleClose, context) {

	return new Promise(async resolve => {
		let reservation = moment((data.date + ' ' + data.at.substr(0, 5)), 'YYYY-MM-DD HH:mm').toDate();
		let reservation_date = moment(reservation).format('YYYY-MM-DD HH:mm:ss');
		const description = data.request ? data.request : ''
		const body = [{
			menu_id: data.menu.id,
			user_id: data.user.id,
			reservation_date: reservation_date,
			staff_id: data.staff.id,
			description: description,
			service_id: data.service.id,
		}, { check: data.check }]
		const response = await BookingService.create(body)
		if (data.check) {
			context.startProcess()
			const response = await AuthService.getUserById(data.user.id)
				.finally(() => context.endProcess())
			if (response && response.errorMessage) {
				await confirm({ alert: true, description: response.errorMessage })
				return
			}
			context.updateState({
				signedIn: true,
				processing: false,
				session: response,
			})
		}
		if (response.status === 409) {
			confirm({ alert: true, html: true, description: (<>選択した時間に先約があります。別の時間を選択の上、再度予約してください。<br />予約できない場合はサロンへ直接へお問い合わせください。<br /></>) })
				.then(() => handleClose())
			resolve(false)
		}
		resolve(true)
	})
}

const submitMapping = {
	1: getUser,
	99: syncUser,
	5: book,
}

const defaultValues = {
	request: "",
	price: 0
}
const Index = ({ open, handleClose }) => {
	const context = React.useContext(GlobalContext);
	const confirm = useConfirm();
	const [form, setForm] = React.useState({});

	const [activeStep, setActiveStep] = React.useState(0);

	const { handleSubmit, clearErrors, control, setValue } = useForm(defaultValues);

	const doHandleClose = () => {
		clearErrors()
		setActiveStep(0);
		handleClose()
	};

	const handleNext = async data => {
		let info = {}
		const submitAction = submitMapping[activeStep];
		if (!!submitAction) {
			context.startProcess()
			const results = await submitAction({ ...form, ...data }, confirm, doHandleClose, context)
				.catch(() => doHandleClose())
				.finally(() => context.endProcess())
			if (!results) return false
			info = { ...results }
		}
		//const tax = 1.1
		const dateText = !!data?.date ? data.date + ' ' + data.at : form?.dateText
		const priceTaxExcluded = (data?.price ? data.price : 0)
		const price = Math.round(priceTaxExcluded)
		setForm(prevFormState => ({
			...prevFormState,
			...info,
			...data,
			dateText,
			priceTaxExcluded,
			priceTaxExcludedText: priceTaxExcluded.toLocaleString('ja-JP', { "style": "currency", "currency": "JPY" }),
			price,
			priceText: price.toLocaleString('ja-JP', { "style": "currency", "currency": "JPY" })
		}))
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	// For Sign in
	const [openSignin, setOpenSignin] = React.useState(true);

	const handleCloseSignin = () => {
		setOpenSignin(false)
		handleClose()
	};

	React.useEffect(() => {
		setOpenSignin(true)
	}, [openSignin]);

	const dialogContext = {
		title: "Booking",
		content: (
			<GlobalContext.Consumer>
				{context =>
				(<>
					{!context.state.signedIn && (
						<SignInForm open={openSignin} handleClose={handleCloseSignin} />
					)}
					{!!context.state.signedIn &&
						(<>
							{/* iPhoneX以下 */}
							<MediaQuery maxDeviceWidth={412}>
								<Stepper alternativeLabel activeStep={activeStep}>
									{steps.map((label) => (
										<Step key={label}>
											<StepLabel>{label}</StepLabel>
										</Step>
									))}
								</Stepper>
							</MediaQuery>
							{/* iPhoneX Plus以上 */}
							<MediaQuery minDeviceWidth={413}>
								<Stepper activeStep={activeStep} >
									{steps.map((label) => (
										<Step key={label}>
											<StepLabel>{label}</StepLabel>
										</Step>
									))}
								</Stepper>
							</MediaQuery>
							<>
								{activeStep === steps.length ? (
									<Box sx={{ display: 'flex', alignItems: 'center', height: '70vh', justifyContent: 'center', flexDirection: 'column' }}>
										<Typography variant="h5" gutterBottom>
											予約を受け付けました。
										</Typography>
										<Typography variant="subtitle1">
											サロンでお会いできるのを楽しみにしております。
										</Typography>
									</Box>
								) : (
									<>
										{getStepContent(handleNext, activeStep, form, control, setValue)}
										{3 < activeStep && (
											<div style={{ margin: '2vh 10vw', display: 'flex', justifyContent: 'flex-end', }} >
												{activeStep !== 0 && (
													<Button sx={{ marginRight: '10px' }} onClick={handleBack}>
														Back
													</Button>
												)}
												<Submit
													onClick={handleSubmit(handleNext)}
												>
													{activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
												</Submit>
											</div>
										)}
									</>
								)}
							</>
						</>)}
				</>)}
			</GlobalContext.Consumer>
		),
		action: (<>
			{activeStep === steps.length &&
				(<Grid container spacing={3}>
					<Grid item xs={12}>
						<Box display="flex" justifyContent="center" mb="1rem">
							<Button fullWidth size="large" variant="contained" onClick={doHandleClose} color="primary">
								閉じる
							</Button>
						</Box>
					</Grid>
				</Grid>)
			}
		</>)
	};

	return (
		<FullScreenDialog
			open={open}
			handleClose={doHandleClose}
			context={dialogContext}
		/>
	);
}

export default Index