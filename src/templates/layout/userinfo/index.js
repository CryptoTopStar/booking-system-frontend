import React from "react"
import { SnackbarProvider } from 'notistack';
import { Helmet } from "react-helmet"
import { CssBaseline, DialogContent } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ConfirmProvider from '../../../context/confirmProvider'
import { GlobalStateProvider } from '../../../context/globalState'
import InfoHeader from "./header";
import { Outlet } from "react-router-dom";

const InfoLayout = () => {
	// const title = useDocumentTitle(location);
	return (
		<>
			<Helmet>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
				<title>My Information</title>
			</Helmet>
			<SnackbarProvider maxSnack={3}>
				<GlobalStateProvider>
					<ConfirmProvider>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<div style={{
								display: 'flex',
								height: '100%',
								overflow: 'hidden',
								width: '100%'
							}} >
								<InfoHeader />
								<CssBaseline />
								<div style={{
									display: 'flex',
									flex: '1 1 auto',
									overflow: 'hidden',
									paddingTop: 64,
								}}>
									<div style={{
										display: 'flex',
										flex: '1 1 auto',
										overflow: 'hidden'
									}} >
										<div style={{
											flex: '1 1 auto',
											height: '100%',
											overflow: 'auto'
										}}>
											<DialogContent>
												<Outlet />
											</DialogContent>
										</div>
									</div>
								</div>
							</div>
						</LocalizationProvider>
					</ConfirmProvider>
				</GlobalStateProvider>
			</SnackbarProvider>
		</>
	)
}
export default InfoLayout