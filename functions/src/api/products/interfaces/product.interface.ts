export interface ProductType {
  id: string,
  name: string,
  description: string,
  store: {
    id: string,
    name: string
  },
  _geoloc: {
    lat: number,
    lng: number
  },
  tags: string[]
}
