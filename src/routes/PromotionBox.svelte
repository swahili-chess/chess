<script>
	import { copyPosition } from '../moves/utils';

	import { game, Statuses } from '../store/store';

	import { getNewMoveNotation } from '../moves/notations';

	const options = ['q', 'r', 'b', 'n'];

	$: x = $game.positions[$game.positions.length - 1].promotionValues.x;
	$: y = $game.positions[$game.positions.length - 1].promotionValues.y;
	$: rank = $game.positions[$game.positions.length - 1].promotionValues.rank;
	$: file = $game.positions[$game.positions.length - 1].promotionValues.file;
	$: color = x === 7 ? 'w' : 'b';

	function getLeftStyle(y) {
		if (y <= 1) return '0%';
		if (y >= 5) return undefined;
		return `${12.5 * y - 20}%`;
	}

	function clickPiece(option) {
		const newPosition = copyPosition($game.positions[$game.positions.length - 1].board);
		newPosition[rank][file] = '';
		newPosition[x][y] = color + option;
		const newMove = getNewMoveNotation({
			...$game.positions[$game.positions.length - 1].promotionValues,
			position: $game.positions[$game.positions.length - 1].board,
			promotesTo: option,
			piece: x === 7 ? 'wp' : 'bp'
		});

		game.update((g) => {
			const pstn = {
				board: newPosition,
				movesMade: newMove,
				status: Statuses.ongoing,
				castleDirections: { ...g.positions[g.positions.length - 1].castleDirections },
				promotionValues: { rank: 0, file: 0, x: 0, y: 0 }
			};
			return {
				...g,
				positions: [...g.positions, pstn],
				turn: g.turn === 'w' ? 'b' : 'w',
				possibleMoves: []
			};
		});
	}
</script>

{#if $game.positions[$game.positions.length - 1].status === Statuses.promoting}
	<div
		class="popup--inner promotion-choices"
		style:top={x === 7 ? '-12.5%' : '97.5%'}
		style:right={y >= 6 ? '0%' : undefined}
		style:left={getLeftStyle(y)}
	>
		{#each options as option}
			<div
				role="presentation"
				class="piece {color}{option}"
				on:click={() => clickPiece(option)}
			></div>
		{/each}
	</div>
{/if}

<style>
	.popup--inner {
		width: 50%;
		min-height: 12.5%;
		background: var(--light-tile);
		position: absolute;
		border: 8px solid var(--light-tile);
		box-shadow: 0 0 0 8px var(--dark-tile);
	}
	.promotion-choices {
		height: 12.5%;
	}

	.promotion-choices .piece {
		width: 25%;
		height: 100%;
		border: 1px solid var(--dark-tile);
	}
	.promotion-choices .piece:hover {
		box-shadow: 0 0 0 5px var(--dark-tile) inset;
		transform: scale(1.05);
	}
	.promotion-choices :is(.wq, .bq) {
		left: 0;
	}
	.promotion-choices :is(.wr, .br) {
		left: 25%;
	}
	.promotion-choices :is(.wb, .bb) {
		left: 50%;
	}
	.promotion-choices :is(.wn, .bn) {
		left: 75%;
	}
</style>
