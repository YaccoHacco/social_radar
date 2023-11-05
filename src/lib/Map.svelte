<script>
    import { onMount } from 'svelte';
	import { get, writable } from 'svelte/store';
    import { getGlyph } from './glyphs';

    const mapId = '94cf590b1a154720'

    const ManhattanLoc = {lat: 39.1843789, lng: -96.5798161}

    // https://console.cloud.google.com/home/dashboard?project=mapsapp-403721
    // https://developers.google.com/maps/documentation/javascript/advanced-markers/accessible-markers

    // Manhattan: 39.1843789,-96.5798161,13.58z
    // McDonalds: 39.1871877,-96.5612468

    export let _appliedMarkers

    let container = undefined;
    let map;
    let zoom = 13.58;

    onMount(async () => {
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

        map = new Map(container, {
            zoom,
            center: ManhattanLoc,
            mapId,
        });

        window.map = map

        /*
            ratings?: {
                1: 0
                2: 0
                3: 0
                4: 0
                5: 0
            },
        */

        /*
        "CUSTOM_ID_NUM": {
            position: { lat:0, lng:0 },
            title: "",
            description: "",
            type: "",
            subtype: "",
            likes?: 0,
            dislikes?: 0,

            createdAt: new Date(),

            chats: [
                {
                    name: "...",
                    description: "...",
                    createdAt: new Date(),
                },
            ],
        },
        */

        // { lat: 39.1871877, lng: -96.5612468 }

        const addDraggable = (lat, lng) => {
            const markerElm = new AdvancedMarkerElement({
                map,
                position: { lat, lng },
                gmpDraggable: true,
            })
            return markerElm
        }
        window.addDraggable = addDraggable
        
        const applyMarkers = (markers, filters) => {
            let newMarkers = {}
            const filterArray = Array.from(Object.keys(filters)).filter((f) => filters[f])
            for (const markerId in markers) {
                const marker = markers[markerId]
                if (filterArray.length > 0) {
                    if (!filterArray.includes(marker.type) && !filterArray.includes(marker.subtype)) {
                        if ($_appliedMarkers[markerId]) {
                            $_appliedMarkers[markerId].marker.setMap(null)
                        }
                        continue
                    }
                }
                if ($_appliedMarkers[markerId] != undefined) {
                    newMarkers[markerId] = $_appliedMarkers[markerId]
                    continue
                }

                const glyph = getGlyph(marker)
                const pin = new PinElement({
                    glyph: glyph.glyph,
                    background: glyph.color,
                    borderColor: glyph.color,
                })
            
                const markerElm = new AdvancedMarkerElement({
                    map,
                    position: marker.position,
                    title: marker.title,
                    //animation: google.maps.Animation.DROP,
                    content: pin.element,
                })

                markerElm.addListener('click', () => {
                    $_appliedMarkers[markerId].focused = true
                    map.panTo(marker.position)
                })

                newMarkers[markerId] = {
                    focused: false,
                    data: marker,
                    marker: markerElm,
                }
            }
            $_appliedMarkers = newMarkers
        }

        const unsubMarkers = window._markers.subscribe((markers) => applyMarkers(markers, get(window._filters)))
        const unsubFilters = window._filters.subscribe((filters) => applyMarkers(get(window._markers), filters))

        return () => {
            unsubMarkers()
            unsubFilters()
        }
    });
</script>

<style>
    .map {
        @apply w-full h-full;
    }
</style>

<div class="map" bind:this={container}></div>