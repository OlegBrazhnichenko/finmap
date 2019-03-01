export function login(data) {
  return {
    type: 'LOGIN',
    payload: {
      request:{
        method: "POST",
        url:'/login',
        data
      }
    }
  }
}

export function passwordRemind(email) {
  return {
    type: 'PASSWORD_REMIND',
    payload: {
      request:{
        method: "POST",
        url:'/password/recovery/forgot_password',
        data: {
          email
        }
      }
    }
  }
}

export function registration(data) {
  return {
    type: 'REGISTRATION',
    payload: {
      request:{
        method: "POST",
        url:'/registration',
        data
      }
    }
  }
}

export function resetNotifications(notificationObjectName) {
  return {
    type: "RESET_NOTIFICATIONS",
    notificationObjectName,
  }
}

