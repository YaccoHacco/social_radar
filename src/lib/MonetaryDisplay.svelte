<script context="module">
    import { writable } from "svelte/store";
    import Flow_Logo from "$lib/Flow_Logo.png"
    import Hedera_Logo from "$lib/Hedera_Logo.png"

    const LIVECOINAPIKEY = "b3bf544b-431a-42f4-961f-87be9e0fdbb9" //"47e5b5be-d850-4a6c-baec-ed247c9e00dd"

    const getPrice = async (tokenCode = "") => {
        const res = await fetch(new Request("https://api.livecoinwatch.com/coins/single"), {
            method: "POST",
            headers: new Headers({
                "content-type": "application/json",
                "x-api-key": LIVECOINAPIKEY,
            }),
            body: JSON.stringify({
                currency: "USD",
                code: tokenCode,
                meta: true,
            }),
        });
        const data = await res.json()
        return data?.rate ?? 1
    }

    const _exchanges = writable({
        "FLOW": 1,
        "HBAR": 1,
    })

    const liveUpdatePrice = async () => {
        _exchanges.set({
            "FLOW": await getPrice("FLOW"),
            "HBAR": await getPrice("HBAR"),
        })
    }

    const autoTimeout = () => {
        liveUpdatePrice()
        setTimeout(autoTimeout, 30000)
    }

    autoTimeout()
</script>


<script>
    export let price
</script>

<div class="grid grid-cols-3 gap-1 text-xs">
    <div class="text-green-600">
        ${(price).toFixed(2)}
    </div>
    <div class="flex items-center gap-1">
        <div>
            {(price / $_exchanges.FLOW).toFixed(2)}
        </div>
        <img src={Flow_Logo} alt="FLOW" class="h-3"/>
    </div>
    <div class="flex items-center gap-1">
        <div>
            {(price / $_exchanges.HBAR).toFixed(2)}
        </div>
        <img src={Hedera_Logo} alt="HBAR" class="h-3"/>
    </div>
</div>