import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const browserDistFolder = path.join(
  __dirname,
  "../dist/ng-ecommerce/browser"
);

// TRÈS IMPORTANT : servir les fichiers statiques AVANT le SSR
app.use(express.static(browserDistFolder));

const { reqHandler } = await import(
  "../dist/ng-ecommerce/server/server.mjs"
);

// Toutes les autres routes passent au SSR
app.all("*", (req, res) => {
  reqHandler(req, res);
});

export default app;