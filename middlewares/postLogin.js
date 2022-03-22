const { generateToken } = require('../helpers/generateToken');

const postLogin = (_req, res) => res.status(200)
.json({ token: generateToken });

module.exports = {
  postLogin,
};