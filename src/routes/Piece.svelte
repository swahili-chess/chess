<script>
	import { game } from '../store/store';
	import { moves } from '../moves/moves';
	let { rank, file, piece } = $props();

	function dragstart(e) {
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', `${piece},${rank},${file}`);
		setTimeout(() => {
			e.target.style.display = 'None';
		}, 0);

		if ($game.turn === piece[0]) {
			const potentialMoves = moves.getValidMoves({
				currentPosition: $game.positions[$game.positions.length - 1].board,
				previousPosition: $game.positions[$game.positions.length - 2]?.board || undefined,
				castleDirection: $game.positions[$game.positions.length - 1].castleDirections[$game.turn],
				piece: piece,
				rank: rank,
				file: file
			});
			game.update((g) => ({
				...g,
				possibleMoves: potentialMoves
			}));
		}
	}

	function dragend(e) {
		e.target.style.display = 'block';
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	draggable={true}
	ondragstart={dragstart}
	ondragend={dragend}
	class="piece {piece} p-{file}{rank}"
></div>
