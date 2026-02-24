import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

export default async (req, res) => {
    try {
        const serverPath = join(__dirname, '../dist/ng-ecommerce/server/server.mjs');
        const { reqHandler } = await import(serverPath);
        return reqHandler(req, res); 
    } catch (error) {
        console.error('Error loading server:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}