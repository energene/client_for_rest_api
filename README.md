# Refactored Angular CRUD
This is a two resource Angular CRUD client app backed by Mongo for data persistence.

## Running

### Install packages

```bash
> npm install
> cd client_for_rest_api
```

### Build assets

```bash
> gulp
```

### Start mongodb

```bash
> mongod --dbpath=./db
```

### Run backend server
open another terminal window

```bash
> node ./server/server.js
```

### Run client server
open a third terminal window

```bash
> node ./client/server.js
```

### CHECK IT OUT

```
open http://localhost:3000
```
