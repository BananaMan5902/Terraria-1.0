import { CONFIG } from "../config.js";

export class SaveSystem {
    saveWorld(slot, worldData) {
        if (slot < 1 || slot > CONFIG.MAX_WORLDS) return;
        localStorage.setItem("world_" + slot, JSON.stringify(worldData));
    }

    loadWorld(slot) {
        return JSON.parse(localStorage.getItem("world_" + slot));
    }

    deleteWorld(slot) {
        localStorage.removeItem("world_" + slot);
    }
}
