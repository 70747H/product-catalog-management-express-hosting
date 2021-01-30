import {EntryType} from './entry.type';

export type Request = {
  body: EntryType,
  params: { id: string }
}
