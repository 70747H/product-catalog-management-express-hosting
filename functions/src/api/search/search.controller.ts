import {Request, Response} from 'express';
import {index} from '../../config/algolia';

class AlgoliaHit {
  constructor(product: any) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.store = product.store;
    this._geoloc = product._geoloc;
    this.tags = product.tags;
  }

  id: string;
  name: string;
  description: string;
  store: {
    id: string;
    name: string;
  }
  _geoloc: {
    lat: number;
    lng: number;
  }
  tags: string[];
}

const search = async (req: Request, res: Response) => {
  try {
    let {search, lat, lng} = req.query;
    if (!search) {
      search='';
    }
    const hits = (await index.search(<string>search, {aroundLatLng: `${lat}, ${lng}`, aroundRadius: 5000})).hits;
    const results = hits.map((hit: any) => new AlgoliaHit(hit));
    return res.status(200).json(results);
  } catch (e) {
    console.log(e);
    return e;
  }
};

export {search};
