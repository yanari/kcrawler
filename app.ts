import express from 'express';
import bodyParser from 'body-parser';

import parserController from './controllers/parser';

const app = express();

app.use(bodyParser.json());

app.post('/', parserController);

app.listen(3000);
