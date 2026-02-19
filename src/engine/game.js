import { Input } from "./input.js";
import { WorldManager } from "../world/worldManager.js";
import { Player } from "../player/player.js";
import { SaveSystem } from "../systems/saveSystem.js";
import { DayNight } from "../systems/dayNight.js";
import { UI } from "../systems/ui.js";

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.resize();

        window.addEventListener("resize", () => this.resize());

        this.input = new Input();
        this.saveSystem = new SaveSystem();
        this.world = new WorldManager();
        this.player = new Player(100, 50);
        this.dayNight = new DayNight();
        this.ui = new UI(this);

        this.lastTime = 0;
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start() {
        requestAnimationFrame((t) => this.loop(t));
    }

    loop(timestamp) {
        const delta = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(delta);
        this.render();

        requestAnimationFrame((t) => this.loop(t));
    }

    update(delta) {
        this.dayNight.update(delta);
        this.player.update(this.input, this.world);
        this.world.update();
    }

    render() {
        this.ctx.fillStyle = this.dayNight.getSkyColor();
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.world.render(this.ctx);
        this.player.render(this.ctx);
        this.ui.render(this.ctx);
    }
}
