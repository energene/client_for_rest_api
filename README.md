# react
This is a two resource CRUD client app using the Angular framework and backed by Mongo for data persistence. Karma is used as the test framework.

## Running

### Install packages
First, clone the app to your machine and navigate to the app's root directory. Then, install the npm packages, like so:
```bash
> npm install
```

### Build assets
Now, build the assets the app will need to function.
```bash
> ./node_modules/.bin/gulp
```

### Start mongodb
Start up the database.
```bash
> mongod --dbpath=./db
```

### Run backend server
Open up another terminal window, navigate to the root, and run the server like so:
```bash
> node ./server/server.js
```

### Run client server
Open up a third terminal window, navigate to the root, and run the server like so:
```bash
> node ./client/client_server.js
```

### Run linter
Open up a fourth terminal window, navigate to the root, and run the linter like so:
```bash
> gulp lint
```

### CHECK IT OUT
Go to your browser.
```
open http://localhost:9999
```
