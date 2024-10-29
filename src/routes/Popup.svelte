<script>
	import PromotionBox from './PromotionBox.svelte';
	import { status, statuses } from '../store/store';
</script>

{#if $status.status === statuses.promoting}
	<div class="popup">
		<PromotionBox />
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
