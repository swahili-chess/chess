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
import { findPieceCoords } from './utils';
import { areSameColorTiles } from './utils';

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

		if (enemyMoves.some(([x, y]) => kingPos[0] === x && kingPos[1] === y)) {
			return true;
		} else {
			return false;
		}
	},

	isStalemate: function (currentPosition, player, castleDirection) {
		const isInCheck = this.isPlayerInCheck({ positionAfterMove: currentPosition, player });

		if (isInCheck) return false;

		const pieces = getPieces(currentPosition, player);
		const moves = pieces.reduce(
			(acc, p) =>
				(acc = [
					...acc,
					...this.getValidMoves({
						currentPosition,
						castleDirection,
						...p
					})
				]),
			[]
		);

		return !isInCheck && moves.length === 0;
	},

	insufficientMaterial: function (currentPosition) {
		const pieces = currentPosition.reduce(
			(acc, rank) => (acc = [...acc, ...rank.filter((spot) => spot)]),
			[]
		);

		// King vs. king
		if (pieces.length === 2) return true;

		// King and bishop vs. king
		// King and knight vs. king
		if (pieces.length === 3 && pieces.some((p) => p.endsWith('b') || p.endsWith('n'))) return true;

		// King and bishop vs. king and bishop of the same color as the opponent's bishop
		if (
			pieces.length === 4 &&
			pieces.every((p) => p.endsWith('b') || p.endsWith('k')) &&
			new Set(pieces).size === 4 &&
			areSameColorTiles(
				findPieceCoords(currentPosition, 'wb')[0],
				findPieceCoords(currentPosition, 'bb')[0]
			)
		)
			return true;

		return false;
	},

	isCheckMate: function (currentPosition, player, castleDirection) {
		const isInCheck = this.isPlayerInCheck({ positionAfterMove: currentPosition, player });

		if (!isInCheck) return false;

		const pieces = getPieces(currentPosition, player);
		const moves = pieces.reduce(
			(acc, p) =>
				(acc = [
					...acc,
					...this.getValidMoves({
						currentPosition,
						castleDirection,
						...p
					})
				]),
			[]
		);

		return isInCheck && moves.length === 0;
	}
};
