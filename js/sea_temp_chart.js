const sstLineSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Monthly Sea Surface Temperature Around Australia with top annotation",
  "data": { "url": "data/australia_sst_timeseries.csv" },
  "width": 1200,
  "height": 500,
  "params": [
    {
      "name": "selectedYear",
      "value": 1854,
      "bind": {
        "input": "range",
        "min": 1854,
        "max": 2025,
        "step": 1,
        "name": "Start Year:"
      }
    }
  ],
  "transform": [
    { "filter": "year(datum.time) >= selectedYear" }
  ],
  "layer": [
    // Line
    {
      "mark": { "type": "line", "point": false, "tooltip": true },
      "encoding": {
        "x": { "field": "time", "type": "temporal", "title": "Year" },
        "y": { "field": "sst", "type": "quantitative", "title": "Sea Surface Temperature (°C)", "scale": { "domain": [18, 25] } },
        "tooltip": [
          { "field": "time", "type": "temporal", "title": "Date" },
          { "field": "sst", "type": "quantitative", "title": "SST (°C)", "format": ".2f" }
        ]
      }
    },
    // Annotation
    {
      "transform": [
        { "window": [{ "op": "rank", "field": "sst", "as": "rankSST" }], "sort": [{ "field": "sst", "order": "descending" }] },
        { "filter": "datum.rankSST === 1" }
      ],
      "mark": {
        "type": "text",
        "align": "center",
        "baseline": "bottom",
        "dy": -10,
        "fontSize": 16,
        "fontWeight": "bold",
        "color": "red"
      },
      "encoding": {
        "x": { "field": "time", "type": "temporal" },
        "y": { "field": "sst", "type": "quantitative" },
        "text": { "value": "Highest mean sea temp since 1854, indicates rising temps" }
      }
    }
  ]
};

vegaEmbed('#sstVis', sstLineSpec, { actions: false })
  .then(() => console.log("SST line chart with annotation on top loaded!"))
  .catch(console.error);
