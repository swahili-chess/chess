<script>
	import Piece from './Piece.svelte';
	import { gameState } from '../state/game.svelte.js';
	import { possibleMoves } from '../state/move.svelte.js';

	let pieces_ref = $state();
	let cp = $derived(gameState.positions[gameState.positions.length - 1])
	let currentPosition = gameState.positions[gameState.positions.length - 1]
	

	function drop(e) {
		const { left, width, top } = pieces_ref.getBoundingClientRect();
		const size = width / 8;
		const y = Math.floor((e.clientX - left) / size);
		const x = 7 - Math.floor((e.clientY - top) / size);
		const [piece, rank, file] = e.dataTransfer.getData('text/plain').split(',');

<<<<<<< HEAD
		// console.log("ssrf",rank, file )
		// console.log("ssxy", x, y )

		if ( x === Number(rank) && y === Number(file)){
			return;
=======
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
>>>>>>> 973851a8e3b3c3a4b54346e454f931fa82e5fe36
		}

		if (possibleMoves?.find((m) => m[0] === x && m[1] === y)) {
			console.log("before")
			console.log( "turn", $state.snapshot(gameState.turn))
			console.log("ss" , $state.snapshot(gameState.positions))

			let c = currentPosition.map(subArray => [...subArray]);

			c[rank][file] = '';
			c[x][y] = piece;


			gameState.positions.push(c)
			gameState.turn = gameState.turn === 'w' ? 'b' : 'w'

			console.log( "turn", $state.snapshot(gameState.turn))
			console.log("ss" , $state.snapshot(gameState.positions))

			console.log("after")
			console.log( "turn", $state.snapshot(gameState.turn))
			console.log("ss" , $state.snapshot(gameState.positions))
		}

		possibleMoves.splice(0, possibleMoves.length);
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={pieces_ref}
	ondrop={(event) => drop(event)}
	ondragover={(ev) => {
		ev.preventDefault();
	}}
	class="pieces"
>
	{#each cp as _, r}
		{#each cp as _, f}
			{#if cp[r][f]}
				<Piece rank={r} file={f} piece={cp[r][f]} />
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
