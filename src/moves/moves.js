import { getKnightMoves } from './knight';
import { getRookMoves } from './rook';
import { getBishopMoves } from './bishop';
import { getQueenMoves } from './queen';
import { getKingMoves } from './king';
import { getPawnMoves } from './pawn';
import { getPawnCaptures } from './pawn';

export const moves = {
	getRegularMoves: function ({position, piece, rank, file}) {
		if (piece.endsWith('n')) {
			return getKnightMoves({position, piece, rank, file});
		}
		if (piece.endsWith('r')) {
			return getRookMoves({position, piece, rank, file});
		}
		if (piece.endsWith('b')) {
			return getBishopMoves({position, piece, rank, file});
		}

		if (piece.endsWith('q')) {
			return getQueenMoves({position, piece, rank, file});
		}

		if (piece.endsWith('k')) {
			return getKingMoves({position, piece, rank, file});
		}

		if (piece.endsWith('p')) {
			return getPawnMoves({position, piece, rank, file});
		}
	},

    getValidMoves : function ({position,prevPosition,piece,rank,file}) {

       console.log("curry", position)
        console.log("prevyy", prevPosition)

        let moves = this.getRegularMoves({position,piece,rank,file})
        if (piece.endsWith('p')){
            moves = [
                ...moves,
                ...getPawnCaptures({position,prevPosition,piece,rank,file})
            ]
        }

        return moves
    }
}
