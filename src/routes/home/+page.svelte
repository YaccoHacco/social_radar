<script>
    import { GLYPHS } from "$lib/glyphs";
	import { onMount } from "svelte";
    import ListMarker from "$lib/ListMarker.svelte";
    import AddSocialPoint from "$lib/AddSocialPoint.svelte";

    let _filters = window._filters
    let _appliedMarkers = window._appliedMarkers

    const toggleMainFilter = (e, filter) => {
        let newFilters = { ...$_filters }
        newFilters[filter] = !newFilters[filter]
        for (let subFilter of Object.keys(GLYPHS[filter])) {
            if (subFilter != 'default') newFilters[subFilter] = !!newFilters[filter]
        }
        $_filters = newFilters
    }

    const toggleSubFilter = (e, filter) => {
        $_filters[filter] = !$_filters[filter]
    }

    let showFilters = false

    let showAdd = false

    onMount(() => {
        window._filters = _filters
    })
</script>

<svelte:head>
    <title>Social Radar</title>
</svelte:head>

<div class="flex flex-col overflow-y-scroll gap-1 p-1 mx-1 border-b-2" style="border-color: var(--border-map);">
    <div class="flex justify-between">
        <button on:click={() => showFilters = !showFilters}>{showFilters ? "Hide" : "Show"} Filters</button>
        <button on:click={() => showAdd = !showAdd}>Create Social Point</button>
    </div>

    {#if showAdd}
        <AddSocialPoint close={() => showAdd = false}/>
    {/if}

    {#if showFilters}
        {#each Object.keys(GLYPHS) as majorType}
            <div class="w-full border-b-2" style="border-color: var(--border-map);"></div>
            <div class="selectable-filter" on:click|stopPropagation={(e) => toggleMainFilter(e, majorType)}>
                <input type="checkbox" bind:checked={$_filters[majorType]} />
                <div>
                    {GLYPHS[majorType].default.glyph}
                </div>
                <div>
                    {majorType}
                </div>
            </div>
            {#each Object.keys(GLYPHS[majorType]) as subType}
                {#if subType != 'default'}
                    <div class="selectable-filter" on:click|stopPropagation={(e) => toggleSubFilter(e, subType)}>
                        <div class="border-4 rounded" style="border-color: {GLYPHS[majorType][subType].color};"></div>
                        <input type="checkbox" class="" bind:checked={$_filters[subType]} />
                        <div>
                            {GLYPHS[majorType][subType].glyph}
                        </div>
                        <div>
                            {subType}
                        </div>
                    </div>
                {/if}
            {/each}
        {/each}
    {/if}
</div>

<div class="flex flex-col gap-2 p-2">
    {#each Object.keys($_appliedMarkers) as markerId, i}
        {#if i > 0}
            <div class="divider" />
        {/if}
        <ListMarker {...$_appliedMarkers[markerId]} />
    {/each}
</div>

<style>
    .selectable-filter {
        @apply flex flex-row items-center gap-2 w-full px-2 rounded;
    }

    .selectable-filter:hover {
        @apply bg-blue-gray-800 flex flex-row w-full;
    }
</style>