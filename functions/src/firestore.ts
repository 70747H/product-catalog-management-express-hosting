import * as functions from 'firebase-functions';
import {index} from './config/algolia';


export const onAddProduct = functions.firestore
    .document('products/{productId}')
    .onCreate(async (snapshot, context) => {
      const data = snapshot.data();
      return index.saveObject({objectID: data.id, ...data, _geoloc: data._geoloc});
    });

export const onUpdateProduct = functions.firestore
    .document('products/{productId}')
    .onUpdate(async (change) => {
      const newData = change.after.data();
      return index.saveObject({objectID: change.after.id, ...newData, _geoloc: newData._geoloc});
    });

export const onDeleteProduct = functions.firestore
    .document('products/{productId}')
    .onDelete(async (snapshot, context) => {
      index.deleteObject(snapshot.id);
    });
