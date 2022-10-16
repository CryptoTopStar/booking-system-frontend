import React from 'react';
import { Stepper, Step, StepLabel, Box, Grid, Button, Typography } from '@mui/material';
import FullScreenDialog from "../../../templates/dialog/fullscreen"
import GlobalContext from '../../../context/global-context'
import { useForm } from "react-hook-form"
import useConfirm from '../../../hooks/useConfirm'
import Form from './updateForm'
import Review from './review'
import Submit from "../../atoms/submit"
import BookingService from "../../../services/booking"


// const useStyles = makeStyles((theme) => ({
//     stepper: {
//         padding: theme.spacing(1, 0, 3),
//     },
//     buttons: {
//         display: 'flex',
//         justifyContent: 'flex-end',
//     },
//     button: {
//         marginTop: theme.spacing(3),
//         marginLeft: theme.spacing(1),
//     },
// }));

const steps = ['Change', 'Review'];

function getStepContent(step, register, setValue, form, control) {
    switch (step) {
        case 0:
            return <Form register={register} setValue={setValue} form={form} control={control} />;
        case 1:
            return <Review form={form} />;
        default:
            throw new Error('Unknown step');
    }
}

const BookingChangeForm = ({ booking, open, handleClose }) => {

    React.useEffect(() => {
        setForm(booking)
    }, [booking]);

    const context = React.useContext(GlobalContext);
    const confirm = useConfirm();
    const [form, setForm] = React.useState({});

    const [activeStep, setActiveStep] = React.useState(0);

    const { register, setValue, handleSubmit, control } = useForm();

    const doHandleClose = () => {
        setActiveStep(0);
        handleClose()
    };

    const doReload = () => {
        window.location.reload()
    };


    const handleNext = async data => {
        // 予約変更
        if (activeStep) {
            const body = {
                ...form,
                reservation_id: data.reservation_id,
            }
            context.startProcess()
            const response = await BookingService.update(body)
            context.endProcess()
            if (response.status === 409) {
                confirm({ alert: true, html: true, description: (<>選択した時間に先約があります。予約表を参考に別の時間を選択の上、再度予約変更してください。<br />予約変更できない場合はサロンへ直接へお問い合わせください。<br /></>) })
                    .then(() => doHandleClose())
            }
        }
        // 予約編集
        else {
            let data = booking
            let updated = {}
            const tax = 1.1
            const dateText = !!data?.reservation_date
            const priceTaxExcluded = (form?.price ? form.price : 0)
            const price = Math.round(priceTaxExcluded * tax)
            setForm(prevFormState => ({
                ...prevFormState,
                ...updated,
                dateText,
                tax,
                priceTaxExcluded,
                priceTaxExcludedText: priceTaxExcluded.toLocaleString('ja-JP', { "style": "currency", "currency": "JPY" }),
                price,
                priceText: price.toLocaleString('ja-JP', { "style": "currency", "currency": "JPY" })
            }))
        }

        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const dialogContext = {
        title: "予約の変更",
        content: (<>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <>
                {activeStep === steps.length ? (
                    <>
                        <Typography variant="h5" gutterBottom>
                            予約を変更しました。
                        </Typography>
                        <Typography variant="subtitle1">
                            サロンでお会いできるのを楽しみにしております。
                        </Typography>
                    </>
                ) : (
                    <>
                        {getStepContent(activeStep, register, setValue, form, control)}
                        {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', }}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} >
                                    Back
                                </Button>
                            )}
                            <Submit
                                onClick={handleSubmit(handleNext)}

                            >
                                {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
                            </Submit>
                        </div> */}
                    </>
                )}
            </>
        </>),
        action: (<>
            {activeStep === steps.length &&
                (<Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" mb="1rem">
                            <Button fullWidth size="large" variant="contained" onClick={doReload} color="primary">
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

export default BookingChangeForm