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
<<<<<<< HEAD

	@media all and (max-width: 859px) {
	.control {
		height: 80px;
	}
}
=======
>>>>>>> origin/main
</style>
