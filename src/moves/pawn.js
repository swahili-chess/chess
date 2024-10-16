export const getPawnMoves = (position, piece, rank, file) => {
	const moves = [];
	const m = piece === 'wp' ? 1 : -1;
	if (!position?.[rank + m]?.[file]) {
		moves.push([rank + m, file]);
	}

	if (rank % 5 === 1) {
		if (position?.[rank + m]?.[file] === '' && position?.[rank + m + m]?.[file] === '')
			moves.push([rank + m + m, file]);
	}

	return moves;
};

export const getPawnCaptures = (position, piece, rank, file) => {
	const moves = [];
	const m = piece === 'wp' ? 1 : -1;
	const enemy = piece[0] === 'w' ? 'b' : 'w';

	if (position?.[rank + m]?.[file - 1] && position?.[rank + m]?.[file - 1].startsWith(enemy)) {
		moves.push([rank + m, file - 1]);
	}

	if (position?.[rank + m]?.[file + 1] && position?.[rank + m]?.[file + 1].startsWith(enemy)) {
		moves.push([rank + m, file + 1]);
	}

	return moves;
};
