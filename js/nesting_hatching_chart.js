const nestingHatchingSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Interactive circular year clock of turtle nesting and hatching periods",
  
  "data": { "url": "data/nesting_hatching.csv" },

  "params": [
    {
      "name": "speciesSelect",
      "value": "All",
      "bind": {
        "input": "select",
        "options": [
          "All",
          "Southern Great Barrier Reef Green Turtle",
          "Northern Great Barrier Reef Green Turtle",
          "Gulf of Carpentaria Green Turtle",
          "Eastern Queensland Flatback Turtle",
          "Arafura Sea Flatback Turtle",
          "Hawksbill Turtle",
          "Loggerhead Turtle",
          "Olive Ridley Turtle",
          "Leatherback Turtle"
        ],
        "labels": [
          "All Species",
          "S GBR Green",
          "N GBR Green",
          "Gulf Green",
          "E QLD Flatback",
          "Arafura Flatback",
          "Hawksbill",
          "Loggerhead",
          "Olive Ridley",
          "Leatherback"
        ],
        "name": "Select Species: "
      }
    },
    {
      "name": "eventSelect",
      "value": "All",
      "bind": {
        "input": "select",
        "options": ["All", "Nesting", "Hatching"],
        "labels": ["All Events", "Nesting", "Hatching"],
        "name": "Select Event: "
      }
    }
  ],

  "transform": [
    {
      "filter": "(speciesSelect == 'All' || datum.Species == speciesSelect) && (eventSelect == 'All' || datum.Event == eventSelect)"
    },
    {
      "calculate": "datum.Event == 'Nesting' ? 0 : 15",
      "as": "eventOffset"
    }
  ],

  "encoding": {
    "theta": { "field": "StartMonth", "type": "quantitative", "scale": { "domain": [0, 12] }, "axis": null },
    "theta2": { "field": "EndMonth", "type": "quantitative" },
    "radius": {
      "field": "Species",
      "type": "ordinal",
      "scale": { "rangeStep": 40 },
      "axis": null
    },
    "color": {
      "field": "Event",
      "type": "nominal",
      "scale": { "domain": ["Nesting", "Hatching"], "range": ["#26c6da", "#81c784"] },
      "legend": { "orient": "bottom", "title": "Event Type", "labelFont": "Poppins", "titleFont": "Poppins" }
    },
    "tooltip": [
      { "field": "Species", "title": "Species" },
      { "field": "Event", "title": "Event" },
      { "field": "StartMonth", "title": "Start Month" },
      { "field": "EndMonth", "title": "End Month" }
    ]
  },

  "layer": [
    // Month clock background image
    {
      "data": { "url": "Images/month_clock.png" },
      "mark": { "type": "image", "width": 700, "height": 700 },
      "encoding": { "x": { "value": 0 }, "y": { "value": 0 } }
    },

    // Light background ring
    {
      "mark": { "type": "arc", "color": "#e0f7fa", "opacity": 0.3, "innerRadius": 40, "outerRadius": 280 },
      "encoding": { "theta": { "value": 0 }, "theta2": { "value": 360 } }
    },

    // Turtle event arcs with non-overlapping concentric rings
    {
      "mark": { "type": "arc", "cornerRadius": 5, "stroke": "white", "strokeWidth": 1.2 },
      "encoding": {
        "innerRadius": { "expr": "datum.radius + datum.eventOffset" },
        "outerRadius": { "expr": "datum.radius + datum.eventOffset + 12" }
      }
    }
  ],

  "width": 700,
  "height": 700,
  "autosize": { "type": "fit", "contains": "padding" },

  "config": { "background": "#f0f9f9", "view": { "stroke": null }, "arc": { "tooltip": true } }
};

vegaEmbed('#nestingHatchingVis', nestingHatchingSpec, { actions: false })
  .then(() => console.log("🐢 Circular timeline fixed: no overlap!"))
  .catch(console.error);
