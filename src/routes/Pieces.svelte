<script>
	import Piece from './Piece.svelte';
	import { game } from '../store/store';
	import { possibleMoves, status, statuses } from '../store/store';
	import { moves } from '../moves/moves';
	import { getCastlingDirections } from '../moves/castle';

	let pieces_ref;
	$: currentPosition = $game.positions[$game.positions.length - 1];

	const updateCastlingState = ({ piece, file, rank }) => {
		const direction = getCastlingDirections({
			castleDirection: $status.castleDirection,
			piece,
			file,
			rank
		});
		if (direction) {
			status.update((s) => {
				return {
					...s,
					castleDirection: {
						...s.castleDirection,
						[piece[0]]: direction
					}
				};
			});
		}
	};
	function drop(e) {
		const { left, width, top } = pieces_ref.getBoundingClientRect();
		const size = width / 8;
		const y = Math.floor((e.clientX - left) / size);
		const x = 7 - Math.floor((e.clientY - top) / size);
		const [piece, rank, file] = e.dataTransfer.getData('text/plain').split(',');
		const opponent = piece.startsWith('b') ? 'w' : 'b';
		const castleDirection = $status.castleDirection[`${piece.startsWith('b') ? 'w' : 'b'}`];

		if ($possibleMoves?.find((m) => m[0] === x && m[1] === y)) {
			if ((piece === 'wp' && x === 7) || (piece === 'bp' && x === 0)) {
				status.update((state) => {
					return {
						...state,
						status: statuses.promoting,
						promotionValues: {
							rank: Number(rank),
							file: Number(file),
							x: x,
							y: y
						}
					};
				});
				return;
			}

			if (piece.endsWith('r') || piece.endsWith('k')) {
				updateCastlingState({ piece, file, rank });
			}

			const newPosition = moves.performMove({
				currentPosition: currentPosition,
				piece: piece,
				rank: Number(rank),
				file: Number(file),
				x: x,
				y: y
			});
			game.update((state) => {
				return {
					...state,
					positions: [...state.positions, newPosition],
					turn: state.turn === 'w' ? 'b' : 'w'
				};
			});

			if (moves.isStalemate(newPosition, opponent, castleDirection)) {
				status.update((state) => {
					return {
						...state,
						status: statuses.stalemate
					};
				});
			}

			possibleMoves.set([]);
		}
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
