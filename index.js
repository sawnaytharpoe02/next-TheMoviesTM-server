import { create, router as _router } from 'json-server';
import auth, { rewriter } from 'json-server-auth';
import cors from 'cors';

const app = create();
const router = _router('db.json');

// /!\ Bind the router db to the app
app.db = router.db;
const rules = rewriter({
  // Permission rules
  users: 660,
});

app.use(cors());
app.options('*', cors()); // Enable preflight requests
app.use(rules);
app.use(auth);
app.use(router);

// Custom middleware to set the Access-Control-Allow-Origin header
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.listen(3000);
