import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import {
  addEntry,
  deleteEntry,
  getAllEntries,
  getEntry,
  updateEntry,
} from './products/products.controller';
import {PRODUCTS_COLLECTION_NAME} from '../constants';
import {search} from './search/search.controller';

const app = express();
app.use(cors({origin: true}));
app.get('/', (req, res) => res.status(200).send('Hey there!'));
/* start products endpoints */
app.get(`/${PRODUCTS_COLLECTION_NAME}`, getAllEntries);
app.get(`/${PRODUCTS_COLLECTION_NAME}/:id`, getEntry);
app.post(`/${PRODUCTS_COLLECTION_NAME}`, addEntry);
app.patch(`/${PRODUCTS_COLLECTION_NAME}/:id`, updateEntry);
app.delete(`/${PRODUCTS_COLLECTION_NAME}/:id`, deleteEntry);
/* end products endpoints */

/* start search endpoints */
app.get('/search', search);
/* end search endpoints */

export const api = functions.https.onRequest(app);
