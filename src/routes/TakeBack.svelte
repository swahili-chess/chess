<script>
	import { game } from '../store/store';

	const takeBack = () => {
		if ($game.positions.length > 1) {
			game.set({
				positions: $game.positions.slice(0, $game.positions.length - 1),
				moves: $game.moves.slice(0, $game.moves.length - 1),
				turn: $game.turn === 'w' ? 'b' : 'w'
			});
		}
	};
</script>

<div>
	<button on:click={() => takeBack()}>Take Back</button>
</div>

<style>
	button {
		background: var(--dark-tile);
		color: var(--light-tile);
		border: 0 none;
		padding: 10px 30px;
		margin: 10px 0;
		font-size: 1.1em;
	}
</style>
