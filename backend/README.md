# Backend

A Prisma backend that uses a local PosgreSQL db to interact with a Prisma server.

## Development

You'll need `yarn`, `docker-compose` and `prisma` globally installed to run the backend.

1. Start the Prisma server & postgres db

  ```bash
  docker-compose up
  ```

  If you want to run this process in the background (instead of having 2 tabs open):

  ```bash
  docker-compose up -d
  ```

2. Once the Docker containers have finished booting, start the node server

  ```bash
  yarn start
  ```

## Commands

* `yarn start` runs `docker-compose up` and starts GraphQL server on `http://localhost:4000`
* `yarn prisma <subcommand>` gives access to local version of Prisma CLI (e.g. `yarn prisma deploy`)
* `psql -h localhost -p 3001 -U prisma` Connect to the postgres server with postgresql cli.

## Troubleshooting

### Issues running `docker-compose up`

Try running `docker-compose down` (or `docker-compose kill`), then when that's finished, `docker-compose up`.

## Project structure

| File name | Description |
| :--  | :-- |
| `├── .env` | Defines environment variables |
| `├── .graphqlconfig.yml` | Configuration file based on [`graphql-config`](https://github.com/prisma/graphql-config) (e.g. used by GraphQL Playground).|
| `└── database` (_directory_) | _Contains all files that are related to the Prisma database service_ |\
| `├── prisma.yml` | The root configuration file for your Prisma database service ([docs](https://www.prismagraphql.com/docs/reference/prisma.yml/overview-and-example-foatho8aip)) |
| `└── datamodel.graphql` | Defines your data model (written in [GraphQL SDL](https://blog.graph.cool/graphql-sdl-schema-definition-language-6755bcb9ce51)) |
| `└── src` (_directory_) | _Contains the source files for your GraphQL server_ |
| `├── index.ts` | The entry point for your GraphQL server |
| `├── schema.graphql` | The **application schema** defining the API exposed to client applications  |
| `├── resolvers` (_directory_) | _Contains the implementation of the resolvers for the application schema_ |
| `└── generated` (_directory_) | _Contains generated files_ |
| `└── prisma-client` (_directory_) | The generated Prisma client |

## How this project was generated

Bootstraps the configuration for a new Prisma service (this is a temp folder in the process).

There will be some prompt options, you'll want to create a new PostgreSQL database, and no need to generate a Prisma client.

```bash
prisma init tmp
```

Use [graphql-cli](https://github.com/graphql-boilerplates) to bootstrap a new GraphQL project using a boilerplate seed project. This project is using typescript-graphql-server.

By default the app will be connecting to a public Prisma cluster.

```bash
graphql create backend
```

Next move the docker-compose.yml from the temp Prisma service we created to use the configurations for creating our own database.

```bash
mv tmp/docker-compose.yml backend
rm -r tmp
```

Configure the Prisma API endpoint to the local Prisma service that will be spun up by Docker instead of the public cluster in prisma/prisma.yml.

The port can be found in the docker-compose.yml prisma service port. It should be 4466 by default.

```bash
endpoint: http://localhost:4466
```

Configure docker-compose.yml with postgres ports. The second port number should be the same as the docker-compose.yml prisma service database postgres connector port.

```bash
ports
 # "<local port you want to access it on>:<port its running inside the container>"
 - "3001:5432"
```
