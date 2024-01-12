class Cell {
	constructor(row, col) {
		this.row = row;
		this.col = col;
		this.id = null;
		this.directions = {
			top: 'bottom',
			bottom: 'top',
			right: 'left',
			left: 'right'
		}

		this.walls = {
			top: true,
			right: true,
			bottom: true,
			left: true
		};
	}

	createWall(direction) {
		this.walls[direction] = true;
	}

	createWalls() {
		var direction = Object.keys(this.direction);
		for ( var i = 0; i < directions.length; i++ ) {
			this.createWall(directions[i]);
		}
	}

	destroyWall(direction) {
		this.walls[direction] = false;
	}

	destroyWalls() {
		var direction = Object.keys(this.direction);
		for ( var i = 0; i < directions.length; i++ ) {
			this.destroyWall(directions[i]);
		}
	}

	inverseDirection(direction) {
		return this.directions[direction];
	}
}