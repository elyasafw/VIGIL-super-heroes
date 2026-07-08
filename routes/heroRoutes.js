import * as controller from "../controllers/heroController.js";

export const router = {
    GET: {
        "/health": controller.serverHealthReport,
        "/heroes": controller.getHeroes,
    },
};
