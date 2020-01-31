// import visualization libraries {
const { Tracer, LogTracer, Array1DTracer, GraphTracer, Layout, VerticalLayout } = require('algorithm-visualizer');
// }

// define tracer variables {
const graphTracer = new GraphTracer('Quick Union find tree');
const tracer = new Array1DTracer('QuickFind');
const sizeTracer = new Array1DTracer('QuickFind Size');
const count = 10;

const ids = [];
const sizes = []
for (var i = 0; i < count; i++) {
	ids.push(i);
	sizes.push(1);
}


tracer.set(ids);
sizeTracer.set(sizes);
const logger = new LogTracer();
graphTracer.log(logger);
Layout.setRoot(new VerticalLayout([graphTracer, tracer, sizeTracer, logger]));
// Tracer.delay();
// }

class WeightedQuickUnion {
	constructor() {
		this.id = []
		this.size = []
		console.log(this.id)
		for (var i = 0; i < count; i++) {
			this.id[i] = i;
			this.size[i] = 1;
			graphTracer.addNode(this.id[i]);
		}
	}

	connected(p, q) {
		return this.id[p] == this.id[q]
	}

	// O(lg N)
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
		sizeTracer.select(pRoot);
		sizeTracer.select(qRoot);
		Tracer.delay();
		tracer.deselect(p);
		tracer.deselect(q);

		logger.println("pRoot ->" + pRoot);
		logger.println("qRoot ->" + qRoot);
		tracer.select(pRoot);
		tracer.select(qRoot);
		graphTracer.select(pRoot, qRoot);
		Tracer.delay();

		// logger.println("change " + qRoot + " to " + pRoot);
		tracer.deselect(pRoot);
		tracer.deselect(qRoot);
		sizeTracer.deselect(pRoot);
		sizeTracer.deselect(qRoot);
		graphTracer.deselect(p);
		graphTracer.deselect(q);
		graphTracer.deselect(pRoot, qRoot);

		Tracer.delay();
		// }

		if (pRoot == qRoot) return;
		console.log(this.id)

		if (this.size[pRoot] < this.size[qRoot]) {
			// visualize {
			logger.println("change " + this.id[pRoot] + " to " + this.id[qRoot]);
			graphTracer.addEdge(this.id[pRoot], this.id[qRoot]);
			tracer.patch(pRoot, qRoot);
			sizeTracer.select(pRoot);
			sizeTracer.select(qRoot);
			sizeTracer.patch(qRoot, this.size[qRoot] + this.size[pRoot]);

			Tracer.delay();
			tracer.depatch(pRoot);
			sizeTracer.deselect(pRoot);
			sizeTracer.deselect(qRoot);
			sizeTracer.depatch(qRoot);
			Tracer.delay();
			// }

			this.id[pRoot] = qRoot;
			this.size[qRoot] += this.size[pRoot];
		} else {
			// visualize {
			logger.println("change " + this.id[qRoot] + " to " + pRoot);
			graphTracer.addEdge(this.id[qRoot], this.id[pRoot]);
			tracer.patch(qRoot, pRoot);
			sizeTracer.select(pRoot);
			sizeTracer.select(qRoot);
			sizeTracer.patch(pRoot, this.size[qRoot] + this.size[pRoot]);
			Tracer.delay();
			tracer.depatch(qRoot);
			sizeTracer.deselect(pRoot);
			sizeTracer.deselect(qRoot);
			sizeTracer.depatch(pRoot);
			Tracer.delay();

			// }

			this.id[qRoot] = pRoot;
			this.size[pRoot] += this.size[qRoot]
		}

		this.count--;
	}
}


var unionFind = new WeightedQuickUnion();
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
