import { Button, Grid, Paper, Stack, Typography, Box, Divider } from "@mui/material";
import React from "react";
import { FormBox } from "../../commonStyle/CommonStyle";
import GlobalContext from '../../context/global-context'
import {
	PayPalScriptProvider,
	PayPalButtons,
	usePayPalScriptReducer
} from "@paypal/react-paypal-js";


// const paypalScriptOptions = {
// 	"client-id":
// 		"AaUpVv8WDVM5uezwsQo79K6YBKmqm3EeLSOx5TFTX4RM2_ephwW68aJ4_ASXYPjbI8OyuXchwgkQ7bRl",
// 	currency: "USD"
// };
function PaypalButton() {
	/**
	 * usePayPalScriptReducer use within PayPalScriptProvider
	 * isPending: not finished loading(default state)
	 * isResolved: successfully loaded
	 * isRejected: failed to load
	 */
	const [{ isPending }] = usePayPalScriptReducer();
	const paypalbuttonTransactionProps = {
		style: { layout: "vertical" },
		createOrder(data, actions) {
			return actions.order.create({
				purchase_units: [
					{
						amount: {
							value: "0.01"
						}
					}
				]
			});
		},
		onApprove(data, actions) {
			/**
			 * data: {
			 *   orderID: string;
			 *   payerID: string;
			 *   paymentID: string | null;
			 *   billingToken: string | null;
			 *   facilitatorAccesstoken: string;
			 * }
			 */
			return actions.order.capture({}).then((details) => {
				alert(
					"Transaction completed by" +
					(details?.payer.name.given_name ?? "No details")
				);

				alert("Data details: " + JSON.stringify(data, null, 2));
			});
		}
	};
	return (
		<>
			{isPending ? <h2>Load Smart Payment Button...</h2> : null}
			<PayPalButtons {...paypalbuttonTransactionProps} />
		</>
	);
}

export default function MyInfo() {
	const context = React.useContext(GlobalContext);
	let user = {};
	if (context.signedIn) user = context.state.session;
	else user = JSON.parse(localStorage.getItem('user'));
	const [selectedImage, setSelectedImage] = React.useState(null);
	const [imageUrl, setImageUrl] = React.useState(null);
	React.useEffect(() => {
		if (selectedImage) {
			setImageUrl(URL.createObjectURL(selectedImage));
		}
	}, [selectedImage]);
	return (
		<Box margin='5% 15%'>
			<Grid container spacing={5} >
				<Grid item xs={12} lg={6}>
					<Paper>
						{imageUrl && selectedImage ? (
							<Box mb={3} textAlign="center">
								<img src={imageUrl} alt={selectedImage.name} height="100px" />
							</Box>
						) :
							<Box mb={3} textAlign="center">
								<img src="/avatar.jpg" alt="avatar" height="100px" />
							</Box>
						}
						<>
							<input
								accept="image/*"
								type="file"
								id="select-image"
								style={{ display: 'none' }}
								onChange={e => setSelectedImage(e.target.files[0])}
							/>
							<label htmlFor="select-image">
								<Button variant="contained" fullWidth color="primary" component="span">
									Upload Image
								</Button>
							</label>
						</>
					</Paper>
				</Grid>
				<Grid item xs={12} lg={6} >
					<Paper >
						<Typography sx={{ display: 'flex', justifyContent: 'center' }} variant="h5" gutterBottom>Contact info</Typography>
						<Stack spacing={3} padding='20px'>
							<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
								<Typography>Username:  </Typography>
								<Typography>{user.data[0].username}</Typography>
							</Box>
							<Divider />
							<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
								<Typography>Email address: </Typography>
								<Typography>{user.data[0].email}</Typography>
							</Box>
							<Divider />
							<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
								<Typography>Telephone number: </Typography>
								<Typography>{user.data[0].telephone}</Typography>
							</Box>
							<Divider />
							<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
								<Typography>Point:  </Typography>
								<Typography>{user.data[0].point}</Typography>
							</Box>
						</Stack>
					</Paper>
					<br />
					<Divider />
					<br />

					<Paper >
						<Typography sx={{ display: 'flex', justifyContent: 'center' }} variant="h5" gutterBottom>Payment method</Typography>
						<PayPalScriptProvider>
							<PaypalButton />
						</PayPalScriptProvider>
					</Paper>
				</Grid>
			</Grid>
		</Box>

	)


}