import {
  formatError,
  login,
  runLogoutTimer,
  saveTokenInLocalStorage,
  signUp,
} from "../../services/AuthService";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_SUCCESS_ACTION = "[signup action] success signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";

export function signupAction(name, email, password, confirm_password, history) {
  return (dispatch) => {
    signUp(name, email, password, confirm_password)
      .then((response) => {
        const succesMessage = formatError("SUCCESS_REGISTER");
        dispatch(signupSuccessAction(succesMessage));
        history.push("/login");
        
      })
      .catch((error) => {
        const errorMessage = formatError("EMAIL_EXISTS");
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function logout(history) {
  localStorage.removeItem("userDetails");
  history.push("/login");
  return {
    type: LOGOUT_ACTION,
  };
}

export function loginAction(name, password, navigate) {
  

  return (dispatch) => {
    login(name, password)
      .then((response) => {
        console.log('response.data', response.data)
        if (response.status === 200) {
          saveTokenInLocalStorage(response.data.result);
          // runLogoutTimer(dispatch, 3600 * 1000, history);
          dispatch(loginConfirmedAction(response.data.result));
          navigate("/");
        } else {
          const errorMessage = formatError("INVALID_PASSWORD");
          dispatch(loginFailedAction(errorMessage));
        }
      })
      .catch((error) => {
        console.log('err', error)
        // const errorMessage = formatError("INVALID_PASSWORD");
        // dispatch(loginFailedAction(errorMessage));
      });
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function signupSuccessAction(message) {
    return {
      type: SIGNUP_SUCCESS_ACTION,
      payload: message,
    };
  }

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}
