import express from 'express';
import { router } from './routes.js';
import { ensureSchema } from './schema.js';

const PORT = process.env.PORT ?? 4003;

const app = express();
/* Built-in middleware
  This parses an incoming request's body when its Content-Type is application/json,
  and attaches the result to req.body. */
app.use(express.json());
app.use(router);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'internal error' });
});

async function main() {
  await ensureSchema();
  app.listen(PORT, () => {
    console.log(`account-service listening on port ${PORT}`);
  });
}

main();