export function generateWorld(width, height) {
    const tiles = [];

    for (let x = 0; x < width; x++) {
        tiles[x] = [];
        const ground = 90 + Math.floor(Math.sin(x * 0.05) * 10);

        for (let y = 0; y < height; y++) {
            if (y > ground) {
                if (Math.random() < 0.02) {
                    tiles[x][y] = { type: "ore", color: "#999" };
                } else {
                    tiles[x][y] = { type: "dirt", color: "#654321" };
                }
            } else {
                tiles[x][y] = 0;
            }

            if (Math.random() < 0.02 && y > ground) {
                tiles[x][y] = 0;
            }
        }
    }

    return tiles;
}
