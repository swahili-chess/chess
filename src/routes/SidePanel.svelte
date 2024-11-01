<script>
	import MovesList from './MovesList.svelte';
	import TakeBack from './TakeBack.svelte';
</script>

<div class="control">
	<MovesList />
	<TakeBack />
</div>

<style>
	.control {
		display: flex;
		flex-direction: column;
		padding: 10px;
		text-align: center;
		height: calc(8 * var(--tile-size));
	}
</style>
