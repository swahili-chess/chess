<script>
    import Board from "./Board.svelte";
    import '../styles.css';
</script>

<div class="page">
      <Board/>
</div>


<style>
    .page {
        display: grid;
        place-content: center;
        height: 100vh;
        background: var(--bg-color);
        font-family: 'Sofia Sans', sans-serif;
    }

</style>

