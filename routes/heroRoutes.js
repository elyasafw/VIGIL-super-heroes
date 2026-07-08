import * as controller from "../controllers/heroController.js";

export const router = {
    GET: {
        "/health": controller.checkHealthServer,
        "/heroes": controller.getHeroes,
        "/health/:id": controller.searchHeroByID,
    },
};
