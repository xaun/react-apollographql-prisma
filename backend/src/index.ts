import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import { Client } from 'pg'
import resolvers from './resolvers'

// Connecting to PG client to run SQL directly
const client = new Client({
  database: 'prisma',
  user: 'prisma',
  password: 'prisma',
  host: 'localhost',
  port: 3001
})

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma,
  }),
})

const startServer = async () => {
  await client.connect()
  server.start(() => console.log(`Server is running on http://localhost:4000`))
}

startServer()
