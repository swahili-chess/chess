<script>
	import Piece from './Piece.svelte';
	import { gameState } from '../store/gamestore';
	import { possibleMoves } from '../store/movestore';

	let pieces_ref;
	$: current_position = $gameState.positions[$gameState.positions.length - 1]
	$: hack_position = $gameState.positions[$gameState.positions.length - 2]
	$: mv = $possibleMoves;

	function drop(e) {
		const { left, width, top } = pieces_ref.getBoundingClientRect();
		const size = width / 8;
		const y = Math.floor((e.clientX - left) / size);
		const x = 7 - Math.floor((e.clientY - top) / size);
		const [piece, rank, file] = e.dataTransfer.getData('text/plain').split(',');

		console.log("ssrf",rank, file )
		console.log("ssxy", x, y )
		if (mv?.find((m) => m[0] === x && m[1] === y)) {
			let c = current_position.map(row => [...row])
			c[rank][file] = '';
			c[x][y] = piece;
			gameState.update((state) => {
				return {
					...state,
					positions: [...state.positions, c],
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
	{#each current_position as _, r}
		{#each current_position as _, f}
			{#if current_position[r][f]}
				<Piece rank={r} file={f} piece={current_position[r][f]} />
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
