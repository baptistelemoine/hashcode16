var fs = require('fs'),
	readline = require('readline'),
	Rx = require('rxjs');

var rd = readline.createInterface({
	input: fs.createReadStream('busy_day.in'),
	output: process.stdout,
	terminal: false
});

const source = Rx.Observable.fromEvent(rd, 'line').share();

const conf = Rx.Observable.zip(
	source.first(),
	source.skip(1),
	source.skip(2),
	source.skip(3), (s1, s2, s3, s4) => Object.assign({}, {
		rows: s1.split(' ')[0],
		columns: s1.split(' ')[1],
		drones: s1.split(' ')[2],
		turns: s1.split(' ')[3],
		payload: s1.split(' ')[4],
		nbProducts: s2,
		weights: s3,
		nbWarehouses: s4
	})
);

const warehouses = conf
	.mergeMap((c) => Rx.Observable.range(0, c.nbWarehouses * 2))
	.filter((x) => x % 2 === 0)
	.mergeMap((x) => source
		.skip(x)
		.take(2)
		.scan((a, b) => Object.assign({}, {
			coord: a,
			products: b
		}))
		.last()
	);

conf.subscribe((v) => console.log(v));