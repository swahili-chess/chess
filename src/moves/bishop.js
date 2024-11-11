export const getBishopMoves = ({ currentPosition, piece, rank, file }) => {
	const moves = [];
	const me = piece[0];
	const enemy = me === 'w' ? 'b' : 'w';
	const direction = [
		[-1, -1],
		[1, 1],
		[1, -1],
		[-1, 1]
	];
	direction.forEach((dir) => {
		for (let i = 1; i < 8; i++) {
			const x = rank + i * dir[0];
			const y = file + i * dir[1];

			if (currentPosition?.[x]?.[y] === undefined) {
				break;
			}

			if (currentPosition[x][y].startsWith(enemy)) {
				moves.push([x, y]);
				break;
			}

			if (currentPosition[x][y].startsWith(me)) {
				break;
			}

			moves.push([x, y]);
		}
	});

	return moves;
};
