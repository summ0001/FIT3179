const timelineSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "Wave-like timeline of marine turtle conservation efforts",
    "data": { "url": "data/turtle_conservation.csv" },
    
    "transform": [
        {
            // Add a y-position to create the wave effect
            "calculate": "50 + 30 * sin(datum.Year / 2)", 
            "as": "waveY"
        }
    ],

    "mark": {
        "type": "circle",
        "tooltip": true,
        "size": 150,
        "filled": true
    },

    "encoding": {
        "x": { 
            "field": "Year", 
            "type": "temporal",
            "axis": { title: "Year", format: "%Y" }
        },
        "y": {
            "field": "waveY",
            "type": "quantitative",
            "axis": null
        },
        "tooltip": [
            { "field": "Year", "title": "Year" },
            { "field": "Event", "title": "Event" },
            { "field": "Description", "title": "Details" },
            { "field": "Region", "title": "Region" }
        ],
        "color": {
            "field": "Region",
            "type": "nominal",
            "legend": { title: "Region" }
        }
    },

    "config": {
        "view": { "stroke": null },
        "axis": {
            "labelFont": "Poppins",
            "titleFont": "Poppins"
        },
        "legend": {
            "labelFont": "Poppins",
            "titleFont": "Poppins"
        }
    }
};

// Embed chart
vegaEmbed('#timelineVis', timelineSpec, { actions: false })
    .then(() => console.log("Wave timeline loaded!"))
    .catch(console.error);