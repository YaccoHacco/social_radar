<script>
	import ChatsDisplay from "./ChatsDisplay.svelte";
import { getGlyph } from "./glyphs";

    export let data
    export let marker
    export let focused

    $: glyph = data ? getGlyph(data) : {}

    let root
    $: if(focused) {
        root?.scrollIntoView({ behavior: "smooth" })
    }

    let liked = false
    let disliked = false

    const like = () => {
        if (liked) data.likes--;
        else {
            data.likes++;
            if (disliked) dislike()
        }
        liked = !liked
    }

    const dislike = () => {
        if (disliked) data.dislikes--;
        else {
            data.dislikes++;
            if (liked) like()
        }
        disliked = !disliked
    }

    const expand = () => {
        window.map.panTo(data.position)
        focused = !focused
    }
</script>

<div class="flex flex-col p-2 rounded mb-2" bind:this={root}>
    <div class="flex flex-row justify-between items-center">
        <div class="flex items-center justify-between w-full">
            <div class="flex flex-grow gap-1 items-center whitespace-nowrap overflow-hidden overflow-ellipsis">
                <div>
                    {glyph?.glyph}
                </div>
                <div class="text-lg">
                    {data?.title}
                </div>
            </div>
            <div class="flex gap-1 items-center">
                <div class="text-green-700 select-none cursor-pointer text-right" on:click={like}>
                    {data?.likes}👍
                </div>
                <div class="text-red-600 select-none cursor-pointer text-right" on:click={dislike}>
                    {data?.dislikes}👎
                </div>
            </div>
        </div>
        <button on:click={expand}>
            {focused ? "↑" : "↓"}
        </button>
    </div>
    {#if focused}
        <div>
            {data?.description}
        </div>
        <ChatsDisplay chats={data.chats} />
    {/if}
</div>