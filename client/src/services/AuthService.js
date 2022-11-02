import axios from 'axios';
import swal from "sweetalert";
import {
    loginConfirmedAction,
    logout,
} from '../store/actions/AuthActions';

export function signUp(name, email, password, confirm_password) {
    //axios call
    const postData = {
        name,
        email,
        password,
        confirm_password,
        returnSecureToken: true,
    };
    return axios.post(
        `http://localhost:8080/api/v1/register`,
        postData,
    );
}

export function login(username, password) {
    const postData = {
        username,
        password,
        // returnSecureToken: true,
    };
    return axios.post(
        `http://qa.conceptbiu.com/unifiedapi/users/authenticate`,
        postData,
    );
}

export function formatError(errorResponse) {
    switch (errorResponse) {
        case 'EMAIL_EXISTS':
            //return 'Email already exists';
            swal("Oops", "Email already exists", "error");
            break;
        case 'EMAIL_NOT_FOUND':
            //return 'Email not found';
           swal("Oops", "Email not found", "error",{ button: "Try Again!",});
           break;
        case 'INVALID_PASSWORD':
            //return 'Invalid Password';
            swal("Oops", "Invalid Password", "error",{ button: "Try Again!",});
            break;
        case 'SUCCESS_REGISTER':
            //return 'Invalid Password';
            swal("Good job!", "Successfully register", "success")
            break;
        case 'USER_DISABLED':
            return 'User Disabled';

        default:
            return '';
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    // tokenDetails.expireDate = tokenDetails.expires_at;
    localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, history) {
    setTimeout(() => {
        dispatch(logout(history));
    }, timer);
}

export function checkAutoLogin(dispatch, history) {
    const tokenDetailsString = localStorage.getItem('userDetails');
    let tokenDetails = '';
    if (!tokenDetailsString) {
        dispatch(logout(history));
        return;
    }

    // tokenDetails = JSON.parse(tokenDetailsString);
    // let expireDate = new Date(tokenDetails.expireDate);
    // let todaysDate = new Date();

    // if (todaysDate > expireDate) {
    //     dispatch(logout(history));
    //     return;
    // }
    dispatch(loginConfirmedAction(tokenDetails));

    // const timer = expireDate.getTime() - todaysDate.getTime();
    // runLogoutTimer(dispatch, timer, history);
}
