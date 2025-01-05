<script>
	let { files } = $props();
</script>

<div class="files">
	{#each files as file}
		<span>{String.fromCharCode(96 + file)}</span>
	{/each}
</div>

<style>
	.files {
		grid-column: 2;
		display: flex;
		align-items: center;
		justify-content: space-around;
		color: var(--dark-tile);
		height: calc(0.25 * var(--tile-size));
	}
</style>
