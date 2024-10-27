import { getRookMoves } from './rook';
import { getBishopMoves } from './bishop';

export const getQueenMoves = ({ currentPosition, piece, rank, file }) => {
	return [
		...getBishopMoves({ currentPosition, piece, rank, file }),
		...getRookMoves({ currentPosition, piece, rank, file })
	];
};
