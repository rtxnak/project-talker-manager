const crypto = require('crypto');

const generateToken = crypto.randomBytes(8).toString('hex');

module.exports = {
  generateToken,
};

/*
Ideia do toString('hex')

https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/
 */