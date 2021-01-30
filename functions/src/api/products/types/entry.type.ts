export type EntryType = {
  name: string
  description: string
  store: string
  _geoloc: {
    lat: number
    lng: number
  }
  tags: string[] | string
}
