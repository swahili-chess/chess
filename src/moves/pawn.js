export const getPawnMoves = ({ currentPosition, piece, rank, file }) => {
	const moves = [];
	const m = piece === 'wp' ? 1 : -1;
	if (!currentPosition?.[rank + m]?.[file]) {
		moves.push([rank + m, file]);
	}

	if (rank % 5 === 1) {
		if (
			currentPosition?.[rank + m]?.[file] === '' &&
			currentPosition?.[rank + m + m]?.[file] === ''
		)
			moves.push([rank + m + m, file]);
	}

	return moves;
};

export const getPawnCaptures = ({ currentPosition, previousPosition, piece, rank, file }) => {
	const moves = [];
	const dir = piece === 'wp' ? 1 : -1;
	const enemy = piece[0] === 'w' ? 'b' : 'w';

	// Capture enemy to left
	if (
		currentPosition?.[rank + dir]?.[file - 1] &&
		currentPosition[rank + dir][file - 1].startsWith(enemy)
	) {
		moves.push([rank + dir, file - 1]);
	}

	// Capture enemy to right
	if (
		currentPosition?.[rank + dir]?.[file + 1] &&
		currentPosition[rank + dir][file + 1].startsWith(enemy)
	) {
		moves.push([rank + dir, file + 1]);
	}

	// EnPassant
	// Check if enemy moved twice in last round
	const enemyPawn = dir === 1 ? 'bp' : 'wp';
	const adjacentFiles = [file - 1, file + 1];
	if (previousPosition) {
		if ((dir === 1 && rank === 4) || (dir === -1 && rank === 3)) {
			adjacentFiles.forEach((f) => {
				if (
					currentPosition?.[rank]?.[f] === enemyPawn &&
					currentPosition?.[rank + dir + dir]?.[f] === '' &&
					previousPosition?.[rank]?.[f] === '' &&
					previousPosition?.[rank + dir + dir]?.[f] === enemyPawn
				) {
					moves.push([rank + dir, f]);
				}
			});
		}
	}

	return moves;
};
