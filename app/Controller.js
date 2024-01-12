class Controller {
	constructor(mainWrapper, settings) {
		this.maze = new Maze();
		this.view = new View(settings.wrapper, settings.canvas, settings.cellSize);

		this.initApp(mainWrapper, settings);
	}

	initApp(wrapper, settings) {
		var data = this.createMaze(settings.rows, settings.cols, settings.cellSize);
		this.view.updateGenerationData(data, wrapper);

		this.initEvents(wrapper)
	}

	initEvents(wrapper) {
		wrapper.getElementsByClassName('show-exit')[0].addEventListener('click', () => {
			this.showPath();
		});

		wrapper.getElementsByClassName('generate-new')[0].addEventListener('click', () => {
			var rowsItem = wrapper.getElementsByClassName('rows')[0];
			var colsItem = wrapper.getElementsByClassName('cols')[0];
			var cellSizeItem = wrapper.getElementsByClassName('cellSize')[0];

			var rows = ( rowsItem.value < 2 ) ? 2 : rowsItem.value;
			var cols = ( colsItem.value < 2 ) ? 2 : colsItem.value;
			var cellSize = ( cellSizeItem.value < 2 ) ? 2 : cellSizeItem.value;

			var data = this.createMaze(rows, cols, cellSize);

			this.view.updateGenerationData(data, wrapper);
		});
	}

	createMaze(rows, cols, cellSize) {
		var time = window.performance.now();
		this.maze.resize(rows, cols);
		this.maze.generateMaze();
		var generationTime = window.performance.now() - time;

		var time = window.performance.now();
		this.view.resize(rows, cols, cellSize);
		this.view.clear();
		this.view.drawWalls(this.maze.worldMap.vertices, this.maze.helper);
		var drawTime = window.performance.now() - time;

		return {
			generationTime: generationTime.toFixed(1),
			drawTime: drawTime.toFixed(1)
		}
	}

	showPath() {
		this.view.drawPath(this.maze.path, this.maze.worldMap.vertices, this.maze.helper);
	}
}