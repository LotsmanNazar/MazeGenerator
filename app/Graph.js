class Graph {
	constructor() {
		this.vertices = {};
		this.edges = {};
		this.counter = 0;
	}

	addVertex(vertex) {
		vertex.id = this.counter;

		this.vertices[this.counter] = vertex;
		this.edges[this.counter] = {};

		var directions = Object.keys(vertex.directions);
		for ( var i = 0; i < directions.length; i++ ) {
			this.edges[this.counter][directions[i]] = null;
		}

		this.counter++;
	}

	addEdge(vertex1, vertex2, direction) {
		if ( this.vertices[vertex1.id] === undefined ) {
			throw new Error('Vertex 1 not found.');
		}

		if ( this.vertices[vertex2.id] === undefined ) {
			throw new Error('Vertex 2 not found.');
		}

		this.edges[vertex1.id][direction] = vertex2.id;
	}

	getVertex(id) {
		return this.vertices[id];
	}

	getNextTo(id, direction) {
		var vertex = this.vertices[this.edges[id][direction]];
		return vertex;
	}

	getVerticesCount() {
		return Object.keys(this.vertices).length;
	}

	destroy() {
		this.vertices = {};
		this.edges = {};
		this.counter = 0;
	}
}