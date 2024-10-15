<script>
	import Piece from "./Piece.svelte";
    import { store } from "../store"

    let pieces_ref;

    $: position = $store .positions[$store.positions.length - 1]

    function drop (e) {
        const rec = pieces_ref.getBoundingClientRect()
        const size = rec.width / 8
        const y = Math.floor((e.clientX - rec.left)/ size)
        const x = 7 - Math.floor((e.clientY - rec.top) / size)
        const [piece,rank ,file] = e.dataTransfer.getData("text/plain").split(",")
        position[rank][file] = ""
        position[x][y] = piece
        store.update(state => {
           const newPos = [...state.positions, position];
           const newTurn = state.turn === 'w' ? 'b' : 'w';
            return { ...state, positions: newPos, turn: newTurn };
        });        
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