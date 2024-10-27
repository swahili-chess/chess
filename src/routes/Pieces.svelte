<script>
	import Piece from './Piece.svelte';
	import { game } from '../store/store';
	import { possibleMoves } from '../store/store';

	let pieces_ref;
	$: currentPosition = $game.positions[$game.positions.length - 1];
	$: pm = $possibleMoves;

	function drop(e) {
		const { left, width, top } = pieces_ref.getBoundingClientRect();
		const size = width / 8;
		const y = Math.floor((e.clientX - left) / size);
		const x = 7 - Math.floor((e.clientY - top) / size);
		const [piece, rank, file] = e.dataTransfer.getData('text/plain').split(',');

		if (pm?.find((m) => m[0] === x && m[1] === y)) {
			let cp = currentPosition.map((row) => [...row]);
			//en passant
			if (piece.endsWith('p') && cp[x][y] === '' && x != rank && y != file) {
				cp[rank][y] = '';
			}

			cp[rank][file] = '';
			cp[x][y] = piece;

			game.update((state) => {
				return {
					...state,
					positions: [...state.positions, cp],
					turn: state.turn === 'w' ? 'b' : 'w'
				};
			});
		}

		possibleMoves.set([]);
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	bind:this={pieces_ref}
	on:drop={(event) => drop(event)}
	on:dragover={(ev) => {
		ev.preventDefault();
	}}
	class="pieces"
>
	{#each currentPosition as _, r}
		{#each currentPosition as _, f}
			{#if currentPosition[r][f]}
				<Piece rank={r} file={f} piece={currentPosition[r][f]} />
			{:else}
				{''}
			{/if}
		{/each}
	{/each}
</div>

<style>
	.pieces {
		position: absolute;
		left: calc(0.25 * var(--tile-size));
		right: 0;
		top: 0;
		bottom: calc(0.25 * var(--tile-size));
	}
</style>
