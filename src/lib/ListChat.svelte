<script>
	import ChatsDisplay from "./ChatsDisplay.svelte";

    export let chat
    let focused = false

    const expand = () => {
        focused = !focused
    }
</script>

<div class="flex flex-col p-2 rounded mb-2">
    <div class="flex flex-row justify-between items-center">
        <div class="flex items-center gap-1 w-full">
            <div class="text-lg whitespace-nowrap overflow-hidden overflow-ellipsis" style="width: 200px;">
                {chat?.name}
            </div>
            <!-- <div class="text-green-700 select-none cursor-pointer" on:click={like}>
                {data?.likes}👍
            </div>
            <div class="text-red-600 select-none cursor-pointer" on:click={dislike}>
                {data?.dislikes}👎
            </div> -->
        </div>
        <button on:click={expand}>
            {focused ? "↑" : "↓"}
        </button>
    </div>
    <div>
        {chat?.description}
    </div>
    {#if focused}
        <ChatsDisplay chats={chat.replies} />
    {/if}
</div>