<script>
    import "../app.css";
    import SocialRadar_Logo from '$lib/SocialRadar_Logo.png';
    import SocialRadar_Chat_Logo from '$lib/SocialRadar_Chat_Logo.png';
    import SocialRadar_Marketplace_Logo from '$lib/SocialRadar_Marketplace_Logo.png';
	import LoadGoogleMaps from "$lib/LoadGoogleMaps.svelte";
    import Map from "$lib/Map.svelte";
	import { GLYPHS } from "$lib/glyphs";
    import { MARKERS } from "$lib/markers";
    import { onMount } from "svelte";
	import { writable } from "svelte/store";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    let mounted = false
    let loadMap = false

    const _filters = writable({})
    const _appliedMarkers = writable({})

    $: pathname = $page.url.pathname.replace('/', '')
    const pages = {
        home: {
            title: "Home",
            logo: SocialRadar_Logo,

        },
        chat: {
            title: "Chat",
            logo: SocialRadar_Chat_Logo,
        },
        marketplace: {
            title: "Marketplace",
            logo: SocialRadar_Marketplace_Logo,
        }
    }

    const initMap = () => {
        loadMap = true
    }

    const genTest = () => {
        let testMarkers = {}
        let i = 0
        for(let mainGroup in GLYPHS) {
            for (let subtype in GLYPHS[mainGroup]) {
                testMarkers["TEST-"+i] = {
                    type: mainGroup,
                    subtype, 
                    title: "TEST - " + subtype,
                    description: "TEST DESC",
                    position: {
                        lat: 39.1871877,
                        lng: -96.5612468 - 0.002*i,
                    }
                }
                i++
            }
        }

        return testMarkers;
    }

    onMount(() => {
        mounted = true
        
        // window._markers = writable(genTest())
        window._markers = writable(MARKERS)
        window._filters = _filters
        window._appliedMarkers = _appliedMarkers
        window.initMap = initMap
        if (window.google) initMap()
    })
</script>

{#if mounted && !window.google}
    <LoadGoogleMaps />
{/if}

<div class="flex w-full h-full bg-gray-900 text-white" style="background-color: #1d2c4d;--border-map: #304a7d;">
    <div class="flex flex-col border-r-2" style="border-color: var(--border-map);width: 500px;">
        <div class="flex justify-center items-center gap-2 py-1">
            <div>
                {#if pages[pathname]}
                    <img src={pages[pathname].logo} alt="Logo" class="h-8" />
                {/if}
            </div>
            <div class="text-2xl">Social Radar</div>
        </div>

        <div class="flex flex-row justify-evenly gap-x-1 p-1 mx-1 border-b-2" style="border-color: var(--border-map);">
            {#each Object.keys(pages) as pageId}
                <button on:click={() => goto(pageId)}>
                    {pages[pageId].title}
                </button>
            {/each}
        </div>
        
        <div class="flex-grow overflow-y-scroll">
            {#if loadMap}
                <slot {_appliedMarkers} />
            {/if}
        </div>
    </div>

    <div class="flex-grow">
        {#if loadMap}
            <Map {_appliedMarkers} />
        {/if}
    </div>
</div>

<style global windi:preflights:global windi:safelist:global>
    html, body {
        @apply w-full h-full;
    }

    * {
        outline: none !important;
    }

    button {
        @apply rounded bg-blue-gray-700 px-1 shadow shadow-black;
    }

    button:hover {
        @apply bg-blue-gray-600;
    }

    input {
        @apply rounded bg-blue-gray-700 px-1;
    }

    .border-map {
        border-color: var(--border-map);
    }

    .divider {
        @apply border-[1px] rounded w-full shadow-xl shadow-black;
        border-color: var(--border-map);
    }
</style>
