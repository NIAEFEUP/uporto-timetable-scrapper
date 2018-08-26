import { login } from "./fetcher";
import { fetchAll } from "./runner";
// tslint:disable-next-line no-var-requires
const prompt = require("prompt");

interface Credentials {
  username: string;
  password: string;
}

async function getCredentials(): Promise<Credentials> {
  const schema = {
    properties: {
      username: {
        required: true
      },
      password: {
        required: true,
        hidden: true
      }
    }
  };

  return new Promise((resolve: (credentials: Credentials) => void, reject) => {
    prompt.start();
    prompt.get(schema, (error: any, result: Credentials) => {
      if (error) {
        reject(error);
      }

      resolve(result);
    });
  });
}

async function run() {
  const { username, password } = await getCredentials();

  await login(username, password);

  await fetchAll(2018, 1);
}

run();
