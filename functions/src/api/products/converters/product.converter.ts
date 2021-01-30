import firebase from 'firebase';
import {admin} from '../../../config/firbase';
import {ProductType} from '../interfaces/product.interface';

export const productConverter = {
  toFirestore(product: ProductType): firebase.firestore.DocumentData {
    return {id: product.id, name: product.name, description: product.description, store: product.store, _geoloc: product._geoloc, tags: product.tags};
  },

  fromFirestore(
      snapshot: admin.firestore.QueryDocumentSnapshot,
  ): ProductType {
    const data = snapshot.data()!;
    return {id: data.id, name: data.name, description: data.description, store: data.store, _geoloc: data._geoloc, tags: data.tags};
  },
};
