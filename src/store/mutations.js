export default {
  updateComments(state, payload) {
    state.comments.push(payload);
  },
  updateLoggedUserComments(state, payload) {
    state.users[state.loggedUserId].commentsIds.push(payload);
  },
  updateLoggedUserLikedArtworks(state, payload) {
    let alreadyPresent = false;
    for(let artworkId of state.users[state.loggedUserId].likedArtworks) {
      if(artworkId == payload) {
        state.users[state.loggedUserId].likedArtworks.splice(state.users[state.loggedUserId].likedArtworks.indexOf(artworkId), 1);
        alreadyPresent = true;
      }
    }
    if(!alreadyPresent) {
      state.users[state.loggedUserId].likedArtworks.push(payload);
    }
  },
  updateUsers(state, payload) {
    state.users.push(payload);
  },
  updateLoggedUserId(state, payload) {
    state.loggedUserId = payload;
  },
  updateLoginAlert(state, payload) {
    state.loginAlert = payload;
  },
  updateSignupSuccessfulAlert(state, payload) {
    state.signupSuccessfulAlert = payload;
  },
};