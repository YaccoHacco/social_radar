<script context="module">
    let idNum = 20000
</script>

<script>
    import { get } from "svelte/store";

    export let close

    let description = ""

    const create = () => {
        const chat = {
            name: "Me",
            description,
            createdAt: new Date(),
            replies: [],
        }
        window._chats.set({ [idNum]:chat, ...get(window._chats) })
        idNum++
        close?.()
    }
</script>

<div class="flex flex-col gap-2">
    <div class="text-lg">
        Create Chat
    </div>
    <input placeholder="Description" bind:value={description}>
    <button on:click={create}>Create</button>
</div>