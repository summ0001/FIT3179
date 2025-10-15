const dietSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "Pie charts showing the diet composition of different sea turtle species.",
    "data": { "url": "data/diet.csv" },

    // --- Create a species filter parameter ---
    "params": [{
        "name": "speciesFilter",
        "value": "All",
        "bind": {
            "input": "select",
            "options": [
                "All",
                "Green Turtle",
                "Hawksbill",
                "Leatherback",
                "Loggerhead",
                "Olive Ridley",
                "Kemp's Ridley",
                "Flatback"
            ],
            "labels": [
                "All Species",
                "Green Turtle",
                "Hawksbill",
                "Leatherback",
                "Loggerhead",
                "Olive Ridley",
                "Kemp's Ridley",
                "Flatback"
            ],
            "name": "Select Species: "
        }
    }],

    // --- Filter based on dropdown selection ---
    "transform": [{
        "filter": "speciesFilter == 'All' || datum.Species == speciesFilter"
    }],

    // --- Layout setup ---
    "facet": {
        "field": "Species",
        "type": "nominal",
        "columns": 3,  // ≤ Controls how many charts per row
        "title": "Sea Turtle Diet by Species"
    },

    // --- Chart spec for each facet ---
    "spec": {
        "width": 180,
        "height": 180,
        "mark": {
            "type": "arc",
            "outerRadius": 80,
            "stroke": "white",
            "strokeWidth": 1
        },
        "encoding": {
            "theta": { "aggregate": "count", "type": "quantitative" },
            "color": {
                "field": "Food",
                "type": "nominal",
                "title": "Food Type",
                "scale": {
                    "domain": [
                        "Algae", "Seagrass", "Seaweed", "Jellies", "Tunicates", "Sea Squirts",
                        "Crabs", "Conchs", "Whelks", "Horseshoe Crabs", "Sponges",
                        "Shrimp", "Lobster", "Sea Urchins", "Fish", "Mollusks", "Sea Cucumbers",
                        "Corals"
                    ],
                    "range": [
                        "#66bb6a", "#81c784", "#388e3c", "#4fc3f7", "#29b6f6", "#0288d1",
                        "#ff7043", "#ffb74d", "#f57c00", "#bf360c", "#ab47bc",
                        "#ffcc80", "#ef6c00", "#8d6e63", "#42a5f5", "#90a4ae", "#a5d6a7",
                        "#4db6ac"
                    ]
                }
            },
            "order": { "field": "Food", "type": "nominal" },
            "tooltip": [
                { "field": "Species", "title": "Species" },
                { "field": "Food", "title": "Food Type" },
                { "field": "Notes", "title": "Notes" }
            ]
        }
    },

    // --- Layout and style ---
    "autosize": {
        "type": "fit",
        "contains": "padding",
        "center": true
    },
    "config": {
        "view": { "stroke": null },
        "facet": { "spacing": 20 },
        "title": {
            "font": "Poppins",
            "fontSize": 18,
            "fontWeight": "600",
            "color": "#00796b"
        },
        "legend": {
            "orient": "bottom",
            "direction": "horizontal",
            "columns": 9,
            "labelFont": "Poppins",
            "labelFontSize": 12,
            "titleFont": "Poppins",
            "titleFontSize": 13
        }
    }
};

// Embed chart
vegaEmbed('#dietVis', dietSpec, { actions: false })
    .then(() => console.log("Diet chart loaded successfully!"))
    .catch(console.error);