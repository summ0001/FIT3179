const dietSankeySpec = {
  "$schema": "https://vega.github.io/schema/vega/v5.2.json",
  "height": 470,
  "width": 600,
  "data": [
    {
      "name": "data",
      "values": [
        { "key": { "source": "Green Turtle", "target": "Algae" }, "value": 3 },
        { "key": { "source": "Green Turtle", "target": "Seaweed" }, "value": 3 },
        { "key": { "source": "Green Turtle", "target": "Seagrass" }, "value": 3 },
        { "key": { "source": "Leatherback", "target": "Jellies" }, "value": 3 },
        { "key": { "source": "Leatherback", "target": "Tunicates" }, "value": 3 },
        { "key": { "source": "Leatherback", "target": "Sea Squirts" }, "value": 3 },
        { "key": { "source": "Loggerhead", "target": "Crabs" }, "value": 3 },
        { "key": { "source": "Loggerhead", "target": "Conchs" }, "value": 3 },
        { "key": { "source": "Loggerhead", "target": "Whelks" }, "value": 3 },
        { "key": { "source": "Loggerhead", "target": "Horseshoe Crabs" }, "value": 3 },
        { "key": { "source": "Hawksbill", "target": "Sponges" }, "value": 3 },
        { "key": { "source": "Olive Ridley", "target": "Crabs" }, "value": 3 },
        { "key": { "source": "Olive Ridley", "target": "Shrimp" }, "value": 3 },
        { "key": { "source": "Olive Ridley", "target": "Lobster" }, "value": 3 },
        { "key": { "source": "Olive Ridley", "target": "Sea Urchins" }, "value": 3 },
        { "key": { "source": "Olive Ridley", "target": "Jellies" }, "value": 3 },
        { "key": { "source": "Olive Ridley", "target": "Algae" }, "value": 3 },
        { "key": { "source": "Olive Ridley", "target": "Fish" }, "value": 3 },
        { "key": { "source": "Kemp’s Ridley", "target": "Crabs" }, "value": 3 },
        { "key": { "source": "Kemp’s Ridley", "target": "Fish" }, "value": 3 },
        { "key": { "source": "Kemp’s Ridley", "target": "Jellies" }, "value": 3 },
        { "key": { "source": "Kemp’s Ridley", "target": "Shrimp" }, "value": 3 },
        { "key": { "source": "Kemp’s Ridley", "target": "Mollusks" }, "value": 3 },
        { "key": { "source": "Flatback", "target": "Sea Cucumbers" }, "value": 3 },
        { "key": { "source": "Flatback", "target": "Jellies" }, "value": 3 },
        { "key": { "source": "Flatback", "target": "Corals" }, "value": 3 },
        { "key": { "source": "Flatback", "target": "Shrimp" }, "value": 3 },
        { "key": { "source": "Flatback", "target": "Crabs" }, "value": 3 },
        { "key": { "source": "Flatback", "target": "Mollusks" }, "value": 3 },
        { "key": { "source": "Flatback", "target": "Fish" }, "value": 3 },
        { "key": { "source": "Flatback", "target": "Seaweed" }, "value": 3 },
      ],
      "transform": [
        { "type": "formula", "expr": "datum.key.source", "as": "source" },
        { "type": "formula", "expr": "datum.key.target", "as": "target" },
        { "type": "formula", "expr": "datum.value", "as": "size" }
      ]
    },
    {
      "name": "nodes",
      "source": "data",
      "transform": [
        {
          "type": "filter",
          "expr": "!groupSelector || groupSelector.source == datum.source || groupSelector.target == datum.target"
        },
        { "type": "formula", "expr": "datum.source+datum.target", "as": "key" },
        { "type": "fold", "fields": ["source", "target"], "as": ["stack", "groupId"] },
        {
          "type": "formula",
          "expr": "datum.stack == 'source' ? datum.source+' '+datum.target : datum.target+' '+datum.source",
          "as": "sortField"
        },
        {
          "type": "stack",
          "groupby": ["stack"],
          "sort": { "field": "sortField", "order": "descending" },
          "field": "size"
        },
        { "type": "formula", "expr": "(datum.y0+datum.y1)/2", "as": "yc" }
      ]
    },
    {
      "name": "groups",
      "source": "nodes",
      "transform": [
        {
          "type": "aggregate",
          "groupby": ["stack", "groupId"],
          "fields": ["size"],
          "ops": ["sum"],
          "as": ["total"]
        },
        {
          "type": "stack",
          "groupby": ["stack"],
          "sort": { "field": "groupId", "order": "descending" },
          "field": "total"
        },
        { "type": "formula", "expr": "scale('y', datum.y0)", "as": "scaledY0" },
        { "type": "formula", "expr": "scale('y', datum.y1)", "as": "scaledY1" },
        {
          "type": "formula",
          "expr": "datum.stack == 'source'",
          "as": "rightLabel"
        },
        {
          "type": "formula",
          "expr": "datum.total/domain('y')[1]",
          "as": "percentage"
        },
      ]
    },
    {
      "name": "targetNodes",
      "source": "nodes",
      "transform": [{ "type": "filter", "expr": "datum.stack == 'target'" }]
    },
    {
      "name": "edges",
      "source": "nodes",
      "transform": [
        { "type": "filter", "expr": "datum.stack == 'source'" },
        {
          "type": "lookup",
          "from": "targetNodes",
          "key": "key",
          "fields": ["key"],
          "as": ["target"]
        },
        {
          "type": "linkpath",
          "orient": "horizontal",
          "shape": "diagonal",
          "sourceY": { "expr": "scale('y', datum.yc)" },
          "sourceX": { "expr": "scale('x', 'source') + bandwidth('x')" },
          "targetY": { "expr": "scale('y', datum.target.yc)" },
          "targetX": { "expr": "scale('x', 'target')" }
        },
        {
          "type": "formula",
          "expr": "range('y')[0]-scale('y', datum.size)",
          "as": "strokeWidth"
        },
        {
          "type": "formula",
          "expr": "datum.size/domain('y')[1]",
          "as": "percentage"
        }
      ]
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "band",
      "range": "width",
      "domain": ["source", "target"],
      "paddingOuter": 0,
      "paddingInner": 0.95
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "domain": { "data": "nodes", "field": "y1" }
    },
    {
      "name": "color",
      "type": "ordinal",
      "range": "category",
      "domain": { "data": "data", "field": "source" }
    },
    {
      "name": "stackNames",
      "type": "ordinal",
      "range": ["Source", "Destination"],
      "domain": ["source", "target"]
    }
  ],
  "marks": [
    {
      "type": "path",
      "name": "edgeMark",
      "from": { "data": "edges" },
      "clip": true,
      "encode": {
        "update": {
          "stroke": [
            {
              "test": "groupSelector && groupSelector.stack=='source'",
              "scale": "color",
              "field": "target"
            },
            { "scale": "color", "field": "source" }
          ],
          "strokeWidth": { "field": "strokeWidth" },
          "path": { "field": "path" },
          "strokeOpacity": {
            "signal": "!groupSelector && (groupHover.source == datum.source || groupHover.target == datum.target) ? 0.9 : 0.3"
          },
          "zindex": {
            "signal": "!groupSelector && (groupHover.source == datum.source || groupHover.target == datum.target) ? 1 : 0"
          },
          "tooltip": {
            "signal": "datum.source + ' → ' + datum.target.groupId"
          }
        },
        "hover": { "strokeOpacity": { "value": 1 } }
      }
    },
    {
      "type": "rect",
      "name": "groupMark",
      "from": { "data": "groups" },
      "encode": {
        "enter": {
          "fill": { "scale": "color", "field": "groupId" },
          "width": { "scale": "x", "band": 1 }
        },
        "update": {
          "x": { "scale": "x", "field": "stack" },
          "y": { "field": "scaledY0" },
          "y2": { "field": "scaledY1" },
          "fillOpacity": { "value": 0.6 },
          "tooltip": {
            "signal": "datum.groupId"
          }
        },
        "hover": { "fillOpacity": { "value": 1 } }
      }
    },
    {
      "type": "text",
      "from": { "data": "groups" },
      "interactive": false,
      "encode": {
        "update": {
          "x": {
            "signal": "scale('x', datum.stack) + (datum.rightLabel ? bandwidth('x') + 8 : -8)"
          },
          "yc": { "signal": "(datum.scaledY0 + datum.scaledY1)/2" },
          "align": { "signal": "datum.rightLabel ? 'left' : 'right'" },
          "baseline": { "value": "middle" },
          "fontWeight": { "value": "bold" },
          "text": {
            "signal": "abs(datum.scaledY0-datum.scaledY1) > 13 ? datum.groupId : ''"
          }
        }
      }
    },
    {
      "type": "group",
      "data": [
        {
          "name": "dataForShowAll",
          "values": [{}],
          "transform": [{ "type": "filter", "expr": "groupSelector" }]
        }
      ],
      "encode": {
        "enter": {
          "xc": { "signal": "width/2" },
          "y": { "value": 30 },
          "width": { "value": 80 },
          "height": { "value": 30 }
        }
      },
      "marks": [
        {
          "type": "group",
          "name": "groupReset",
          "from": { "data": "dataForShowAll" },
          "encode": {
            "enter": {
              "cornerRadius": { "value": 6 },
              "fill": { "value": "#f5f5f5" },
              "stroke": { "value": "#c1c1c1" },
              "strokeWidth": { "value": 2 },
              "height": { "field": { "group": "height" } },
              "width": { "field": { "group": "width" } }
            },
            "update": { "opacity": { "value": 1 } },
            "hover": { "opacity": { "value": 0.7 } }
          },
          "marks": [
            {
              "type": "text",
              "interactive": false,
              "encode": {
                "enter": {
                  "xc": { "field": { "group": "width" }, "mult": 0.5 },
                  "yc": {
                    "field": { "group": "height" },
                    "mult": 0.5,
                    "offset": 2
                  },
                  "align": { "value": "center" },
                  "baseline": { "value": "middle" },
                  "fontWeight": { "value": "bold" },
                  "text": { "value": "Show All" }
                }
              }
            }
          ]
        }
      ]
    },
    {
      "type": "rect",
      "from": { "data": "nodes" },
      "encode": {
        "enter": {
          "stroke": { "value": "#000" },
          "strokeWidth": { "value": 2 },
          "width": { "scale": "x", "band": 1 },
          "x": { "scale": "x", "field": "stack" },
          "y": { "field": "y0", "scale": "y" },
          "y2": { "field": "y1", "scale": "y" }
        }
      }
    }
  ],
  "axes": [
    {
      "orient": "bottom",
      "scale": "x",
      "encode": {
        "labels": {
          "update": { "text": { "scale": "stackNames", "field": "value" } }
        }
      }
    },
  ],
  "signals": [
    {
      "name": "groupHover",
      "value": {},
      "on": [
        {
          "events": "@groupMark:mouseover",
          "update": "{source:datum.stack=='source' && datum.groupId, target:datum.stack=='target' && datum.groupId}"
        },
        { "events": "mouseout", "update": "{}" }
      ]
    },
    {
      "name": "groupSelector",
      "value": false,
      "on": [
        {
          "events": "@groupMark:click!",
          "update": "{stack:datum.stack, source:datum.stack=='source' && datum.groupId, target:datum.stack=='target' && datum.groupId}"
        },
        {
          "events": [
            { "type": "click", "markname": "groupReset" },
            { "type": "dblclick" }
          ],
          "update": "false"
        }
      ]
    }
  ]
};

// Embed chart
vegaEmbed('#dietVis', dietSankeySpec, { actions: false })
  .then(() => console.log("Sankey chart loaded!"))
  .catch(console.error);