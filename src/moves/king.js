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
