<script>
	export let rank;
	export let file;
	export let piece;

	import { game } from '../store/store';
	import { possibleMoves } from '../store/store';
	import { moves } from '../moves/moves';

	function dragstart(e) {
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', `${piece},${rank},${file}`);
		setTimeout(() => {
			e.target.style.display = 'None';
		}, 0);

		if ($game.turn === piece[0]) {
			const potentialMoves = moves.getValidMoves({
				currentPosition: $game.positions[$game.positions.length - 1],
				previousPosition: $game.positions[$game.positions.length - 2],
				piece: piece,
				rank: rank,
				file: file
			});
			possibleMoves.set(potentialMoves);
		}
	}

	function dragend(e) {
		e.target.style.display = 'block';
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	draggable={true}
	on:dragstart={dragstart}
	on:dragend={dragend}
	class="piece {piece} p-{file}{rank}"
></div>

