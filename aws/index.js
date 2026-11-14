import { createRequire } from 'node:module';

const [host, port] = (
  process.env.AWS_LAMBDA_HTTP_ENDPOINT || '0.0.0.0:3000'
).split(':');
process.env.HOSTNAME = host;
process.env.PORT = port;
process.env.NODE_ENV = 'production';
const require = createRequire(import.meta.url);
require('./app/server.js');
