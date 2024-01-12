class Helper {
	getRandomInt(min, max) {
		var int = Math.random() * (max - min) + min;
  	return Math.round(int);
	}

	calculateWallsView(cell, cellSize) {
		var topLeftX = cell.col * cellSize;
		var topLeftY = cell.row * cellSize;

		var topRightX = topLeftX + cellSize;
		var topRightY = topLeftY;

		var bottomLeftX = topLeftX;
		var bottomLeftY = topLeftY + cellSize;

		var bottomRightX = topRightX;
		var bottomRightY = bottomLeftY;

		var walls = [];

		if ( cell.walls.top ) {
			walls.push({x1: topLeftX, y1: topLeftY, x2:topRightX, y2: topRightY});
		}

		if ( cell.walls.right ) {
			walls.push({x1:topRightX, y1: topRightY, x2: bottomRightX, y2: bottomRightY});
		}

		if ( cell.walls.bottom ) {
			walls.push({x1: bottomRightX, y1: bottomRightY, x2: bottomLeftX, y2: bottomLeftY});
		}

		if ( cell.walls.left ) {
			walls.push({x1: bottomLeftX, y1: bottomLeftY, x2: topLeftX, y2: topLeftY});
		}

		return walls;
	}

	calculatePathView(cell, cellSize) {
		var data = {
			x: cell.col * cellSize,
			y: cell.row * cellSize,
			r: cellSize / 4
		}

		return data;
	}
}