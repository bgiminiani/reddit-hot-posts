import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  connect: async (uri: string): Promise<void> => {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  disconnect: async (): Promise<void> => {
    await this.client.db().close()
  }
}
