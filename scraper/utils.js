function deleteUntilFirstOccurence(str, char) {
  return str.substring(str.indexOf(char) + 1);
}

module.exports = {
  deleteUntilFirstOccurence
};
