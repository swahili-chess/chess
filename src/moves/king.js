export const getKingMoves = ({ currentPosition, piece, rank, file }) => {
	const moves = [];
	const me = piece[0];
	const direction = [
		[1, -1],
		[1, 0],
		[1, 1],
		[0, -1],
		[0, 1],
		[-1, -1],
		[-1, 0],
		[-1, 1]
	];

	direction.forEach((m) => {
		const p = currentPosition?.[rank + m[0]]?.[file + m[1]];
		if (p !== undefined && !p.startsWith(me)) {
			moves.push([rank + m[0], file + m[1]]);
		}
	});

	return moves;
};

export const getKingPosition = (currentPosition, player) => {
	let kingPos;
	currentPosition.forEach((rank, x) => {
		rank.forEach((file, y) => {
			if (currentPosition[x][y].startsWith(player) && currentPosition[x][y].endsWith('k'))
				kingPos = [x, y];
		});
	});
	return kingPos;
};
