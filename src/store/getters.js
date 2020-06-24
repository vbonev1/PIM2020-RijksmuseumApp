export default {
  getComments: state => state.comments,
  getUsers: state => state.users,
  getLoggedUserId: state => state.loggedUserId,
  getLoggedUser: state => state.users[state.loggedUserId],
  getLoginAlert: state => state.loginAlert,
  getSignupSuccessfulAlert: state => state.signupSuccessfulAlert,
  };
  