const riverPlasticSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "height": 300,
    "width": 500,
    "description": "Top rivers contributing to ocean plastic pollution",
    "data": {
        "url": "data/plastics-top-rivers.csv"
    },
    "mark": "bar",
    "encoding": {
        "y": {
            "field": "Entity",
            "type": "ordinal",
            "sort": "-x",
            "axis": { "title": "River" }
        },
        "x": {
            "field": "Share of global plastics emitted to ocean",
            "type": "quantitative",
            "axis": { "title": "% of contribution" }
        },
        "tooltip": [
            { "field": "Entity", "type": "nominal", "title": "River" },
            {
                "field": "Share of global plastics emitted to ocean",
                "type": "quantitative",
                "title": "Global Plastic Share (%)",
            }
        ]

    }
};

vegaEmbed('#riverBarVis', riverPlasticSpec, { actions: false })
    .then(() => console.log("Bar Chart loaded!"))
    .catch(console.error);