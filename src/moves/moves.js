import { getKnightMoves } from "./knight";
import { getRookMoves } from "./rook";

export const moves = {
    getRegularMoves : function(position, piece, rank, file) {

        if (piece.endsWith("n")){
            return getKnightMoves(position, piece, rank, file)
        }
        if (piece.endsWith("r")){
            return getRookMoves(position, piece, rank, file)
        }
        
    }
}