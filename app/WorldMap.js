class WorldMap extends Graph {
	constructor(rows, cols) {
		super();

		this.rows = rows;
		this.cols = cols;
	}

	generateWalls() {
		this.destroy();
		
		for ( var i = 0; i < this.rows; i++ ) {
			for ( var n = 0; n < this.cols; n++ ) {
				var cell = new Cell(i, n);
				this.addVertex(cell);

				if ( n > 0 ) {
					var prevCell = this.getVertex(cell.id - 1);
					this.addEdge(prevCell, cell, 'right');
					this.addEdge(cell, prevCell, 'left');
				}

				if ( i > 0 ) {
					var topRowCell = this.getVertex(cell.id - this.cols);
					this.addEdge(topRowCell, cell, 'bottom');
					this.addEdge(cell, topRowCell, 'top');
				}
			}
		}
	}
}