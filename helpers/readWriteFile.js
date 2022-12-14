const fs = require('fs').promises;

const readContentFile = async (path) => {
  try {
    const content = await fs.readFile(path, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
};

const writeContentFile = async (path, content) => {
  try {
    await fs.writeFile(path, JSON.stringify(content));
    return content;
  } catch (error) {
    return null;
  }
};

module.exports = {
  readContentFile,
  writeContentFile,
};

// Retirado do Course - atividade 4 do bloco 22 de back-end