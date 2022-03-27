/* eslint-disable linebreak-style */
/**
 * Model defines a datatype's schema (kinda like class)
 */
import mongoose, { Schema, model } from 'mongoose';
import mongoolia from 'mongoolia';

const dotenv = require('dotenv');

dotenv.config();

export interface PersonModel {
  first_name: string,
  last_name: string,
  birthday: Date,
  gender: string,
  location: string,
  first_met: Date,
  how_we_met: string,
  interests: string[],
  organisation: string,
  social_media: Map<string, string>,
  image: Buffer,
  encounters: mongoose.Types.ObjectId[],
  time_updated: Date,
}

const schema = new Schema<PersonModel>({
  first_name: { type: String, required: true, algoliaIndex: true },
  last_name: { type: String, required: false, algoliaIndex: true },
  birthday: { type: Date, required: false },
  gender: { type: String, required: false, algoliaIndex: true },
  location: { type: String, required: false, algoliaIndex: true },
  first_met: { type: Date, required: false },
  how_we_met: { type: String, required: false, algoliaIndex: true },
  interests: { type: [String], required: false, algoliaIndex: true },
  organisation: { type: String, required: false, algoliaIndex: true },
  social_media: {
    type: Map, of: String, required: false, algoliaIndex: true,
  },
  image: { type: Buffer, required: false },
  encounters: { type: [mongoose.Types.ObjectId], required: false },
  time_updated: { type: Date, default: new Date(Date.now()), required: true },
});

schema.plugin(mongoolia, {
  appId: `${process.env.ALGOLIA_APP_ID}`,
  apiKey: `${process.env.ALGOLIA_SECRET_KEY}`,
  indexName: 'persons',
});

export default model<PersonModel>('Person', schema);
