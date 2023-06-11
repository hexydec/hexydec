function render(context, rows, cols, size, cells) {
	for (x = 0; x < rows; x++) {
		for (y = 0; y < cols; y++) {
			context.fillStyle = cells[x * y] ? "blue" : "white";
			context.fillRect(x * size, y * size, size, size);
		}
	}
}

function getNeighbours(rows, cols, cells, i) {
	let neighbours = 0;
	const row = Math.floor(i / cols),
		col = i - (row * rows);
	for (let y = -1; y <= 1; y++) {
		for (let x = -1; x <= 1; x++) {
			const n = ((row + y) * rows) + col + x;
			if (n !== i && n in cells && cells[n]) {
				neighbours++;
			}
		}
	}
	return neighbours;
}

function generation(rows, cols, cells) {
	for (i = 0; i < rows * cols; i++) {
		const neighbours = getNeighbours(rows, cols, cells, i);
		if (cells[i] && (neighbours < 2 || neighbours > 3)) {
			cells[i] = 0;
		} else if (!cells[i] && neighbours === 3) {
			cells[i] = 1;
		}
	}
	return cells;
}

const canvas = document.getElementById("game"),
	context = canvas.getContext("2d"),
	size = 10,
	rows = Math.floor(canvas.width / size),
	cols = Math.floor(canvas.height / size);

let cells = [];
for (let i = 0; i < rows * cols; i++) {
	cells[i] = Math.random() < 0.9 ? 0 : 1;
}
render(context, rows, cols, size, cells);

setInterval(() => {
	cells = generation(rows, cols, cells);
	render(context, rows, cols, size, cells);
}, 400);