import { readData, writeData } from "../services/heroService.js";

export async function getAllHeroes(req, res) {
    try {
        const allHeroes = await readData();
        res.end(allHeroes);
    } catch (error) {
        readData.statusCode = 500
        res.end(JSON.stringify({ error: `Internal Server Error - ${error}` }));
    }
}
