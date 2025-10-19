const timelineSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Flat timeline of marine turtle conservation efforts with annotations and lines",
  "data": { "url": "data/turtle_conservation.csv" },

  "transform": [
    {
      "window": [{ "op": "rank", "as": "offsetIndex" }],
      "groupby": ["Year"],
      "sort": [{ "field": "Event" }]
    },
    {
      "calculate": "100 + (datum.offsetIndex - 1) * 30",
      "as": "offsetY"
    }
  ],

  "layer": [
    {
      "mark": { "type": "circle", "size": 200, "filled": true, "tooltip": true },
      "encoding": {
        "x": { "field": "Year", "type": "quantitative", "scale": { "domain": [2010, 2025] }, "axis": { "title": "Year", "labelAngle": 0, "format": "d" } },
        "y": { "field": "offsetY", "type": "quantitative", "axis": null },
        "color": { "field": "Region", "type": "nominal", "legend": { "title": "Region" } },
        "tooltip": [
          { "field": "Year" },
          { "field": "Event" },
          { "field": "Description" },
          { "field": "Region" }
        ]
      }
    },
    {
      "data": {
        "values": [
          { "x": 2010, "y": 130, "yText": 70, "text": "Turtle Excluder Devices: Global bycatch reduction" }
        ]
      },
      "layer": [
        {
          "mark": { "type": "rule", "strokeWidth": 1, "color": "red" },
          "encoding": {
            "x": { "field": "x", "type": "quantitative" },
            "y": { "field": "y", "type": "quantitative" },
            "y2": { "field": "yText" }
          }
        },
        {
          "mark": { "type": "text", "align": "center", "baseline": "top", "dy": 5, "fontSize": 12, "fontWeight": "bold", "color": "red" },
          "encoding": {
            "x": { "field": "x", "type": "quantitative" },
            "y": { "field": "yText", "type": "quantitative" },
            "text": { "field": "text" }
          }
        }
      ]
    }
    ,
    {
      "data": {
        "values": [
          { "x": 2023, "y": 100, "yText": 150, "text": "Green Turtle status improved to Least Concern" }
        ]
      },
      "layer": [
        {
          "mark": { "type": "rule", "strokeWidth": 1, "color": "green" },
          "encoding": {
            "x": { "field": "x", "type": "quantitative" },
            "y": { "field": "y", "type": "quantitative" },
            "y2": { "field": "yText" }
          }
        },
        {
          "mark": { "type": "text", "align": "center", "baseline": "bottom", "dy": -5, "fontSize": 12, "fontWeight": "bold", "color": "green" },
          "encoding": {
            "x": { "field": "x", "type": "quantitative" },
            "y": { "field": "yText", "type": "quantitative" },
            "text": { "field": "text" }
          }
        }
      ]
    }
  ],

  "config": {
    "view": { "stroke": null, "width": 1200, "height": 250 },
    "axis": { "labelFont": "Poppins", "titleFont": "Poppins" },
    "legend": { "labelFont": "Poppins", "titleFont": "Poppins" }
  }
};

vegaEmbed('#timelineVis', timelineSpec, { actions: false })
  .then(() => console.log("Timeline with annotations and lines loaded!"))
  .catch(console.error);
