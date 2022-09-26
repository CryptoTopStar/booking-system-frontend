import { parseJSON } from 'date-fns';
import * as Auth from '../api/user'
const getErrorCode = code => Object.keys(messageMappings).includes(code) ? code : 'XXXXXXXXX'

const messageMappings = {
	XXXXXXXXX: '予期せぬエラーが発生しました。。しばらくしてから再実行してください',
	UserNotFoundException: 'ユーザー名かパスワードが誤っています',
	NotAuthorizedException: 'ユーザー名かパスワードが誤っています',
	InvalidParameterException: 'ユーザー名かパスワードが誤っています',
	TooManyRequestsException: '操作を完了できませんでした。しばらくしてから再実行してください',
	PasswordResetException: 'パスワードのリセットが必要です。管理者にお問い合わせください',
	CodeMismatchException: '検証コードが誤っています。再実行してください',
	LimitExceededException: '操作回数の上限に達しました。。しばらくしてから再実行してください',
	ExpiredCodeException: '検証コードの有効期限が過ぎています。再実行してください',
	CodeDeliveryFailureException: '検証コードの配信に失敗しました。しばらくしてから再実行してください',
	InvalidPasswordException: 'パスワードはアルファベット（大文字小文字混在）と数字と特殊記号を組み合わせて10文字以上で入力してください。',
};

async function signUp(username, password, email, telephone) {

	try {
		await Auth.signUp({
			username: username,
			password: password,
			email: email,
			telephone: telephone
		}).then((res) => { return res.status });
	} catch (error) {
		console.error('error signing up:', error);
		return {
			errorMessage: messageMappings[getErrorCode(error.code)]
		}
	}
}


async function signIn(email, password) {
	try {
		const user = await Auth.signIn({ email: email, password: password }).then((res) => {
			return res.data
		});
		localStorage.setItem('user', JSON.stringify(user));
		return user;
	} catch (error) {
		console.log('error signing in', error);
		return {
			errorMessage: messageMappings[getErrorCode(error.code)]
		}
	}
}

async function signOut() {
	localStorage.clear();
	sessionStorage.clear();
}

async function getUser() {
	let user = JSON.parse(localStorage.getItem('user'));
	return user.data[0];
}

const AuthService = {
	signIn,
	signUp,
	// confirmSignUp,
	// resendConfirmationCode,
	signOut,
	// forgotPassword,
	// forgotPasswordSubmit,
	getUser,
	// updateAttributes,
}

export default AuthService