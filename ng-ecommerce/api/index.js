export default async (req, res) => {
    const { reqHandler } = await import('../dist/ng-ecommerce/server/server.mjs');
    return reqHandler(req, res); 
}