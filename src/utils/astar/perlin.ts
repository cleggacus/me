type Vect2 = [x: number, y: number];

const smooth = (x: number) => {
    return (6 * (x ** 5)) - (15 * (x ** 4)) + (10 * (x ** 3));
}

const dotProd = (v1: Vect2, v2: Vect2) => {
    return v1[0]*v2[0] + v1[1]*v2[1];
}

const difference = (v1: Vect2, v2: Vect2): Vect2 => {
    return [v2[0]-v1[0], v2[1]-v1[1]];
}

const createPerlinGrid = (width: number, height: number) => {
    let perlinGrid: Vect2[][] = [];

    for(let y = 0; y < height; y++) {
        perlinGrid.push([]);
        for(let x = 0; x < width; x++) {
            let theta = Math.random() * 2 * Math.PI;

            perlinGrid[y].push([
                Math.cos(theta),
                Math.sin(theta)
            ])
        }
    }

    return perlinGrid;
}

const perlin = (width: number, height: number, perlinWidth: number, perlinHeight: number) => {
    const perlinGrid = createPerlinGrid(perlinWidth, perlinHeight);

    let grid: boolean[] = [];

    for(let y = 0; y < height; y++) {
        const perlinY = (y/height) * (perlinHeight-1);

        const y1 = Math.floor(perlinY);
        const y2 = Math.ceil(perlinY);


        for(let x = 0; x < width; x++) {
            const perlinX = (x/width) * (perlinWidth-1);

            const perlinPos: Vect2 = [perlinX, perlinY];

            const x1 = Math.floor(perlinX);
            const x2 = Math.ceil(perlinX);

            const p1 = perlinGrid[y1][x1];
            const p2 = perlinGrid[y2][x1];
            const p3 = perlinGrid[y1][x2];
            const p4 = perlinGrid[y2][x2];

            const p1d = difference([x1, y1], perlinPos);
            const p2d = difference([x1, y2], perlinPos);
            const p3d = difference([x2, y1], perlinPos);
            const p4d = difference([x2, y2], perlinPos);

            const p1p = dotProd(p1, p1d);
            const p2p = dotProd(p2, p2d);
            const p3p = dotProd(p3, p3d);
            const p4p = dotProd(p4, p4d);

            const a = p1p + smooth(p1d[0]) * (p3p - p1p);
            const b = p2p + smooth(p2d[0]) * (p4p - p2p);
            const c = a + smooth(p1d[1]) * (b - a);

            grid.push(c > 0.1);
        }
    }

    return grid
}

export default perlin;
