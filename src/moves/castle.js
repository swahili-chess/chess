export const getCastlingMoves = ({ currentPosition, castleDirection, piece, rank, file }) => {
	const moves = [];

	if (file !== 4 || rank % 7 !== 0 || castleDirection === 'none') {
		return moves;
	}
	if (piece.startsWith('w')) {
		if (
			['left', 'both'].includes(castleDirection) &&
			!currentPosition[0][3] &&
			!currentPosition[0][2] &&
			!currentPosition[0][1] &&
			currentPosition[0][0] === 'wr'
		) {
			moves.push([0, 2]);
		}

		if (
			['right', 'both'].includes(castleDirection) &&
			!currentPosition[0][5] &&
			!currentPosition[0][6] &&
			currentPosition[0][7] === 'wr'
		) {
			moves.push([0, 6]);
		}

		return moves;
	} else {
		if (
			['left', 'both'].includes(castleDirection) &&
			!currentPosition[7][3] &&
			!currentPosition[7][2] &&
			!currentPosition[7][1] &&
			currentPosition[7][0] === 'br'
		) {
			moves.push([7, 2]);
		}
		if (
			['right', 'both'].includes(castleDirection) &&
			!currentPosition[7][5] &&
			!currentPosition[7][6] &&
			currentPosition[7][7] === 'br'
		) {
			moves.push([7, 6]);
		}

		return moves;
	}
};

export const getCastlingDirections = ({ castleDirection, piece, file, rank }) => {
	file = Number(file);
	rank = Number(rank);
	const direction = castleDirection[piece[0]];
	if (piece.endsWith('k')) return 'none';

	if (file === 0 && rank === 0) {
		if (direction === 'both') return 'right';
		if (direction === 'left') return 'none';
	}
	if (file === 7 && rank === 0) {
		if (direction === 'both') return 'left';
		if (direction === 'right') return 'none';
	}
	if (file === 0 && rank === 7) {
		if (direction === 'both') return 'right';
		if (direction === 'left') return 'none';
	}
	if (file === 7 && rank === 7) {
		if (direction === 'both') return 'left';
		if (direction === 'right') return 'none';
	}
};
