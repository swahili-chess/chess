<script>
	import { game, Statuses } from '../store/store';

	const takeBack = () => {
		if ($game.positions.length > 1) {
			const slicedPostns = $game.positions.slice(0, $game.positions.length - 1)
			slicedPostns[slicedPostns.length - 1].status = Statuses.ongoing
			slicedPostns[slicedPostns.length - 1].promotionValues = { rank: 0, file: 0, x: 0, y: 0 }
			game.set({
				positions: slicedPostns,
				turn: $game.turn === 'w' ? 'b' : 'w',
				possibleMoves: []
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
