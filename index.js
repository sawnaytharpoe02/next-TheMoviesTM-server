const jsonServer = require('json-server');
const auth = require('json-server-auth');

const app = jsonServer.create();
const router = jsonServer.router('db.json');
const cors = require('cors');
const helmet = require('helmet');

// /!\ Bind the router db to the app
app.db = router.db;
const rules = auth.rewriter({
  // Permission rules
  users: 660,
  movie_favorite: 660,
});

app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
// You must apply the middlewares in the following order
app.use(rules);
// You must apply the auth middleware before the router
app.use(auth);
app.use(router);
app.listen(3000);
