<script>
    import AddItem from "$lib/AddItem.svelte";
    import ListMarket from "$lib/ListMarket.svelte";
    import { MARKETS } from "$lib/marketplace";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";

    const _items = writable(MARKETS)

    let showCreate = false
    const create = () => {
        showCreate = !showCreate
    }

    const close = () => {
        showCreate = false
    }

    onMount(() => {
        window._items = _items
    })
</script>

<svelte:head>
    <title>Marketplace</title>
</svelte:head>

<div class="flex flex-col gap-2 p-2 overflow-y-scroll">
    <div class="flex justify-end">
        <button on:click={create}>Create New Listing</button>
    </div>
    <div class="divider"/>
    {#if showCreate}
        <AddItem {close} />
        <div class="divider"/>
    {/if}
    {#each Object.keys($_items) as itemId, i}
        {#if i > 0}
            <div class="divider" />
        {/if}
        <ListMarket item={$_items[itemId]} />
    {/each}
</div>