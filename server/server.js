'use strict';

import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import http from 'http';
import sillyname from 'sillyname';
import compression from 'compression';
import socketIo from 'socket.io';
import stamp from 'console-stamp';

stamp(console, 'HH:MM:ss.l');

const port = process.env.PORT || 3000;
const app = express();

// view engine
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '..', 'dist'));

// compression
app.use(compression());

// cors, rest
app.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
 res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
 next();
});

// frontend cache
app.use(express.static(path.join(__dirname, '..', 'dist'), { 
  redirect: false, 
  maxAge: 86400000, /* one day */
}));

// for passport
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// fallback
app.use((req, res) => {
  res.render('index'); 
});

const { io, server } = createServer();

function createServer () {
  const server = http.createServer(app);
  const io = socketIo.listen(server);
  server.listen(port, function() {
    console.log(`Listening on port ${port}`);
  });
  return { io, server }; 
}
