class View {
	constructor(wrapper, canvas, cellSize) {
		this.wrapper = wrapper;
		this.canvas = canvas;
		this.cellSize = cellSize;
		this.ctx = this.canvas.getContext('2d');
		this.scale = 1.5;
	}

	resize(rows, cols, cellSize) {
		this.cellSize = cellSize;
		this.wrapper.style['width'] = (cols * this.cellSize) + 'px';
		this.wrapper.style['height'] = (rows * this.cellSize) + 'px';
		this.canvas.width = cols * this.cellSize * this.scale;
		this.canvas.height = rows * this.cellSize * this.scale;
	}

	drawLine(x1, y1, x2, y2, color) {
		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.lineWidth = 1.5;
		this.ctx.strokeStyle = color;
		this.ctx.stroke();
		this.ctx.closePath();
	}

	drawCircle(x, y, r, color) {
		this.ctx.beginPath();
		this.ctx.fillStyle = color;
		this.ctx.arc(x, y, r, 0, Math.PI * 2);
		this.ctx.fill();
		this.ctx.closePath();
	}

	drawRect(x, y, w, h, color) {
		this.ctx.beginPath();
		this.ctx.fillStyle = color;
		this.ctx.rect(x, y, w, h);
		this.ctx.fill();
		this.ctx.closePath();
	}

	drawWalls(vertices, helper) {
		var verticesArr = Object.keys(vertices);
		for ( var i = 0; i < verticesArr.length; i++ ) {
			var cell = vertices[i];
			var walls = helper.calculateWallsView(cell, this.cellSize * this.scale);

			if ( i == 0 || i == verticesArr.length - 1 ) {
				this.drawRect(
					cell.col * this.cellSize * this.scale,
					cell.row * this.cellSize * this.scale,
					cell.col + this.cellSize * this.scale,
					cell.row + this.cellSize * this.scale,
					'#e0ddff'
				);
			}

			for ( var n = 0; n < walls.length; n++ ) {
				var wall = walls[n];
				this.drawLine(wall.x1, wall.y1, wall.x2, wall.y2, '#000000');
			}
		}
	}

	drawPath(verticesIDs, vertices, helper) {
		for ( var i = 0; i < verticesIDs.length; i++ ) {
			var cell = vertices[verticesIDs[i]];
			var drawPath = helper.calculatePathView(cell, this.cellSize * this.scale);

			this.drawCircle(
				drawPath.x + (this.cellSize * this.scale / 2),
				drawPath.y + (this.cellSize * this.scale / 2),
				drawPath.r, '#cfffff'
			);
		}
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	updateGenerationData(data, wrapper) {
		var generationTimeItem = wrapper.getElementsByClassName('generation-time')[0];
		var drawTimeItem = wrapper.getElementsByClassName('draw-time')[0];

		generationTimeItem.innerHTML = data.generationTime;
		drawTimeItem.innerHTML = data.drawTime;
	}
}