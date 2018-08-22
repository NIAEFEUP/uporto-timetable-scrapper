const request = require("request");

function get(url) {
  return new Promise((resolve, reject) => {
    request(
      {
        url,
        encoding: "latin1"
      },
      (error, response, body) => {
        if (error) {
          reject(error);
        }

        resolve(body);
      }
    );
  });
}

async function fetch(url) {
  return get(url);
}

module.exports = {
  fetch
};
