<script>
	import PromotionBox from './PromotionBox.svelte';
	import { game, Statuses } from '../store/store';
	import GameEnd from './GameEnd.svelte';

	$: status = $game.positions[$game.positions.length - 1].status;
	// svelte-ignore reactive_declaration_non_reactive_property
	$: isGameOngoing = status === Statuses.ongoing || status === Statuses.promoting;
</script>

{#if status === Statuses.promoting}
	<div class="popup">
		<PromotionBox />
	</div>
{:else if !isGameOngoing}
	<div class="popup">
		<GameEnd />
	</div>
{/if}

<style>
	.popup {
		right: 0;
		top: 0;
		position: absolute;
		left: calc(0.25 * var(--tile-size));
		bottom: calc(0.25 * var(--tile-size));
		background: var(--highlight);
	}
</style>
