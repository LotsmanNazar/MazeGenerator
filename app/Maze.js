class Maze {
	constructor() {
		this.helper = new Helper();
		this.worldMap = new WorldMap(0, 0);
		this.walker = new WallsDestroyer(this.worldMap);

		this.path = [];
	}

	init() {
		this.generateMaze();
	}

	resize(rows, cols) {
		this.worldMap.rows = rows;
		this.worldMap.cols = cols;
	}

	generateMaze() {
		this.worldMap.generateWalls();
		this.path = this.walker.destroyWalls(this.helper);
	}
}