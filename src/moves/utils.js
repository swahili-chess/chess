export const copyPosition = (currentPosition) => {
	return currentPosition.map((row) => [...row]);
};

export const areSameColorTiles = (coordsOne, coordsTwo) =>
  (coordsOne.x + coordsOne.y) % 2 === coordsTwo.x + coordsTwo.y;


export const findPieceCoords = (currentPosition, type) => {
  let results = [];
  currentPosition.forEach((rank, i) => {
    rank.forEach((pos, j) => {
      if (pos === type) results.push({ x: i, y: j });
    });
  });
  return results;
};
