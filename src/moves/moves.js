import { getKnightMoves } from "./knight";
import { getRookMoves } from "./rook";
import {getBishopMoves} from "./bishop"
import {getQueenMoves} from "./queen"

export const moves = {
    getRegularMoves : function(position, piece, rank, file) {

        if (piece.endsWith("n")){
            return getKnightMoves(position, piece, rank, file)
        }
        if (piece.endsWith("r")){
            return getRookMoves(position, piece, rank, file)
        }
        if (piece.endsWith("b")){
            return getBishopMoves(position, piece, rank, file)
        }

        if (piece.endsWith("q")){
            return getQueenMoves(position, piece, rank, file)
        }
        
    }
}