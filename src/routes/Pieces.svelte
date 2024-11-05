<script>
	import Piece from './Piece.svelte';
	import { game, Statuses } from '../store/store';
	import { moves } from '../moves/moves';
	import { getCastlingDirections } from '../moves/castle';
	import { getNewMoveNotation } from '../moves/notations';

	let pieces_ref;
	let updateCastleDirection;
	$: currentPosition = $game.positions[$game.positions.length - 1].board;

	const updateCastlingState = ({ piece, file, rank }) => {
		const direction = getCastlingDirections({
			castleDirection: $game.positions[$game.positions.length - 1].castleDirections,
			piece,
			file,
			rank
		});
	};

	function drop(e) {
		const { left, width, top } = pieces_ref.getBoundingClientRect();
		const size = width / 8;
		const y = Math.floor((e.clientX - left) / size);
		const x = 7 - Math.floor((e.clientY - top) / size);
		const [piece, rank, file] = e.dataTransfer.getData('text/plain').split(',');
		const opponent = piece.startsWith('b') ? 'w' : 'b';
		const opponentcastleDirection =
			$game.positions[$game.positions.length - 1].castleDirections[
				`${piece.startsWith('b') ? 'w' : 'b'}`
			];

		if ($game.possibleMoves?.find((m) => m[0] === x && m[1] === y)) {
			// This check if the piece is promoting && returns if so
			if ((piece === 'wp' && x === 7) || (piece === 'bp' && x === 0)) {
				game.update((g) => {
					const postn = [...g.positions];
					postn[postn.length - 1].promotionValues = {
						rank: Number(rank),
						file: Number(file),
						x: x,
						y: y
					};

					postn[postn.length - 1].status = Statuses.promoting;

					return {
						...g,
						positions: postn
					};
				});

				return;
			}

			if (piece.endsWith('r') || piece.endsWith('k')) {
				updateCastleDirection = updateCastlingState({ piece, file, rank });
			}

			const newPosition = moves.performMove({
				currentPosition: currentPosition,
				piece: piece,
				rank: Number(rank),
				file: Number(file),
				x: x,
				y: y
			});

			const newMoveNotation = getNewMoveNotation({
				piece,
				rank,
				file,
				x,
				y,
				position: currentPosition
			});

			game.update((g) => {
				const lastPosition = g.positions[g.positions.length - 1];
				const updatedCastleDirections = updateCastleDirection
					? { ...lastPosition.castleDirections, [piece[0]]: direction }
					: { ...lastPosition.castleDirections };

				const pstn = {
					board: newPosition,
					movesMade: newMoveNotation,
					status: g.positions[g.positions.length - 1].status,
					castleDirections: updatedCastleDirections,
					promotionValues: { rank: 0, file: 0, x: 0, y: 0 }
				};
				return {
					...g,
					positions: [...g.positions, pstn],
					turn: g.turn === 'w' ? 'b' : 'w',
					possibleMoves: []
				};
			});

			if (moves.insufficientMaterial(newPosition)) {
				game.update((g) => {
					const u = { ...g };
					u.positions[u.positions.length - 1].status = Statuses.insufficient;
					return u;
				});
			} else if (moves.isStalemate(newPosition, opponent, opponentcastleDirection)) {
				game.update((g) => {
					const u = { ...g };
					u.positions[u.positions.length - 1].status = Statuses.stalemate;
					return u;
				});
			} else if (moves.isCheckMate(newPosition, opponent, opponentcastleDirection)) {
				game.update((g) => {
					const u = { ...g };
					u.positions[u.positions.length - 1].status = piece.startsWith('w')
						? Statuses.white
						: Statuses.black;
					return u;
				});
			}
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
