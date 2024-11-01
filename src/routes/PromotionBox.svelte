<script>
	import { copyPosition } from '../moves/utils';

	import { status, statuses, game, possibleMoves } from '../store/store';

	import { getNewMoveNotation } from '../moves/notations';

	const options = ['q', 'r', 'b', 'n'];

	$: x = $status.promotionValues.x;
	$: y = $status.promotionValues.y;
	$: color = x === 7 ? 'w' : 'b';

	function getLeftStyle(y) {
		if (y <= 1) return '0%';
		if (y >= 5) return undefined;
		return `${12.5 * y - 20}%`;
	}

	function clickPiece(option) {
		const newPosition = copyPosition($game.positions[$game.positions.length - 1]);
		newPosition[$status.promotionValues.rank][$status.promotionValues.file] = '';
		newPosition[x][y] = color + option;
		possibleMoves.set([]);

		const newMove = getNewMoveNotation({
			...$status.promotionValues,
			position: $game.positions[$game.positions.length - 1],
			promotesTo: option,
			piece: $status.promotionValues.x === 7 ? 'wp' : 'bp'
		});

		game.update((state) => {
			return {
				...state,
				positions: [...state.positions, newPosition],
				moves: [...state.moves, newMove],
				turn: state.turn === 'w' ? 'b' : 'w'
			};
		});

		status.update((state) => {
			return {
				...state,
				status: statuses.ongoing,
				promotionValues: {
					rank: 0,
					file: 0,
					x: 0,
					y: 0
				}
			};
		});
	}
</script>

{#if $status.status === statuses.promoting}
	<div
		class="popup--inner promotion-choices"
		style:top={x === 7 ? '-12.5%' : '97.5%'}
		style:right={y >= 6 ? '0%' : undefined}
		style:left={getLeftStyle(y)}
	>
		{#each options as option}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="piece {color}{option}" on:click={() => clickPiece(option)}></div>
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
