const spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Bubble chart of sea turtle predators and human threats, positioned manually for clarity.",
  "width": 550,
  "height": 350,
  "data": { "url": "data/threats.csv" },

  "params": [
    {
      "name": "TypeSelect",
      "bind": {
        "input": "select",
        "options": [null, "Natural", "Human"],
        "labels": ["All", "Natural", "Human"],
        "name": "Filter by Threat Type: "
      }
    }
  ],

  "transform": [
    { "filter": "TypeSelect == null || datum.Type == TypeSelect" }
  ],

  "layer": [
    {
      "mark": { "type": "circle", "opacity": 0.85, "stroke": "black", "strokeWidth": 1 },
      "encoding": {
        "x": {
          "field": "x",
          "type": "quantitative",
          "axis": null,
          "scale": { "domain": [100, 520] }
        },
        "y": {
          "field": "y",
          "type": "quantitative",
          "axis": null,
          "scale": { "domain": [100, 420] }
        },
        "size": {
          "field": "Severity",
          "type": "quantitative",
          "scale": { "range": [200, 3000] },
          "legend": { "title": "Severity" }
        },
        "color": {
          "field": "Type",
          "type": "nominal",
          "legend": { "title": "Threat Type" },
          "scale": { "domain": ["Natural", "Human"], "range": ["#1f78b4", "#e31a1c"] }
        },
        "tooltip": [
          { "field": "Threat", "title": "Predator/Threat" },
          { "field": "Type", "title": "Type" },
          { "field": "Severity", "title": "Severity" },
          { "field": "Notes/Info", "title": "Details" }
        ]
      }
    },
    {
      "transform": [
        { "filter": "datum.Severity >= 10" },
        { "window": [{ "op": "rank", "as": "rank" }], "sort": [{ "field": "Severity", "order": "descending" }] },
        { "filter": "datum.rank <= 3" }
      ],
      "mark": {
        "type": "text",
        "align": "left",
        "baseline": "middle",
        "dx": 10,
        "dy": -10,
        "fontWeight": "bold",
        "color": "#000"
      },
      "encoding": {
        "x": { "field": "x", "type": "quantitative" },
        "y": { "field": "y", "type": "quantitative" },
        "text": { "field": "Threat", "type": "nominal" }
      }
    }
  ],

  "selection": {
    "hover": { "type": "single", "on": "mouseover", "empty": "none", "clear": "mouseout" }
  }
};

vegaEmbed('#vis', spec).catch(console.error);