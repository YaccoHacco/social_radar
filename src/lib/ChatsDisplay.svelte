<script>
    export let chats = []
    
    let newChat = ""

    const createNewChat = () => {
        chats.push({
            name: "Me",
            description: newChat,
            createdAt: new Date(),
        })
        chats = chats
        newChat = ""
    }
</script>

<div class="flex flex-col gap-2 border-l-2 pl-2 border-map" >
    {#each chats as chat, i}
        <div class="flex flex-col">
            <div class="flex justify-between items-center">
                <div>
                    {chat.name}
                </div>
                <div class="divider mx-2"/>
                <div class="text-sm text-gray-400">
                    {chat.createdAt.toLocaleDateString("en-US")}
                </div>
            </div>
            <div class="bg-blue-gray-800">
                {chat.description}
            </div>
        </div>
    {/each}
    <div class="divider" />
    <div class="flex w-full gap-2">
        <input placeholder="New Chat" class="flex-grow" bind:value={newChat}>
        <button on:click={createNewChat}>Submit</button>
    </div>
</div>