export const getPawnMoves = ({position, piece, rank, file}) => {
	const moves = [];
	const m = piece === 'wp' ? 1 : -1;
	if (!position?.[rank + m]?.[file]) {
		moves.push([rank + m, file]);
	}

	if (rank % 5 === 1) {
		if (position?.[rank + m]?.[file] === '' && position?.[rank + m + m]?.[file] === '')
			moves.push([rank + m + m, file]);
	}

	return moves;
};


export const getPawnCaptures =  ({position, prevPosition, piece, rank, file}) => {

    const moves = []
    const dir = piece === 'wp' ? 1 : -1
    const enemy = piece[0] === 'w' ? 'b' : 'w'

    // Capture enemy to left
    if (position?.[rank+dir]?.[file-1] && position[rank+dir][file-1].startsWith(enemy) ){
        moves.push ([rank+dir,file-1])
    }

    // Capture enemy to right
    if (position?.[rank+dir]?.[file+1] && position[rank+dir][file+1].startsWith(enemy) ){
        moves.push([rank+dir,file+1])
    }

    // EnPassant
    // Check if enemy moved twice in last round
    const enemyPawn = dir === 1 ? 'bp' : 'wp'
    const adjacentFiles = [file-1,file+1]
    if(prevPosition){
        console.log("check for enpassant")
        if ((dir === 1 && rank === 4) || (dir === -1 && rank === 3)){
            console.log("passed 1st", rank, file , dir )
            adjacentFiles.forEach(f => {
                console.log("1st", position?.[rank]?.[f] , [rank, f])
                console.log("2nd", position?.[rank+dir+dir]?.[f], [rank+dir+dir,f])
                console.log("3rd", prevPosition?.[rank]?.[f], [rank, f])
                console.log("4th", prevPosition?.[rank+dir+dir]?.[f], [rank+dir+dir, f])

                if (position?.[rank]?.[f] === enemyPawn && 
                    position?.[rank+dir+dir]?.[f] === '' &&
                    prevPosition?.[rank]?.[f] === '' && 
                    prevPosition?.[rank+dir+dir]?.[f] === enemyPawn){
                        console.log("i really")
                        moves.push ([rank+dir,f])
                    }
            })
        }
    }


    return moves
}