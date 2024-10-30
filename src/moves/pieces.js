export const getPieces = (position, enemy) => {
	const enemyPieces = [];
	position.forEach((rank, x) => {
		rank.forEach((file, y) => {
			if (position[x][y].startsWith(enemy))
				enemyPieces.push({
					piece: position[x][y],
					rank: x,
					file: y
				});
		});
	});
	return enemyPieces;
};
