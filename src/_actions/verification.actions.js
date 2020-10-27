import { verificationConstants, PATH_CONSTANTS } from '../_constants';
import { verificationServices, routerService, userService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

var count = 0;
// login Action
function otpVerification(data) {
    // localStorage.setItem('phoneNumber',users.phoneNumber);
    function request(user) {
      return { type:verificationConstants.OTP_REQUEST, user };
    }
    function success(user) {
      return { type: verificationConstants.OTP_SUCCESS, user };
    }
    return (dispatch) => {
      dispatch(request(data));
      verificationServices.otpVerification(data).then(
        (details) => {
          console.log(details.results.user);
          console.log(details.success);
          if(!details.results.user.emailVerified){
            dispatch(success(details));
            history.push(PATH_CONSTANTS.LOGIN);
          } else {
            console.log("new user");
            dispatch(success(details));
            history.push(PATH_CONSTANTS.DASHBOARD);
          }
        },
        (error) => {
         count = count + 1;
          console.log(count)
          if(count === 4){
            history.push(PATH_CONSTANTS.LOGIN);
          } else{
            dispatch(alertActions.error(error.message));
          }
        },
      );
    };
  }

function emailVerification(data){
  function request(user) {
    return { type:verificationConstants.OTP_REQUEST, user };
  }
  function success(user) {
    return { type: verificationConstants.OTP_SUCCESS, user };
  }
  return (dispatch) => {
  dispatch(request(data));
  // userService.emailLogin(data).then(
  verificationServices.emailVerification(data).then(
    (data) => {
      console.log(data.results.user);
      console.log(data.success);
      if(!data.results.user.emailVerified){
        dispatch(success(data.results.user));
        // history.push(PATH_CONSTANTS.LOGIN);
      } else {
        console.log("new user")
        history.push(PATH_CONSTANTS.LOGIN);
      }
    },
    (error) => {
      dispatch(alertActions.error(error.message));
    },
  );
};
}

function newEmailVerification(data){
  function request(user) {
    return { type:verificationConstants.EMAIL_REQUEST, user };
  }
  function success(user) {
    return { type: verificationConstants.EMAIL_SUCCESS, user };
  }
  return (dispatch) => {
    dispatch(request(data));
    verificationServices.emailVerification(data).then(
      (data) => {
        console.log(data.success);
        dispatch(success(data));
        history.push(PATH_CONSTANTS.LOGIN);
      },
      (error) => {
        dispatch(alertActions.error(error.message));
      },
    );
  };
}

function resendOtp(data){
  function request(user) {
    return { type:verificationConstants.OTP_RESEND_REQUEST, user };
  }
  function success(user) {
    return { type: verificationConstants.OTP_RESEND_SUCCESS, user };
  }
  return (dispatch) => {
    dispatch(request(data));
    verificationServices.resendOtpServices(data).then(
      (data) => {
        console.log(data.success);
        dispatch(success(data));
      },
      (error) => {
        dispatch(alertActions.error(error.message));
      },
    );
  };
}

const verificationActions ={
    otpVerification,
emailVerification,
newEmailVerification,
resendOtp

}
  export  default verificationActions;