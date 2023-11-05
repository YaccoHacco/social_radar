<script>
	import ChatsDisplay from "./ChatsDisplay.svelte";
	import MonetaryDisplay from "./MonetaryDisplay.svelte";

    export let item
    let focused = false

    const expand = () => {
        focused = !focused
    }
</script>

<div class="flex flex-col p-2 rounded mb-2">
    <div class="flex flex-row justify-between items-center">
        <div class="flex items-center gap-1 w-full">
            <div class="text-lg whitespace-nowrap overflow-hidden overflow-ellipsis" style="width: 200px;">
                {item?.title}
            </div>
            <!-- <div class=""/> -->
            <div class="flex-grow">
                <MonetaryDisplay price={item.price} />
            </div>
        </div>
        <button on:click={expand}>
            {focused ? "↑" : "↓"}
        </button>
    </div>
    {#if focused}
        <div>
            {item?.description}
        </div>
        <ChatsDisplay chats={item.chats} />
    {/if}
</div>