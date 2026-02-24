import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Dossier des fichiers statiques Angular
const browserDistFolder = path.join(__dirname, "../dist/ng-ecommerce/browser");
app.use(express.static(browserDistFolder));

// Import SSR handler
const { reqHandler } = await import("../dist/ng-ecommerce/server/server.mjs");

// Toutes les routes passent par le SSR
app.all("*", (req, res) => {
  reqHandler(req, res);
});

export default app;