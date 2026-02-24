import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Dossier browser Angular
const browserPath = path.join(
  __dirname,
  "../dist/ng-ecommerce/browser"
);

// Servir les fichiers statiques
app.use(express.static(browserPath));

// Import du SSR Angular
const { reqHandler } = await import(
  "../dist/ng-ecommerce/server/server.mjs"
);

// Toutes les autres routes → SSR
app.all("*", (req, res) => {
  reqHandler(req, res);
});

export default app;