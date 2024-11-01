<script>
	import Files from './Files.svelte';
	import Pieces from './Pieces.svelte';
	import Ranks from './Ranks.svelte';
	import { game, possibleMoves } from '../store/store';
	import '../styles.css';
	import Popup from './Popup.svelte';
	import { moves } from '../moves/moves';
	import { getKingPosition } from '../moves/king';

	let ranks = Array(8)
		.fill()
		.map((x, i) => 8 - i);
	let files = Array(8)
		.fill()
		.map((x, i) => i + 1);

	$: checkTile = (() => {
		const isInCheck = moves.isPlayerInCheck({
			positionAfterMove: $game.positions[$game.positions.length - 1],
			player: $game.turn
		});

		if (isInCheck) return getKingPosition($game.positions[$game.positions.length - 1], $game.turn);

		return null;
	})();

	const getClassName = (i, j) => {
		let c = 'tile';
		c += (i + j) % 2 === 0 ? ' tile--dark' : ' tile--light';
		if ($possibleMoves?.find((m) => m[0] === i && m[1] === j)) {
			if ($game.positions[$game.positions.length - 1][i][j]) c += ' attacking';
			else c += ' highlight';
		}

		if (checkTile && checkTile[0] === i && checkTile[1] === j) {
			c += ' checked';
		}

		return c;
	};
</script>

<div class="board">
	<Ranks {ranks} />
	<div class="tiles">
		{#each ranks as _, i}
			{#each files as _, j}
				<div class={getClassName(7 - i, j)}></div>
			{/each}
		{/each}
	</div>
	<Pieces />
	<Popup />
	<Files {files} />
</div>

<style>
	.board {
		display: grid;
		grid-template-columns: calc(0.25 * var(--tile-size)) calc(8 * var(--tile-size));
		position: relative;
	}

	.tiles {
		display: grid;
		grid-template-columns: repeat(8, var(--tile-size));
		grid-template-rows: repeat(8, var(--tile-size));
		width: calc(8 * var(--tile-size));
	}

	.tile {
		position: relative;
	}

	.tile--light {
		background: var(--light-tile);
	}

	.tile--dark {
		background: var(--dark-tile);
	}

	.highlight:after {
		display: block;
		position: absolute;
		content: '';
		width: calc(0.5 * var(--tile-size));
		height: calc(0.5 * var(--tile-size));
		background: var(--highlight);
		border-radius: 50%;
		left: 25%;
		top: 25%;
	}
	.attacking:after {
		display: block;
		position: absolute;
		content: '';
		border: 6px solid var(--highlight);
		width: calc(var(--tile-size) - 12px);
		height: calc(var(--tile-size) - 12px);
		border-radius: 50%;
		left: 0;
		top: 0;
	}

	.checked:after {
		display: block;
		position: absolute;
		content: '';
		width: var(--tile-size);
		height: var(--tile-size);
		background: var(--check);
		border-radius: 20px;
		left: 0;
		top: 0;
	}
</style>
