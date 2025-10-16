const mapSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 800,
  "height": 600,
  "background": "#aadaff",

  "projection": {
    "type": "mercator",
    "center": {"expr": "[tx, ty]"},
    "scale": {"expr": "scale"}
  },

  "params": [
    {
      "name": "speciesFilter",
      "value": "All",
      "bind": {
        "input": "select",
        "name": "Select Species: ",
        "options": ["All", "Green", "Loggerhead", "Hawksbill", "Flatback"]
      }
    },
    {
      "name": "tx",
      "value": 133,
      "bind": {"input": "range", "min": 110, "max": 160, "step": 0.5, "name": "Longitude"}
    },
    {
      "name": "ty",
      "value": -27,
      "bind": {"input": "range", "min": -45, "max": -10, "step": 0.5, "name": "Latitude"}
    },
    {
      "name": "scale",
      "value": 800,
      "bind": {"input": "range", "min": 800, "max": 3500, "step": 10, "name": "Zoom"}
    }
  ],

  "layer": [
    // Base Australia map
    {
      "data": {
        "url": "data/australia.topojson",
        "format": {"type": "topojson", "feature": "ne_110m_admin_0_countries"}
      },
      "mark": {"type": "geoshape", "fill": "lightgrey", "stroke": "white"}
    },

    // State outlines
    {
      "data": {
        "url": "data/australia_states.topojson",
        "format": {"type": "topojson", "feature": "ne_50m_admin_1_states_provinces"}
      },
      "mark": {"type": "geoshape", "fill": null, "stroke": "#333", "strokeWidth": 1}
    },

    // Turtle points
    {
      "data": {"url": "data/turtles.csv"},
      "transform": [
        {"filter": "speciesFilter == 'All' || datum.species == speciesFilter"}
      ],
      "mark": {"type": "circle", "tooltip": {"content": "data"}},
      "encoding": {
        "longitude": {"field": "lon", "type": "quantitative"},
        "latitude": {"field": "lat", "type": "quantitative"},
        "size": {"value": 60},
        "color": {
          "field": "species",
          "type": "nominal",
          "scale": {
            "domain": ["Green", "Loggerhead", "Hawksbill", "Flatback"],
            "range": ["#4caf50", "#ef5350", "#ff9800", "#ffeb3b"]
          },
          "title": "Species"
        },
        "tooltip": [
          {"field": "species", "title": "Species"},
          {"field": "Speed (kph)", "title": "Speed (kph)"},
          {"field": "Depth (m)", "title": "Depth (m)"}
        ]
      }
    }
  ]
};

// Embed
vegaEmbed('#mapVis', mapSpec, {actions: false}).then(result => {
  const view = result.view;

  // Reset button functionality
  const resetBtn = document.getElementById('resetMapBtn');
  resetBtn.addEventListener('click', () => {
    view.signal('tx', 133);    // default center longitude
    view.signal('ty', -27);    // default center latitude
    view.signal('scale', 800); // default zoom
    view.runAsync();
  });

}).catch(console.error);
