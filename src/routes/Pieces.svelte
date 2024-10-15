<script>
	import Piece from "./Piece.svelte";
    import { store } from "../store"

    let pieces_ref;

    $: position = $store.positions[$store.positions.length - 1]

    function drop (e) {
        const { left, width, top } = pieces_ref.getBoundingClientRect()
        const size = width / 8
        const y = Math.floor((e.clientX - left)/ size)
        const x = 7 - Math.floor((e.clientY - top) / size)
        const [piece,rank ,file] = e.dataTransfer.getData("text/plain").split(",")
        position[rank][file] = ""
        position[x][y] = piece
        store.update(state => {
            return { ...state, positions: [...state.positions, position], turn: state.turn === 'w' ? 'b' : 'w' };
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