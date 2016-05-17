# react
This is a single resource CRUD client app using the React framework and backed by Mongo for data persistence. Tests for all routes are included.

## Running

### Install packages

```bash
> npm install
```

### Install gulp

```bash
> npm install --save-dev gulp
```

### Build assets

```bash
> ./node_modules/.bin/gulp
```

### Start mongodb

```bash
> mongod --dbpath=./db
```

### Run server

```bash
> node ./server.js
```

### CHECK IT OUT

```
open http://localhost:5000
```

####Technologies:

  - React: Client-side framework (including React-router and React-dom) https://github.com/reactjs/react-tutorial
  - Gulp: Task runner
  - Webpack: Module bundler (plus Webpack-stream to run Webpack as a stream to conveniently integrate with Gulp)
  - Express: Server package  
  - Babel: Javascript compiler (including Babel-loader to transpile JS files using Babel and Webpack, and Babel-preset-react to transform JSX into createElement calls)
  - Mongoose: MongoDB object modeling tool designed to work in an asynchronous environment


####Dev Team:

    Kris Skelton
    Gene Troy
