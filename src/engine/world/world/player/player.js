import { CONFIG } from "../config.js";

export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 30;
        this.velY = 0;
        this.speed = 3;
        this.inventory = {};
    }

    update(input, world) {
        if (input.isDown("a")) this.x -= this.speed;
        if (input.isDown("d")) this.x += this.speed;

        this.velY += CONFIG.GRAVITY;
        this.y += this.velY;

        if (this.y > 500) {
            this.y = 500;
            this.velY = 0;
        }

        if (input.isDown(" ") && this.velY === 0) {
            this.velY = -10;
        }

        if (input.mouseLeft) {
            this.mine(world, input.mouseX, input.mouseY);
        }

        if (input.mouseRight) {
            this.place(world, input.mouseX, input.mouseY);
        }
    }

    mine(world, mx, my) {
        const tx = Math.floor(mx / world.tileSize);
        const ty = Math.floor(my / world.tileSize);

        if (world.tiles[tx] && world.tiles[tx][ty]) {
            const type = world.tiles[tx][ty].type;
            this.inventory[type] = (this.inventory[type] || 0) + 1;
            world.tiles[tx][ty] = 0;
        }
    }

    place(world, mx, my) {
        const tx = Math.floor(mx / world.tileSize);
        const ty = Math.floor(my / world.tileSize);

        if (world.tiles[tx] && world.tiles[tx][ty] === 0) {
            if (this.inventory["dirt"] > 0) {
                world.tiles[tx][ty] = { type: "dirt", color: "#654321" };
                this.inventory["dirt"]--;
            }
        }
    }

    render(ctx) {
        ctx.fillStyle = "#00ffff";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
