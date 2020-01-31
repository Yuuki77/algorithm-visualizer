// import visualization libraries {
const { Tracer, LogTracer, Array1DTracer, GraphTracer, Layout, VerticalLayout } = require('algorithm-visualizer');
// }

// define tracer variables {
const graphTracer = new GraphTracer('Quick Union find tree');
const tracer = new Array1DTracer('QuickFind');
const size = 10;
const T = {};

const ids = [];
for (var i = 0; i < size; i++) {
	ids.push(i);
}

tracer.set(ids);
const logger = new LogTracer();
graphTracer.log(logger);
Layout.setRoot(new VerticalLayout([graphTracer, tracer, logger]));
Tracer.delay();
// }

class QuickUnion {
	constructor(size) {
		this.id = []
		console.log(this.id)
		this.count = size;
		for (var i = 0; i < size; i++) {
			this.id[i] = i;
			graphTracer.addNode(this.id[i]);
		}
	}

	connected(p, q) {
		return this.id[p] == this.id[q]
	}

	find(p) {
		if (p != this.id[p]) {
			p = this.id[p];
		}
		return p;
	}

	count() {
		return this.count;
	}

	union(p, q) {
		let pRoot = this.find(p);
		let qRoot = this.find(q);

		console.log("Union start");
		// logger {
		logger.println("----------------------");

		logger.println("union " + p + " and " + q);
		tracer.select(p);
		tracer.select(q);
		graphTracer.select(p);
		graphTracer.select(q);

		Tracer.delay();
		tracer.deselect(p);
		tracer.deselect(q);
		graphTracer.deselect(p);
		graphTracer.deselect(q);

		logger.println("pRoot ->" + pRoot);
		logger.println("qRoot ->" + qRoot);
		tracer.select(pRoot);
		tracer.select(qRoot);
		graphTracer.select(pRoot, qRoot);

		// logger.println("change " + qRoot + " to " + pRoot);
		tracer.deselect(pRoot);
		tracer.deselect(qRoot);
		graphTracer.deselect(pRoot, qRoot);

		// Tracer.delay();
		// }

		if (pRoot == qRoot) return;
		console.log(this.id)


		// visualize {
		logger.println("change " + this.id[pRoot] + " to " + qRoot);
		graphTracer.addEdge(this.id[pRoot], qRoot);
		tracer.patch(this.id[pRoot], qRoot);
		Tracer.delay();
		tracer.depatch(this.id[pRoot]);
		// }

		this.id[pRoot] = qRoot

		this.count--;
	}
}

var unionFind = new QuickUnion(size);
unionFind.union(4, 3);
unionFind.union(3, 8);
unionFind.union(6, 5);
unionFind.union(9, 4);
unionFind.union(2, 1);
unionFind.union(5, 0);
unionFind.union(7, 2);
unionFind.union(6, 1);

// worst case
// unionFind.union(0, 1);
// unionFind.union(0, 2);
// unionFind.union(0, 3);
// unionFind.union(0, 4);
// unionFind.union(0, 5);
// unionFind.union(0, 6);
// unionFind.union(0, 7);
// unionFind.union(0, 8);
// unionFind.union(0, 9);
