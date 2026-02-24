import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// On définit les chemins de manière absolue par rapport à la racine du projet (ng-ecommerce)
const rootFolder = process.cwd();
const browserDistFolder = path.join(rootFolder, "dist/ng-ecommerce/browser");
const serverDistFolder = path.join(rootFolder, "dist/ng-ecommerce/server");

// 1. Servir les fichiers statiques
app.use(express.static(browserDistFolder));

// 2. Handler SSR
app.all("*", async (req, res) => {
  try {
    // On importe le handler généré par Angular
    const { reqHandler } = await import(path.join(serverDistFolder, "server.mjs"));
    await reqHandler(req, res);
  } catch (err) {
    console.error("Erreur SSR :", err);
    res.status(500).send("Erreur interne du serveur");
  }
});

export default app;