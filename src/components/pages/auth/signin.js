import React from 'react';
import { Button, Grid, TextField, Box, styled } from '@mui/material';
import { green } from '@mui/material/colors';
import SignUpForm from './signup';
import ForgotForm from './forgot';
import AuthService from "../../../services/auth";
import GlobalContext from '../../../context/global-context'
import { useSnackbar } from 'notistack';
import Password from "../../atoms/password";
import FormDialog from "../../../templates/dialog/form";
import { useForm } from "react-hook-form";
import useConfirm from '../../../hooks/useConfirm'


const SignInButton = styled(Button)(() => ({
    backgroundColor: green[500],
    '&:hover': {
        backgroundColor: green[700]
    }
}))

const SigninForm = ({ open, handleClose }) => {
    const confirm = useConfirm();
    const context = React.useContext(GlobalContext);

    const { enqueueSnackbar } = useSnackbar();
    const { register, handleSubmit, setValue, formState: { errors }, clearErrors } = useForm();

    const doHandleClose = () => {
        clearErrors()
        handleClose()
    };

    const doSubmit = async data => {
        context.startProcess()
        const response = await AuthService.signIn(data.email, data.password)
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
        enqueueSnackbar('ログインしました', { variant: 'success' })
        handleClose()
    };

    // for forgot password
    const [openForgot, setOpenForgot] = React.useState(false)

    const handleClickOpenForgot = () => {
        setOpenForgot(true);
    };

    const handleCloseForgot = () => {
        setOpenForgot(false);
    };

    // for sign up
    const [openSignup, setOpenSignup] = React.useState(false);

    const handleClickOpenSignup = () => {
        setOpenSignup(true);
    };

    const handleCloseSignup = () => {
        setOpenSignup(false);
    };

    const formContext = {
        title: "Sign in",
        fields: (
            <>

                <Grid item xs={12}>
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        variant='standard'
                        onChange={e => setValue("email", e.target.value)}
                    // {...register("username", { required: true })}
                    // error={Boolean(errors.username)}
                    // helperText={errors.username && "入力してください"}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Password
                        id="password"
                        name="password"
                        label="Password"
                        onChange={e => setValue("password", e.target.value)}
                    //   {...register("password", { required: true, minLength: 10 })}
                    // error={Boolean(errors.password)}
                    // helperText={errors.password && "10文字以上で入力してください"}
                    />
                </Grid>
            </>
        ),
        submitContext: {
            text: 'サインイン',
            handleSubmit: handleSubmit(doSubmit),
            aditional: (
                <>
                    {!process.env.GATSBY_DISABLE_SIGN_UP && (
                        <>
                            {/* <Box display="flex" justifyContent="center" mb="1rem">
                                <Button onClick={handleClickOpenForgot} color="primary">
                                    アカウントを忘れた場合
                                </Button>
                            </Box> */}
                            <Box display="flex" justifyContent="center" mb="1rem">
                                <SignInButton variant="contained" color="primary" onClick={handleClickOpenSignup}>
                                    新しいアカウントを作成
                                </SignInButton>
                            </Box>
                        </>)
                    }
                </>
            )
        }
    };

    return (
        <>
            <ForgotForm open={openForgot} handleClose={handleCloseForgot} />
            <SignUpForm open={openSignup} handleClose={handleCloseSignup} />
            <FormDialog
                open={open}
                handleClose={doHandleClose}
                title={formContext.title}
                fields={formContext.fields}
                submitContext={formContext.submitContext}
            />
        </>
    )
}

export default SigninForm