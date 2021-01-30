import * as functions from 'firebase-functions';
import algoliasearch from 'algoliasearch';

const algo = algoliasearch(functions.config().algolia.appid, functions.config().algolia.apikey);
const index = algo.initIndex('products');

export {algo, index};
