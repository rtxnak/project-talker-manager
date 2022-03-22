const router = require('express').Router();

const {
  isValidEmail,
  isValidPassword,
} = require('../middlewares/loginValidations');

const {
  isValidTalkerName,
  isValidTalkerAge,
  isValidTalkerTalk,
  isValidTalkerTalkDate,
  isValidTalkerTalkRate,
  isValidToken,
} = require('../middlewares/createTalkerValidation');

const { getTalker } = require('../middlewares/getTalker');
const { getTalkerSearch } = require('../middlewares/getTalkerSearch');
const { getTalkerID } = require('../middlewares/getTalkerID');
const { postLogin } = require('../middlewares/postLogin');
const { postTalker } = require('../middlewares/postTalker');
const { putTalkerID } = require('../middlewares/putTalkerID');
const { deleteTalkerID } = require('../middlewares/deleteTalkerID');

router.get(
  '/talker', 
  getTalker,
);

router.get(
  '/talker/search',
  isValidToken,
  getTalkerSearch,
);

router.get(
  '/talker/:id', 
  getTalkerID,
);

router.post(
  '/login', 
  isValidEmail, 
  isValidPassword,
  postLogin,
);

router.post(
  '/talker',
  isValidToken,
  isValidTalkerName,
  isValidTalkerAge,
  isValidTalkerTalk,
  isValidTalkerTalkDate,
  isValidTalkerTalkRate,
  postTalker,
);

router.put(
  '/talker/:id',
  isValidToken,
  isValidTalkerName,
  isValidTalkerAge,
  isValidTalkerTalk,
  isValidTalkerTalkDate,
  isValidTalkerTalkRate,
  putTalkerID,
);

router.delete(
  '/talker/:id',
  isValidToken,
  deleteTalkerID,
);

module.exports = router;
