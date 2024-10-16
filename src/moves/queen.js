import { getRookMoves } from './rook';
import { getBishopMoves } from './bishop';

export const getQueenMoves = (position, piece, rank, file) => {
	return [
		...getBishopMoves(position, piece, rank, file),
		...getRookMoves(position, piece, rank, file)
	];
};
