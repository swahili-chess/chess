<script>
	import Board from './Board.svelte';
	import '../styles.css';
	import SidePanel from './SidePanel.svelte';
</script>

<div class="page">
	<Board />
	<SidePanel />
</div>

<style>
	.page {
		display: grid;
		place-content: center;
		height: 100vh;
		background: var(--bg-color);
		font-family: 'Sofia Sans', sans-serif;
		grid-template-columns: auto 220px;
	}
<<<<<<< HEAD

	@media all and (max-width: 1000px) {
	.page {
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 2rem;
	}
}

=======
>>>>>>> origin/main
</style>
