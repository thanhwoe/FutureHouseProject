import axios from "axios";
import * as actionTypes from "./actionTypes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { localhost } from "../../apiURL";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout =  () => {
  // removeFromAsyncStorage('token')
  // const token = AsyncStorage.getItem('token')
  // console.log(token + 'loutou')
  removeToken()
  // await AsyncStorage.removeItem('token')
  //  AsyncStorage.removeItem('expirationDate')
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

const removeToken = async ()=>{
  try{
      await AsyncStorage.removeItem('token')
  }
  catch(err){
      console.log(err)
  }
}

// export const checkAuthTimeout = expirationTime => {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(logout());
//     }, expirationTime * 1000);
//   };
// };

export const authLogin =  (username, password) => {
  return  (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${localhost}/rest-auth/login/`, {
        username: username,
        password: password
      })
      .then(async (res) => {
        const token = res.data.key;
        // const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        try{
          await AsyncStorage.setItem('token', token)
        } catch(e) {
          console.log(e)
        }

        //  AsyncStorage.setItem('expirationDate', expirationDate)
        dispatch(authSuccess(token));
        // dispatch(checkAuthTimeout(3600));
        // location.reload();

      })
      .catch(err => {
        console.log(JSON.stringify(err))
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(`${localhost}/rest-auth/registration/`, {
        username: username,
        email: email,
        password1: password1,
        password2: password2
      })
      .then(async (res) => {
        const token = res.data.key;
        // const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        await AsyncStorage.setItem('token', token)
        //  AsyncStorage.setItem('expirationDate', expirationDate)
        dispatch(authSuccess(token));
        // dispatch(checkAuthTimeout(3600));
        // location.reload();
      })
      .catch(err => {
        dispatch(authFail(err));
        console.log(err)
      });
  };
};

export const authCheckState = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('token');
    console.log(token, 'check')
    if (token === undefined) {
      dispatch(logout());
    } else {
      // const expirationDate = new Date( AsyncStorage.getItem('expirationDate'));
      // if (expirationDate <= new Date()) {
      //   dispatch(logout());
      // } else {
      dispatch(authSuccess(token));
      //   dispatch(
      //     checkAuthTimeout(
      //       (expirationDate.getTime() - new Date().getTime()) / 1000
      //     )
      //   );
      // }
    }
  };
};
