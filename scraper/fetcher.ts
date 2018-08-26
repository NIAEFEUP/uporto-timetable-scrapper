const Crawler = require("crawler");
import * as request from "request";

let cookie: string | undefined;

const crawler = new Crawler({
  forceUTF8: false,
  incomingEncoding: "latin1"
});

function get(url: string, cookieNeeded: boolean) {
  const headers: any = {};

  if (cookieNeeded) {
    headers.Cookie = cookie;
  }

  return new Promise((resolve: (html: string) => void, reject) => {
    crawler.queue({
      uri: url,
      headers,
      encoding: "latin1",
      callback: (error: any, res: any, done: () => void) => {
        if (error) {
          reject(error);
        }

        resolve(res.body);

        done();
      }
    });
  });
}

const LOGIN_URL = "https://sigarra.up.pt/feup/pt/vld_validacao.validacao";

export async function login(username: string, password: string) {
  return new Promise((resolve, reject) => {
    request.post(
      LOGIN_URL,
      {
        form: {
          p_user: username,
          p_pass: password,
          p_app: 162,
          p_amo: 55,
          p_address: "WEB_PAGE.INICIAL"
        }
      },
      (error, response, body) => {
        if (error) {
          reject(error);
        }

        const setCookies: string[] | undefined = response.headers["set-cookie"];

        if (
          !setCookies ||
          !setCookies.some(c => c.startsWith("SI_SESSION")) ||
          !setCookies.some(c => c.startsWith("SI_SECURITY"))
        ) {
          reject(
            new Error(
              `Cookies expected, but received ${JSON.stringify(setCookies)}`
            )
          );
          return;
        }

        cookie = setCookies.join("; ");

        resolve();
      }
    );
  });
}

export async function fetch(
  url: string,
  { cookieNeeded } = { cookieNeeded: false }
): Promise<string> {
  return get(url, cookieNeeded);
}
