import { CONFIG } from "../config.js";
import { generateWorld } from "./worldGen.js";

export class WorldManager {
    constructor() {
        this.width = CONFIG.WORLD_WIDTH;
        this.height = CONFIG.WORLD_HEIGHT;
        this.tileSize = CONFIG.TILE_SIZE;
        this.tiles = generateWorld(this.width, this.height);
    }

    update() {}

    render(ctx) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const tile = this.tiles[x][y];
                if (tile !== 0) {
                    ctx.fillStyle = tile.color;
                    ctx.fillRect(
                        x * this.tileSize,
                        y * this.tileSize,
                        this.tileSize,
                        this.tileSize
                    );
                }
            }
        }
    }
}
