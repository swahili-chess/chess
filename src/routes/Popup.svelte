<script>
	import PromotionBox from './PromotionBox.svelte';
	import { status, statuses } from '../store/store';
	import GameEnd from './GameEnd.svelte';
	// svelte-ignore reactive_declaration_non_reactive_property
	$: isGameOngoing = $status.status === statuses.ongoing || $status.status === statuses.promoting;
</script>

{#if $status.status === statuses.promoting}
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
