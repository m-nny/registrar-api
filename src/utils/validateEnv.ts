import { cleanEnv, str, port } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    MONGODB_URI: str(),
    PORT: port(),
  })
}

export default validateEnv;