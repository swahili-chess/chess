
export const getKnightMoves = (position, piece, rank, file) => {
       const moves = []
       const enemy = piece[0] === "w" ? "b" : "w" 
       const direction = [
          [-2,-1],
          [-2,1],
          [-1,-2],
          [-1,2],
          [1,-2],
          [1,2],
          [2,-1],
          [2,1]
       ]
      direction.forEach(m => {
        const p = position?.[rank+m[0]]?.[file+m[1]]
        if (p !== undefined && (p.startsWith(enemy) || p === "")){
           moves.push([rank + m[0],file + m[1]])
        } 
      })

      return moves
    }