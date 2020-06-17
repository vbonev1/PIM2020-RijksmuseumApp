export default {
  updateComments(state, payload) {
    state.comments.push(payload);
  },
  updateLoggedUserComments(state, payload) {
    state.users[state.loggedUserId].commentsIds.push(payload);
  }
};
