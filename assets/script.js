var mainWrapper = document.getElementsByClassName('wrapper')[0];
var settings = {
	wrapper: document.getElementsByClassName('canvas-wrapper')[0],
	canvas: document.getElementsByClassName('canvas')[0],
	rows: 20,
	cols: 20,
	cellSize: 20
};

var controller = new Controller(mainWrapper, settings);