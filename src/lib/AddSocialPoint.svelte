<script context="module">
    let idNum = 20000
</script>

<script>
	import { onMount } from "svelte";

    import { GLYPHS } from "./glyphs";
    import { get } from "svelte/store";

    export let close

    let subtype
    let title = ""
    let description = ""

    let marker

    const create = () => {
        const socialPoint = {
            title,
            description,
            type: "Event",
            subtype,
            position: {
                lat: marker.position.lat,
                lng: marker.position.lng,
            },
            likes: 0,
            dislikes: 0,
            createdAt: new Date(),
            chats: [],
        }
        window._markers.set({ [idNum]:socialPoint, ...get(window._markers) })
        idNum++
        marker.setMap(null)
        close?.()
    }

    onMount(() => {
        marker = window.addDraggable(window.map.center.lat(), window.map.center.lng())
    })
</script>

<div class="w-full flex flex-col gap-2">
    <div class="text-lg">
        Create Event
    </div>
    <div class="flex items-center gap-2">
        <div>
            Type:
        </div>
        <select class="bg-blue-gray-700 text-black rounded p-2" bind:value={subtype}>
            {#each Object.keys(GLYPHS.Event) as subtype}
                <option value={subtype}>
                    {GLYPHS.Event[subtype].glyph} {subtype == 'default' ? "Event" : subtype}
                </option>
            {/each}
        </select>
    </div>
    <input placeholder="Title" bind:value={title}>
    <input placeholder="Description" bind:value={description}>

    <button on:click={create}>Create</button>
</div>