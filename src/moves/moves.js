import { getKnightMoves } from './knight';
import { getRookMoves } from './rook';
import { getBishopMoves } from './bishop';
import { getQueenMoves } from './queen';
import { getKingMoves } from './king';
import { getPawnMoves } from './pawn';
import { getPawnCaptures } from './pawn';
import { getCastlingMoves } from './castle';
import { movePawn } from './move';
import { movePiece } from './move';

export const moves = {
	getRegularMoves: function ({ currentPosition, piece, rank, file }) {
		if (piece.endsWith('n')) {
			return getKnightMoves({ currentPosition, piece, rank, file });
		}
		if (piece.endsWith('r')) {
			return getRookMoves({ currentPosition, piece, rank, file });
		}
		if (piece.endsWith('b')) {
			return getBishopMoves({ currentPosition, piece, rank, file });
		}

		if (piece.endsWith('q')) {
			return getQueenMoves({ currentPosition, piece, rank, file });
		}

		if (piece.endsWith('k')) {
			return getKingMoves({ currentPosition, piece, rank, file });
		}

		if (piece.endsWith('p')) {
			return getPawnMoves({ currentPosition, piece, rank, file });
		}
	},

	getValidMoves: function ({
		currentPosition,
		previousPosition,
		castleDirection,
		piece,
		rank,
		file
	}) {
		let moves = this.getRegularMoves({ currentPosition, piece, rank, file });
		if (piece.endsWith('p')) {
			moves = [
				...moves,
				...getPawnCaptures({ currentPosition, previousPosition, piece, rank, file })
			];
		}

		if (piece.endsWith('k'))
			moves = [
				...moves,
				...getCastlingMoves({ currentPosition, castleDirection, piece, rank, file })
			];

		return moves;
	},

	performMove: function ({ currentPosition, piece, rank, file, x, y }) {
		if (piece.endsWith('p')) return movePawn({ currentPosition, piece, rank, file, x, y });
		else return movePiece({ currentPosition, piece, rank, file, x, y });
	}
};
