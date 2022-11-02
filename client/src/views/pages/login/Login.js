import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { EmailIcon, PasswordIcon, XCircle } from "../../../Icons/icons.component";
import "./login.sass";
import { loadingToggleAction,loginAction, loginConfirmedAction
} from '../../../store/actions/AuthActions';
import ConceptLogo from "../../../assets/images/conceptbiu-logo.png";
import signLeftImage from "../../../assets/images/signin-left-image.svg";
import {
    useNavigate
  
  } from "react-router-dom";

  import { post } from "../../../services/CommanService"
const Login = ({ history }) => {
    let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginBtnState, toggleLoginButtonState] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isInvalidSession, setIsInvalidSession] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // document.body.classList.add("loginPage");
    // const isInvalid = getCookie(INVALID_SESSION_KEY);
    // if (isInvalid) {
    //   setIsInvalidSession(true);
    //   deleteCookie(INVALID_SESSION_KEY);
    // }
    // return () => {
    //   document.body.classList.remove("loginPage");
    // };
  }, []);

  useEffect(() => {
    toggleLoginButtonState(email && password);
  }, [email, password]);

  const onInputChange = (event) => {
    const fieldValue = event.target.value.trim();
    if (event.target.name === "email") {
      setEmail(fieldValue);
    } else if (event.target.name === "password") {
      setPassword(fieldValue);
    }
  };

  const handleLoginFailure = ({ status, messsage }) => {
    // if (status === INCORRECT_INPUT || status === UNAUTHORIZED) {
    //   setLoginError(messsage || "Incorrect credentials");
    // }
  };

  const handleLogin = (evt = { preventDefault() {} }) => {
    evt.preventDefault();
    if (!email || !email.trim() || !password || !password.trim()) {
      return;
    }
    setIsLoading(true);
    setLoginError("");
    dispatch(loadingToggleAction(true));	
        dispatch(loginAction(email, password, navigate));
        setIsLoading(false);
    // post(`http://qa.conceptbiu.com/unifiedapi/users/authenticate`, {
    //   username: email,
    //   password: password,
    // })
    //   .then((response) => {
    //     // const {
    //     //   data: { status, result, messsage },
    //     // } = response || {};
    //     // if (status === SUCCESS) {
    //     //   setCookie({
    //     //     key: COOKIE.AUTH_TOKEN,
    //     //     value: result.token,
    //     //   });
    //     //   setCookie({
    //     //     key: COOKIE.CONCEPT_USER_ID,
    //     //     value: result.id,
    //     //   });
    //     //   setCookie({
    //     //     key: COOKIE.CONCEPT_USER_EMAIL,
    //     //     value: result.email,
    //     //   });

    //     //   setCookie({
    //     //     key: COOKIE.CONCEPT_USER_NAME,
    //     //     value: JSON.stringify({
    //     //       firstName: result.first_name,
    //     //       lastName: result.last_name,
    //     //     }),
    //     //   });
    //     dispatch(loginConfirmedAction(response.data));
    //     navigate('/dashboard')
    //     // } else {
    //     //   handleLoginFailure({ status, messsage });
    //     // }
    //   })
    //   .catch(() => {
    //     // handleLoginFailure({ status: UNAUTHORIZED });
    //   })
    //   .finally(() => setIsLoading(false));
  };
  return (
    <div className="loginWrap">
      {isInvalidSession && (
        <div className="alert alert-danger alert-dismissible mt-3">
          <button
            className="close"
            data-dismiss="alert"
            aria-label="close"
            onClick={(e) => {
              e.preventDefault();
              setIsInvalidSession(false);
            }}
          >
            &times;
          </button>
          Session expired, please login again.
        </div>
      )}
      <div className="loginSection">
        <div className="loginLeftImage">
          <img src={signLeftImage} alt="Signin Left Image" />
        </div>
        <div className="loginCard">
          <div className="logoWrap">
      
              <img
                src={ConceptLogo}
                alt="Concept BIU"
                
              />
         
            {/* <span>
              <img
                src={journolistLogo}
                alt="Journolist Logo"
                width="143"
                height="36"
              />
            </span> */}
          </div>
          <h3 className="heading"><span>Qualitative</span> Dashboard</h3>
          <h5>Sign in</h5>
          <p className="infoText">Please enter your credentials to proceed.</p>
          <form onSubmit={handleLogin}>
            <div className="form-group email">
              <EmailIcon />
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={onInputChange}
                required
              />
            </div>
            <div className="form-group password">
              <PasswordIcon />
              <input
                className="form-control"
                type="Password"
                name="password"
                onChange={onInputChange}
                required
              />
            </div>
            {/* <div className="passwordFormGroup">
              {loginError && (
                <div class="alert alert-danger customAlert">
                  <XCircle /> {loginError}
                </div>
              )}
              <a
                href=""
                className="forgotPasswordLink"
                onClick={(e) => {
                  e.preventDefault();
                  history.push(FORGOT_PASSWORD);
                }}
              >
                Forgot Password?
              </a>
            </div> */}
            <div className="form-group form-action">
              <input
                type="submit"
                className={
                  loginBtnState
                    ? "btn btnBlue clickable"
                    : "btn btnBlue disabled "
                }
                value={!isLoading ? "Sign in" : "Signing in..."}
              ></input>
              {/* <a
                href="#"
                onClick={() => {
                  window.open(
                    `https://clientportalold.conceptbiu.com/`,
                    "_blank"
                  );
                }}
                className="oldportalSignin"
              >
                Sign in to old Portal
              </a> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
