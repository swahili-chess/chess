export const getNewMoveNotation = ({ piece, rank, file, x, y, position, promotesTo }) => {
	let note = '';

	rank = Number(rank);
	file = Number(file);

	if (piece[1] === 'k' && Math.abs(file - y) === 2) {
		if (file < y) return 'O-O';
		else return 'O-O-O';
	}

	if (piece[1] !== 'p') {
		note += piece[1].toUpperCase();
		if (position[x][y]) {
			note += 'x';
		}
	} else if (rank !== x && file !== y) {
		note += String.fromCharCode(96 + file + 1) + 'x';
	}

	note += String.fromCharCode(96 + y + 1) + (x + 1);

	if (promotesTo) note += '=' + promotesTo.toUpperCase();

	return note;
};
