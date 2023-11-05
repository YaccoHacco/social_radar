<script>
    import AddChat from "$lib/AddChat.svelte";
    import ListChat from "$lib/ListChat.svelte";
    import { CHATS } from "$lib/chats";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";

    const _chats = writable(CHATS)

    let showCreate = false
    const create = () => {
        showCreate = !showCreate
    }

    const close = () => {
        showCreate = false
    }

    onMount(() => {
        window._chats = _chats
    })
</script>

<svelte:head>
    <title>Chat</title>
</svelte:head>

<div class="flex flex-col gap-2 p-2 overflow-y-scroll">
    <div class="flex justify-end">
        <button on:click={create}>Create New Chat</button>
    </div>
    <div class="divider"/>
    {#if showCreate}
        <AddChat {close} />
        <div class="divider"/>
    {/if}
    {#each Object.keys($_chats) as chatId, i}
        {#if i > 0}
            <div class="divider" />
        {/if}
        <ListChat chat={$_chats[chatId]} />
    {/each}
</div>