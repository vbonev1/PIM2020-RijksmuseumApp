export default {
  getComments: state => state.comments,
  getUsers: state => state.users,
  getLoggedUser: state => state.users[state.loggedUserId],
  };
  