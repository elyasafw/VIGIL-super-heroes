import {
    readData,
    writeData,
    filteredData,
    sortData,
    paginateData,
    getHeroesByQuery,
} from "../services/heroService.js";

export async function getHeroes(req, res) {
    try {
        const allHeroes = await getHeroesByQuery(req.query);
        res.end(JSON.stringify(allHeroes, null, 4));
    } catch (error) {
        req.statusCode = 500;
        res.end(JSON.stringify({ error: `Internal Server Error - ${error}` }));
    }
}
