<script>
	import { status, game, possibleMoves, initPos, initialGame, initialStatus } from '../store/store';
	const isWin = $status.status.endsWith('wins');
	const newGame = () => {
		game.set(initialGame);
		status.set(initialStatus);
		possibleMoves.set([]);
	};
</script>

<div class="popup--inner popup--inner__center">
	<h1>{isWin ? $status.status : 'Draw'}</h1>
	<p>{!isWin && $status.status}</p>
	<div class={$status.status}></div>
	<button on:click={() => newGame()}>New Game</button>
</div>

<style>
	.popup--inner {
		width: 50%;
		min-height: 12.5%;
		background: var(--light-tile);
		position: absolute;
		border: 8px solid var(--light-tile);
		box-shadow: 0 0 0 8px var(--dark-tile);
	}

	.popup--inner {
		width: 50%;
		min-height: 12.5%;
		background: var(--light-tile);
		position: absolute;
		border: 8px solid var(--light-tile);
		box-shadow: 0 0 0 8px var(--dark-tile);
	}
	.popup--inner__center {
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		padding: 1em 0;
	}

	.popup--inner__center h1 {
		font-size: 2.5em;
		margin: 0 0 0.5em 0;
	}
	.popup--inner__center p {
		font-size: 1.2em;
		margin: 0 0 1em 0;
	}

	button {
		background: var(--dark-tile);
		color: var(--light-tile);
		border: 0 none;
		padding: 10px 30px;
		margin: 10px 0;
		font-size: 1.1em;
	}
</style>
