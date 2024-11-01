<script>
	import { game } from '../store/store';
</script>

<div class="moves-list">
	{#each $game.moves as move, i}
		<div data-number={Math.floor(i / 2) + 1}>{move}</div>
	{/each}
</div>

<style>
	.moves-list {
		display: flex;
		flex-direction: row;
		color: var(--dark-tile);
		flex: 1 1;
		flex-wrap: wrap;
		align-content: start;
		overflow: auto;
		font-size: 1.1em;
	}
	.moves-list div {
		flex-basis: 35%;
		padding-left: 15%;
		text-align: left;
		position: relative;
		padding-bottom: 5px;
	}
	.moves-list div[data-number]:nth-child(odd)::before {
		content: attr(data-number);
		position: absolute;
		left: 0;
		opacity: 0.5;
	}
</style>
