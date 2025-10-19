const turtleLifecycleSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Circular lifecycle of a sea turtle.",
  "width": 400,
  "height": 500,
  "data": {
    "values": [
      { "stage": "Egg", "order": 1, "description": "Turtles lay eggs on sandy beaches." },
      { "stage": "Hatchling", "order": 2, "description": "Hatchlings emerge and head toward the sea." },
      { "stage": "Juvenile", "order": 3, "description": "Young turtles live in open ocean currents." },
      { "stage": "Subadult", "order": 4, "description": "Subadults move to coastal foraging grounds." },
      { "stage": "Adult", "order": 5, "description": "Adults mature and migrate long distances." },
      { "stage": "Nesting", "order": 6, "description": "Females return to beaches to lay eggs." }
    ]
  },

  "encoding": {
    "theta": {
      "field": "order",
      "type": "ordinal",
      "sort": "ascending"
    },
    "color": {
      "field": "stage",
      "type": "nominal",
      "title": "Lifecycle Stage",
      "sort": { "field": "order" },
      "scale": {
        "range": [
          "#fdd835",
          "#81d4fa",
          "#4fc3f7",
          "#29b6f6",
          "#0288d1",
          "#66bb6a"
        ]
      }
    },
    "tooltip": [
      { "field": "stage", "title": "Stage" },
      { "field": "description", "title": "Details" }
    ]
  },

  "layer": [
    {
      "mark": {
        "type": "arc",
        "innerRadius": 100,
        "outerRadius": 200,
        "cornerRadius": 8
      }
    },
    {
      "mark": {
        "type": "text",
        "radius": 230,
        "fontSize": 13,
        "align": "center",
        "baseline": "middle",
        "fontWeight": "bold",
        "color": "#333"
      },
      "encoding": {
        "text": { "field": "stage" }
      }
    }
  ],

  "view": { "stroke": null },
  "config": {
    "title": {
      "font": "Poppins",
      "fontSize": 20,
      "fontWeight": "600",
      "color": "#00796b",
      "anchor": "middle"
    }
  },
};

vegaEmbed("#lifecycleVis", turtleLifecycleSpec, { actions: false })
  .then(() => console.log("Lifecycle chart loaded!"))
  .catch(console.error);