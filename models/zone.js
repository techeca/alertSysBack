import mongoose from 'mongoose'

const { Schema } = mongoose;
const ZoneSchema = Schema({
  name: String,
  description: String
},
  {
    collection: 'zones'
  }
);

export const Zone = mongoose.model('Zone', ZoneSchema)
