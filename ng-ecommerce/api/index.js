import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Servir les fichiers statiques Angular
app.use(
  express.static(path.join(__dirname, "../dist/ng-ecommerce/browser"))
);

// Import SSR handler
const { reqHandler } = await import(
  "../dist/ng-ecommerce/server/server.mjs"
);

// Toutes les autres routes passent par Angular SSR
app.all("*", (req, res) => {
  reqHandler(req, res);
});

export default app;