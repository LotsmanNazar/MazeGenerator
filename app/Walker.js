class Walker {
	constructor(worldMapGraph) {
		this.worldMapGraph = worldMapGraph;
		this.visited = new Map();
		this.history = [];
	}

	addVisited(id) {
		this.visited.set(id, true);
	}

	isVisited(id) {
		return this.visited.has(id);
	}

	clearVisited() {
		this.visited.clear();
	}

	getAvailableCells(currentCell) {
		var arr = [];

		var directions = Object.keys(currentCell.directions);
		for ( var i = 0; i < directions.length; i++ ) {
			var cell = this.worldMapGraph.getNextTo(currentCell.id, directions[i]);

			if ( cell !== undefined && !this.isVisited(cell.id) ) {
				arr.push({cell: cell, direction: directions[i]});
			}
		}

		return arr;
	}

	addToHistory(id) {
		this.history.push(id);
	}

	getLastFromHistory() {
		return this.history[this.history.length - 1];
	}

	removeLastFromHistory() {
		return this.history.pop();
	}

	clearHistory() {
		this.history = [];
	}
}