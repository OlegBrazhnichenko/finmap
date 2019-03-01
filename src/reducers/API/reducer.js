import {REHYDRATE} from 'redux-persist/lib/constants';

const initialState = {
  token: "",
  passwordRemindNotification: {
    show: false,
    message: "",
    type: "",
  },
  loginNotification: {
    show: false,
    message: "",
    type: "",
  },
  registrationNotification: {
    show: false,
    message: "",
    type: "",
  }
};

export default function API (state = initialState, action) {
  switch(action.type) {
    case REHYDRATE:
      return {
        ...state,
        token: (action.payload && action.payload.API && action.payload.API.token ?
                                                        action.payload.API.token : "")
      };

    case "LOGIN" :
      return {
        ...state
      };
    case "LOGIN_SUCCESS" :
      return {
        ...state,
        token: action.payload.data.token
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        loginNotification: {
          show: true,
          message: (action.error.response.status === 404 ?
                  "Пользователь с таким email не найден" : "Пароль не верный"),
          type: "error",
        }
      };

    case "PASSWORD_REMIND":
      return {
        ...state,
      };
    case "PASSWORD_REMIND_SUCCESS":
      return {
        ...state,
        passwordRemindNotification: {
          show: true,
          message: action.payload.data.message,
          type: "success",
        }
      };
    case "PASSWORD_REMIND_FAIL":
      return {
        ...state,
        passwordRemindNotification: {
          show: true,
          message: "Пользователь с таким email не найден",
          type: "error",
        }
      };

    case "REGISTRATION":
      return {
        ...state
      };
    case "REGISTRATION_SUCCESS":
      return {
        ...state,
        token: action.payload.data.token
      };
    case "REGISTRATION_FAIL":
      return {
        ...state,
        registrationNotification: {
          show: true,
          message: (action.error.response.status === 402 && "Пользователь с таким email уже зарегестрирован в системе"),
          type: "error",
        }
      };

    case "RESET_NOTIFICATIONS":
      return {
        ...state,
        [action.notificationObjectName]: {
          ...state[action.notificationObjectName],
          show: false,
        }
      };

    default: return {...state};
  }
}
