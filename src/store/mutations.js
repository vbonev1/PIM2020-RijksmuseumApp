export default {
  updateComments(state, payload) {
    state.comments.push(payload);
  },
  updateLoggedUserComments(state, payload) {
    state.users[state.loggedUserId].commentsIds.push(payload);
  },
  updateLoggedUserLikedArtworks(state, payload) {
    let alreadyPresent = false;
    for (let artworkId of state.users[state.loggedUserId].likedArtworks) {
      if (artworkId == payload) {
        state.users[state.loggedUserId].likedArtworks.splice(state.users[state.loggedUserId].likedArtworks.indexOf(artworkId), 1);
        alreadyPresent = true;
      }
    }
    if (!alreadyPresent) {
      state.users[state.loggedUserId].likedArtworks.push(payload);
    }
  },
  updateUsers(state, payload) {
    state.users.push(payload);
    window.localStorage.setItem("users", JSON.stringify(state.users));

  },
  reassignUsers(state, payload){
    if (payload != null) {
    state.users = payload;
    }
    window.localStorage.setItem("users", JSON.stringify(state.users));
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
  updateArtworks(state, payload) {
    state.artworks.push(payload);
  },
  updateSets(state, payload) {
    state.sets.push(payload);
  },
  updateSetsContents(state, payload) {
    state.setsContents.push({
      id: payload.id,
      items: payload.items
    });
  },
  updateLoggedUserCommentedArtworks(state, payload) {
    state.users[state.loggedUserId].commentedArtworks.push(payload);
  },
  updateArtworkComments(state, payload) {
    for (let artwork of state.artworks) {
      if (artwork.id == payload.artworkId) {
        artwork.commentsIds.push(payload.commentId);
      }
    }
  },
  updateArtworkLikes(state, payload) {
    let unliked = true;
    for (let artworkId of state.users[state.loggedUserId].likedArtworks) {
      if (artworkId == payload) {
        unliked = false;
        for(let artwork of state.artworks) {
          if(artwork.id == payload) {
            artwork.likes++;
          }
        }
      }
    }
    if(unliked) {
      for(let artwork of state.artworks) {
        if(artwork.id == payload) {
          artwork.likes--;
        }
      }
    }
  }
};
