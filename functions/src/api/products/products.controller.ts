import {Response} from 'express';
import {db} from '../../config/firbase';
import {PRODUCTS_COLLECTION_NAME} from '../../constants';
import {productConverter} from './converters/product.converter';
import {Request} from './types/request.type';

const getAllEntries = async (req: Request, res: Response) => {
  try {
    const querySnapshot = (await db
        .collection(PRODUCTS_COLLECTION_NAME)
        .withConverter(productConverter).get())
        .docs
        .map((doc) => doc.data());
    return res.status(200).json(querySnapshot);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getEntry = async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const productSnap = (await db
        .collection(PRODUCTS_COLLECTION_NAME)
        .withConverter(productConverter)
        .doc(id).get()).data();
    return res.status(200).json(productSnap);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const addEntry = async (req: Request, res: Response) => {
  let {name, description, store, _geoloc, tags} = req.body;
  if (!Array.isArray(tags)) {
    tags = tags.split(',');
  }
  try {
    const entry = db.collection(PRODUCTS_COLLECTION_NAME).doc();
    const productEntry = {
      id: entry.id,
      name,
      description,
      store: store,
      _geoloc: _geoloc,
      tags,
    };

    await entry.set(productEntry);

    res.status(200).send({
      status: 'success',
      message: 'product added successfully',
      data: productEntry,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateEntry = async (req: Request, res: Response) => {
  let {body: {name, description, store, _geoloc, tags}, params: {id}} = req;
  if (!Array.isArray(tags)) {
    tags = tags.split(',');
  }

  try {
    const entry = db.collection(PRODUCTS_COLLECTION_NAME).doc(id);
    const currentData = (await entry.get()).data() || {};
    const entryObject = {
      id: id,
      name: name || currentData.name,
      description: description || currentData.description,
      store: store || currentData.store,
      _geoloc: _geoloc || currentData._geoloc,
      tags: tags || currentData.tags,
    };

    await entry.set(entryObject).catch((error) => {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    });

    return res.status(200).json({
      status: 'success',
      message: 'product updated successfully',
      data: entryObject,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteEntry = async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const entry = db.collection(PRODUCTS_COLLECTION_NAME).doc(id);

    await entry.delete().catch((error) => {
      return res.status(400).json({
        status: 'error',
        message: error.message,
      });
    });

    return res.status(200).json({
      status: 'success',
      message: 'product deleted successfully',
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export {getAllEntries, getEntry, addEntry, updateEntry, deleteEntry};
