class WallsDestroyer extends Walker {
	constructor(worldMapGraph) {
		super(worldMapGraph);

		this.exitFound = false;
		this.path = [];
	}

	addToPath(id) {
		if ( !this.exitFound ) {
			this.path.push(id);
		}
	}

	checkIfLast(currentCell, lastCell) {
		if ( currentCell.id == lastCell.id ) {
			this.exitFound = true;
		}

		return this.exitFound;
	}

	clearPath() {
		this.exitFound = false;
		this.path = [];
	}

	removeLastFromPath() {
		if ( !this.exitFound ) {
			this.path.pop();
		}
	}

	destroyWalls(helper) {
		var currentCell = this.worldMapGraph.getVertex(0);
		var cellsCount = this.worldMapGraph.getVerticesCount();
		var lastCell = this.worldMapGraph.getVertex(cellsCount - 1);

		lastCell.destroyWall('right');
		lastCell.destroyWall('bottom');
		currentCell.destroyWall('left');
		currentCell.destroyWall('top');

		this.addVisited(currentCell.id);
		this.addToPath(lastCell.id);

		while ( this.visited.size != cellsCount ) {
			var cellsData = this.getAvailableCells(currentCell);
			var nextCellData = cellsData[helper.getRandomInt(0, cellsData.length - 1)];

			this.checkIfLast(currentCell, lastCell);

			if ( nextCellData === undefined ) {
				currentCell = this.worldMapGraph.getVertex(this.getLastFromHistory());
				this.removeLastFromHistory();
				this.removeLastFromPath();

				continue;
			}

			currentCell.destroyWall(nextCellData.direction);
			nextCellData.cell.destroyWall(nextCellData.cell.inverseDirection(nextCellData.direction));

			this.addToPath(currentCell.id);
			this.addToHistory(currentCell.id);
			this.addVisited(nextCellData.cell.id);

			currentCell = nextCellData.cell;
		}

		var path = this.path;

		this.clearPath();
		this.clearVisited();
		this.clearHistory();

		return path;
	}
}