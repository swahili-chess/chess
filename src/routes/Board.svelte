<script>
    import Files from "./Files.svelte";
    import Ranks from "./Ranks.svelte";
    let ranks = Array(8).fill().map((x,i) => 8 - i)
    let files = Array(8).fill().map((x,i) => i + 1)
</script>
<div class="board">
    <Ranks ranks={ranks}/>
    <div class="tiles">
           {#each ranks as rank, i}
               {#each files as file, j}
                 <div class="tile {(i+j) % 2 == 0 ? "tile--light" : " tile--dark" }"></div>
               {/each}
           {/each}
    </div>
    <Files files={files}/>
</div>


<style>
    .board {
        display: grid;
        grid-template-columns: calc(.25*var(--tile-size)) calc(8*var(--tile-size));
        position: relative;

    }

    .tiles {
        display: grid;
        grid-template-columns: repeat(8, var(--tile-size));
        grid-template-rows: repeat(8, var(--tile-size));
        width: calc(8* var(--tile-size));
    }

    .tile {

    }

    .tile--light {
       background: var(--light-tile) ;
    }

     .tile--dark {
       background: var(--dark-tile) ;
    }
</style>
