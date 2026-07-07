import { readData, writeData } from "../services/heroService.js";

export function getAllHeroes(req, res) {
    try {
        const allHeroes = readData();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(allHeroes));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
}
