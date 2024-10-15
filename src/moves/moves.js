import { getRookMoves } from "./rook";

export const moves = {
    getRegularMoves : function(position, piece, rank, file) {
        return getRookMoves(position, piece, rank, file)
    }
}