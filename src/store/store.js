import { writable } from 'svelte/store';

export const initPos = new Array(8).fill('').map(() => new Array(8).fill(''));

for (let i = 0; i < 8; i++) {
	initPos[1][i] = 'wp';
	initPos[6][i] = 'bp';
}

initPos[0][0] = 'wr';
initPos[0][1] = 'wn';
initPos[0][2] = 'wb';
initPos[0][3] = 'wq';
initPos[0][4] = 'wk';
initPos[0][5] = 'wb';
initPos[0][6] = 'wn';
initPos[0][7] = 'wr';

initPos[7][0] = 'br';
initPos[7][1] = 'bn';
initPos[7][2] = 'bb';
initPos[7][3] = 'bq';
initPos[7][4] = 'bk';
initPos[7][5] = 'bb';
initPos[7][6] = 'bn';
initPos[7][7] = 'br';

export const statuses = {
	ongoing: 'Ongoing',
	promoting: 'Promoting',
	white: 'White wins',
	black: 'Black wins',
	stalemate: 'Game draws due to stalemate',
	insufficient: 'Game draws due to insufficient material'
};

export const initialGame = {
	positions: [initPos],
	moves: [],
	turn: 'w'
};

export const game = writable(initialGame);

export const possibleMoves = writable([]);

export const initialStatus = {
	status: statuses.ongoing,
	promotionValues: {
		rank: 0,
		file: 0,
		x: 0,
		y: 0
	},
	castleDirection: {
		w: 'both',
		b: 'both'
	}
};

export const status = writable(initialStatus);
