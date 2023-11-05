export const GLYPHS = {
    Business: {
        default: {
            color: "#878787",
            glyph: "🏢",
        },
        Restaurant: {
            color: "#70a6b8",
            glyph: "🍴",
        },
        "Movie Theater": {
            color: "#d41900",
            glyph: "🍿",
        },
        Store: {
            color: "#3e902d",
            glyph: "🛒",
        },
        "Gas Station": {
            color: "#703200",
            glyph: "⛽",
        },
        Bank: {
            color: "#6ad419",
            glyph: "💰",
        },
        Bar: {
            color: "#fad348",
            glyph: "🍺",
        },
    },
    Event: {
        default: {
            color: "#ffffff",
            glyph: "🎈",
        },
        Fraternity: {
            color: "#000080",
            glyph: "Φ",
        },
        Sorority: {
            color: "#890061",
            glyph: "Δ",
        },
        Accident: {
            color: "#ff0000",
            glyph: "⚠",
        },
        Police: {
            color: "#006af5",
            glyph: "👮",
        },
        Party: {
            color: "#fc86fc",
            glyph: "🎉",
        },
        Sport: {
            color: "#194501",
            glyph: "🎾",
        },
        Music: {
            color: "#777777",
            glyph: "♫",
        },
        Theatre: {
            color: "#000000",
            glyph: "🎭",
        },
        Crime: {
            color: "#877f7f",
            glyph: "🚨",
        },
        "Free Stuff": {
            color: "#76f59e",
            glyph: "%",
        },
        "Computer Science": {
            color: "#512888",
            glyph: "💻",
        },
        Club: {
            color: "#890061",
            glyph: "♣",
        },
        "Outdoor Activity": {
            color: "#778265",
            glyph: "🌳",
        },
        "University": {
            color: "#512888",
            glyph: "🐈",
        },
        Funny: {
            color: "#45abff",
            glyph: "☺",
        },
    },
};

export const getGlyph = marker => GLYPHS[marker.type][marker.subtype] ?? GLYPHS[marker.type].default