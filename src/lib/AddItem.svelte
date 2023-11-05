<script context="module">
    let idNum = 20000
</script>

<script>
    import { get } from "svelte/store";

    export let close

    let title = ""
    let description = ""
    let price = 0

    const create = () => {
        const item = {
            title,
            description,
            price,
            createdAt: new Date(),
            chats: [],
        }
        window._items.set({ [idNum]:item, ...get(window._items) })
        idNum++
        close?.()
    }
</script>

<div class="flex flex-col gap-2">
    <div class="text-lg">
        Create Market Listing
    </div>
    <input placeholder="Title" bind:value={title}>
    <input placeholder="Description" bind:value={description}>
    <input type="number" placeholder="Price" bind:value={price}/>
    <button on:click={create}>Create</button>
</div>