import { readData, writeData } from "../services/heroService.js";

const currentData = await readData();

export async function getAllHeroes(req, res) {
    try {
        res.end(JSON.stringify(currentData, null, 4));
    } catch (error) {
        req.statusCode = 500;
        res.end(JSON.stringify({ error: `Internal Server Error - ${error}` }));
    }
}
