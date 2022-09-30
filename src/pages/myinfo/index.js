import { Button, Grid, Paper, Stack, Typography, Box } from "@mui/material";
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
	const [imageUrl, setImageUrl] = React.useState('/icon.png');
	React.useEffect(() => {
		if (selectedImage) {
			setImageUrl(URL.createObjectURL(selectedImage));
		}
	}, [selectedImage]);
	return (
		<Box sx={{
			display: 'flex',
			marginTop: '15vw',
			justifyContent: 'center',
			alignItems: 'center'
		}}>
			<Grid container spacing={3} >
				<Grid item xs={12} lg={4}>
					{/* <Paper>
						{imageUrl && selectedImage && (
							<Box mt={2} textAlign="center">
								<img src={imageUrl} alt={selectedImage.name} height="100px" />
							</Box>
						)}
						<>
							<input
								accept="image/*"
								type="file"
								id="select-image"
								style={{ display: 'none' }}
								onChange={e => setSelectedImage(e.target.files[0])}
							/>
							<label htmlFor="select-image">
								<Button variant="contained" color="primary" component="span">
									Upload Image
								</Button>
							</label>
						</>
					</Paper> */}
				</Grid>
				<Grid item xs={12} lg={3}>
					<Paper >
						<Stack spacing={3} padding='20px'>
							<Typography>Username: {user.data[0].username}</Typography>
							<Typography>
								Email address: {user.data[0].email}
							</Typography>
							<Typography>
								Telephone number: {user.data[0].telephone}
							</Typography>
							<Typography>
								Point: {user.data[0].point}
							</Typography>
						</Stack>
					</Paper>

				</Grid>
				<Grid item xs={12} lg={3}>
					<Paper >
						<PayPalScriptProvider>
							<PaypalButton />
						</PayPalScriptProvider>
					</Paper>

				</Grid>
			</Grid>
		</Box>

	)


}