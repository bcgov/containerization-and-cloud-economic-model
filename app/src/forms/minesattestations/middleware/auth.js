const currentUser = async (req, res, next) => {
  try {
    const {preferred_username: username, name, email } = req.kauth.grant.access_token.content;
    req.currentUser = {username: username, name: name, email: email};
  } catch (err) {
    req.currentUser = {username: 'public', name: 'public', email: undefined};
  }
  next();
};

module.exports.currentUser = currentUser;
