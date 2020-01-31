// import visualization libraries {
const { GraphTracer, Tracer, LogTracer, Array1DTracer, Layout, VerticalLayout } = require('algorithm-visualizer');
// }

// define tracer variables {
const graphTracer = new GraphTracer('Quick Find find tree');
graphTracer.directed(false)
const tracer = new Array1DTracer('QuickFind');
const size = 10;

const ids = [];
for (var i = 0; i < size; i++) {
	ids.push(i);
}

tracer.set(ids);
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([graphTracer, tracer, logger]));
Tracer.delay();
// }

class UnionFind {
	constructor(size) {
		this.id = []
		this.count = size;
		for (var i = 0; i < size; i++) {
			this.id[i] = i;
			graphTracer.addNode(this.id[i])
		}
	}

	connected(p, q) {
		return this.id[p] == this.id[q]
	}

	find(p) {
		return this.id[p];
	}

	count() {
		return this.count;
	}

	union(p, q) {
		let pId = this.find(p);
		let qId = this.find(q);

		console.log("Union start");
		// logger {
		logger.println("----------------------");

		logger.println("union " + p + " and " + q);
		logger.println("pId ->" + pId);
		logger.println("qId ->" + qId);
		tracer.select(p);
		tracer.select(q);
		graphTracer.select(p);
		graphTracer.select(q);
		logger.println("change " + pId + " to " + qId);
		Tracer.delay();

		// }

		if (pId == qId) return;


		// // visualize {
		// for (var i = 0; i < this.id.length; i++) {
		//   if (this.id[i] == qId) {
		//     tracer.select(i);
		//   }
		// }
		// Tracer.delay();
		// // }

		for (let i = 0; i < this.id.length; i++) {
			if (this.id[i] == pId) {
				// visualize {
				if (this.id[i] == i) {
					graphTracer.addEdge(i, qId);
				}
				tracer.patch(i, qId);
				// }
				this.id[i] = qId;
			}

			// visualize {
			tracer.select(i)
			Tracer.delay();
			tracer.deselect(i)

			tracer.depatch(i);
			// }

		}
		this.count--;

		// visualize {
		for (var i = 0; i < this.id.length; i++) {
			tracer.deselect(i);
		}
		graphTracer.select(p);
		graphTracer.select(q);
		Tracer.delay();
		// }

	}
}

var unionFind = new UnionFind(size);
unionFind.union(4, 3);
unionFind.union(3, 8);
unionFind.union(6, 5);
unionFind.union(9, 4);
unionFind.union(2, 1);
unionFind.union(5, 0);
unionFind.union(7, 2);
unionFind.union(6, 1);
