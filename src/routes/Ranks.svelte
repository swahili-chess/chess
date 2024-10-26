<script>
	let { ranks } = $props();
</script>

<div class="ranks">
	{#each ranks as rank}
		<span>{rank}</span>
	{/each}
</div>

<style>
	.ranks {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		color: var(--dark-tile);
	}
</style>
