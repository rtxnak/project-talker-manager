const {
  readContentFile,
  // writeContentFile,
} = require('../helpers/readWriteFile');

const PATH_FILE = './talker.json';

const getTalker = async (_req, res) => {
    const talkers = await readContentFile(PATH_FILE) || [];
  
    res.status(200).json(talkers);
};

module.exports = {
  getTalker,
};