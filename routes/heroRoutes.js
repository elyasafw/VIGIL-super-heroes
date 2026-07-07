import * as controller from "../controllers/heroController.js";

export const router = {
    GET: {
        "/heroes": controller.getHeroes,
    },
};
