import { copyPosition } from './utils';

export const movePiece = ({ currentPosition, piece, rank, file, x, y }) => {
	const newPosition = copyPosition(currentPosition);
	newPosition[rank][file] = '';
	newPosition[x][y] = piece;
	return newPosition;
};

export const movePawn = ({ currentPosition, piece, rank, file, x, y }) => {
	const newPosition = copyPosition(currentPosition);

	// EnPassant, looks like capturing an empty cell
	// Detect and delete the pawn to be captured
	if (!newPosition[x][y] && x !== rank && y !== file) newPosition[rank][y] = '';

	newPosition[rank][file] = '';
	newPosition[x][y] = piece;
	return newPosition;
};
