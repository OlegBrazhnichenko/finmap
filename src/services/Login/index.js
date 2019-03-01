export const isLoggedIn = (store) => {
  return new Promise((resolve, reject) => {
    if(store.getState() && store.getState().API.token) {
      resolve();
    }
    reject();
  });
};

export const RouteAuthorizedOnly = (store) => {
  return (nextState, replaceWith, callback) => {
    isLoggedIn(store).then(() => {
      callback();
    }).catch(() => {
      replaceWith('/login');
      callback();
    });
  };
};

export const RouteGuestOnly = (store) => {
  return (nextState, replaceWith, callback) => {
    isLoggedIn(store).then(() => {
      replaceWith('/main-page');
      callback();
    }).catch(() => {
      callback();
    });
  };
};
