const request = require("request");

function get(url, cookie) {
  const headers = {};

  if (cookie) {
    headers.Cookie =
      "cb-enabled=accepted; _pk_id.47.7cdc=0723f6fcc64d08b6.1535046715.2.1535054610.1535054610.; _pk_id.5.7cdc=4d8b6487f894ea0a.1535046715.2.1535054610.1535054610.; HTTP_SESSION=88836863; SI_SESSION=115321288; SI_SECURITY=8VxaUXaEatwaCx0";
  }

  return new Promise((resolve, reject) => {
    request(
      {
        url,
        headers,
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

async function fetch(url, { cookie } = { cookie: false }) {
  return get(url, cookie);
}

module.exports = {
  fetch
};
