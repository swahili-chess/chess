<script>
	import Piece from "./Piece.svelte";

    let pieces_ref;

    let position =  new Array(8).fill("").map(x=>new Array(8).fill(""))
    for (let i = 0; i < 8; i++) {
        position[1][i] = 'wp'
        position[6][i] = 'bp'
   }    

    position[0][0] = 'wr'
    position[0][1] = 'wn'
    position[0][2] = 'wb'
    position[0][3] = 'wq'
    position[0][4] = 'wk'
    position[0][5] = 'wb'
    position[0][6] = 'wn'
    position[0][7] = 'wr'
    
    position[7][0] = 'br'
    position[7][1] = 'bn'
    position[7][2] = 'bb'
    position[7][3] = 'bq'
    position[7][4] = 'bk'
    position[7][5] = 'bb'
    position[7][6] = 'bn'
    position[7][7] = 'br'


    function drop (e) {
        const rec = pieces_ref.getBoundingClientRect()
        const size = rec.width / 8
        const y = Math.floor((e.clientX - rec.left)/ size)
        const x = 7 - Math.floor((e.clientY - rec.top) / size)
        const [piece,rank ,file] = e.dataTransfer.getData("text/plain").split(",")
        position[rank][file] = ""
        position[x][y] = piece
        position = position
   
    }


</script>



<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:this={pieces_ref} on:drop={event => drop(event)} on:dragover={(ev) => { ev.preventDefault() }} class="pieces">
    {#each position as _, r}
        {#each position as _, f}
             {#if position[r][f]}
                <Piece rank={r} file={f} piece={position[r][f]} />
             {:else}
              {""}
            {/if}
        {/each}
    {/each}

</div>


<style>
    .pieces {
        position: absolute;
        left: calc(.25* var(--tile-size));
        right: 0;
        top: 0;
        bottom: calc(.25* var(--tile-size));
     

    }
</style>