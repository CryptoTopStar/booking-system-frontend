import React from "react"
import { SnackbarProvider } from 'notistack';
import { Helmet } from "react-helmet"
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../../../theme"
import Header from './header'
import Footer from './footer'
import ConfirmProvider from '../../../context/confirmProvider'
import InquiryProvider from '../../../context/inquiryProvider'
import { GlobalStateProvider } from '../../../context/globalState'
import useDocumentTitle from '../../../hooks/useDocumentTitle'

import "./layout.css"
import { Outlet } from "react-router-dom";

const Main = ({ location }) => {
	//const title = useDocumentTitle(location);
	const description = 'ネイルなDemo Salonで。オンライン予約もこちらから。'
	const url = 'https://festive-swartz-405bdc.netlify.app/'
	const imageUrl = 'https://thirosue.github.io/hosting-image/booking/screenshot.png'
	const title = 'Salon'
	return (
		<div>
			<Helmet>
				<html lang="ja" />
				<title>{title}</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
				<meta name="Description" content={description} />
				<meta property="og:site_name" content={process.env.GATSBY_SALON_NAME} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:type" content="website" />
				<meta property="og:locale" content="ja_JP" />
			</Helmet>
			<SnackbarProvider maxSnack={3}>
				<GlobalStateProvider>
					<ConfirmProvider>
						<ThemeProvider theme={theme}>
							<InquiryProvider>
								<Header />
								{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
								<CssBaseline />
								<Outlet />
								<Footer />
							</InquiryProvider>
						</ThemeProvider>
					</ConfirmProvider>
				</GlobalStateProvider>
			</SnackbarProvider>
		</div>
	)
}

export default Main