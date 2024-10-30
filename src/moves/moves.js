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
import { getPieces } from './pieces';
import { getKingPosition } from './king';

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
		const notInCheckMoves = [];
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

		moves.forEach(([x, y]) => {
			const positionAfterMove = this.performMove({ currentPosition, piece, rank, file, x, y });

			if (!this.isPlayerInCheck({ positionAfterMove, currentPosition, player: piece[0] })) {
				notInCheckMoves.push([x, y]);
			}
		});

		return notInCheckMoves;
	},

	performMove: function ({ currentPosition, piece, rank, file, x, y }) {
		if (piece.endsWith('p')) return movePawn({ currentPosition, piece, rank, file, x, y });
		else return movePiece({ currentPosition, piece, rank, file, x, y });
	},

	isPlayerInCheck: function ({ positionAfterMove, currentPosition, player }) {
		const enemy = player.startsWith('w') ? 'b' : 'w';
		let kingPos = getKingPosition(positionAfterMove, player);
		const enemyPieces = getPieces(positionAfterMove, enemy);

		const enemyMoves = enemyPieces.reduce(
			(acc, p) =>
				(acc = [
					...acc,
					...(p.piece.endsWith('p')
						? getPawnCaptures({
								currentPosition: positionAfterMove,
								previousPosition: currentPosition,
								...p
							})
						: this.getRegularMoves({
								currentPosition: positionAfterMove,
								...p
							}))
				]),
			[]
		);

		console.log('log', enemyMoves);
		console.log('king', kingPos);
		if (enemyMoves.some(([x, y]) => kingPos[0] === x && kingPos[1] === y)) {
			return true;
		} else {
			return false;
		}
	}
};
