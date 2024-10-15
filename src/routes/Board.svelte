<script>
    import Files from "./Files.svelte";
	import Pieces from "./Pieces.svelte";
    import Ranks from "./Ranks.svelte";
    import { possibleMoves } from "../store";
    import { gameState } from "../store"
    import '../styles.css';


    let ranks = Array(8).fill().map((x,i) => 8 - i)
    let files = Array(8).fill().map((x,i) => i + 1)

    $: mv = $possibleMoves 
    $: position = $gameState.positions[$gameState.positions.length - 1]

    const getClassName = (mv,i,j) => {
        let c = 'tile'
        c+= (i+j)%2 === 0 ? ' tile--dark' : ' tile--light'
        if (mv?.find(m => m[0] === i && m[1] === j)){
            if (position[i][j])
                c+= ' attacking'
            else 
                c+= ' highlight'
        }

        return c
    }

</script>

<div class="board">
    <Ranks ranks={ranks}/>
    <div class="tiles">
        {#each ranks as rank, i}
           {#each files as file, j}
              <div class="{getClassName(mv,7-i,j)}"></div>
           {/each}
        {/each}
    </div>
    <Pieces/>
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
        position: relative;
    }

    .tile--light {
       background: var(--light-tile) ;
    }

     .tile--dark {
       background: var(--dark-tile) ;
    }

    .highlight:after {
        display: block;
        position: absolute;
        content: '';
        width : calc(.5*var(--tile-size));
        height : calc(.5*var(--tile-size));
        background: var(--highlight);
        border-radius: 50%;
        left: 25%;
        top: 25%;
}
   .attacking:after {
        display: block;
        position: absolute;
        content: '';
        border: 6px solid var(--highlight);
        width : calc(var(--tile-size) - 12px);
        height : calc(var(--tile-size) - 12px);
        border-radius: 50%;
        left: 0;
        top: 0;
    }
</style>
