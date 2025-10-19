const turtleSeasonChart = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Sea turtle nesting and hatching seasons (two bars per species)",
  "data": { "url": "data/nesting_hatching.csv" },

  "encoding": {
    "y": {
      "field": "Species",
      "type": "nominal",
      "title": "Turtle Species",
      "axis": { "labelLimit": 200 }
    },
    "yOffset": {
      "field": "Event",
      "type": "nominal"
    },
    "x": {
      "field": "StartMonth",
      "type": "quantitative",
      "title": "Month",
      "scale": { "domain": [1, 12] },
      "axis": {
        "tickMinStep": 1,
        "values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        "labelExpr": "['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][datum.value-1]"
      }
    },
    "x2": { "field": "EndMonth" },
    "color": {
      "field": "Event",
      "type": "nominal",
      "scale": { "scheme": "tealblues" },
      "legend": { "title": "Event Type" }
    },
    "tooltip": [
      { "field": "Species" },
      { "field": "Event" },
      { "field": "StartMonth", "title": "Start Month" },
      { "field": "EndMonth", "title": "End Month" }
    ]
  },

  "mark": {
    "type": "bar",
    "cornerRadius": 3,
    "height": { "band": 0.45 }
  },

  "config": {
    "view": { "stroke": null, "width": 1000, "height": 450 },
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

vegaEmbed('#nestingHatchingVis', turtleSeasonChart, { actions: false });