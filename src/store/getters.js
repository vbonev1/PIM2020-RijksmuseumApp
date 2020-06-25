export default {
  getComments: state => state.comments,
  getUsers: state => state.users,
  getLoggedUserId: state => state.loggedUserId,
  getLoggedUser: state => state.users[state.loggedUserId],
  getUserById: (state) => (id) => state.users[id],
  getLoginAlert: state => state.loginAlert,
  getSignupSuccessfulAlert: state => state.signupSuccessfulAlert,
  getPersonalAssessments: state => state.personalAssessments,
  getArtworks: state => state.artworks,
  getSets: state => state.sets,
  getSetsContents: state => state.setsContents,
  getArtworkById: (state) => function (id) {
    for (let artwork of state.artworks) {
      if (artwork.id == id) {
        return artwork
      }
    }
  }
};
