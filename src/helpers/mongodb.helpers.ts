import mongoose, { Connection } from 'mongoose'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

mongoose.set('toJSON', {
  virtuals: true,
  transform: (_: any, ret: any) => {
    const { _id, __v, ...object } = ret

    return object
  },
})

const uri = process.env.MONGO_URI as string

const connectionOptions = {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
}

export const createConnection = async (
  endPoint: string
): Promise<Connection> => {
  try {
    const collectionUri = `${uri}/${endPoint}`
    console.log(collectionUri)
    return await mongoose.createConnection(collectionUri, connectionOptions)
  } catch (e) {
    throw new Error(`Connection hasn't been created. ${e.message}`)
  }
}

export const disconnect = async (): Promise<void> => {
  try {
    await mongoose.disconnect()
  } catch (e) {
    throw new Error("Connection hasn't been disconnected")
  }
}

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(uri, connectionOptions)
  } catch (e) {
    throw new Error("Connection hasn't been disconnected")
  }
}

export const client = new MongoClient(uri)
