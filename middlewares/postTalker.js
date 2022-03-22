const {
  readContentFile,
  writeContentFile,
} = require('../helpers/readWriteFile');

const PATH_FILE = './talker.json';

const postTalker = async (req, res) => {
  const createdTalker = req.body;
  const talkers = await readContentFile(PATH_FILE) || [];
  createdTalker.id = (talkers.length + 1);
  talkers.push(createdTalker);
  writeContentFile(PATH_FILE, talkers);

  res.status(201).json(createdTalker);
};

module.exports = {
  postTalker,
};