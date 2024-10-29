<script>
	import { game, status, possibleMoves } from '../store/store';
	import { moves } from '../moves/moves';
	export let rank;
	export let file;
	export let piece;

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
				castleDirection: $status.castleDirection[$game.turn],
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
