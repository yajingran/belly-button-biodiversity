function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

 
// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
 
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    console.log(result);
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids.slice(0,10);
    var otu_labels = result.otu_labels.slice(0,10);
    var sample_values = result.sample_values.slice(0,10).sort((a,b) => a - b)
    console.log(otu_ids);
    console.log(otu_labels);
    console.log(sample_values);
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var sorted_otu_ids = otu_ids.sort((a,b) => b.sample_values - a.sample_values).reverse();
    var yticks = sorted_otu_ids.map(id => "OTU" + id);
    console.log(sorted_otu_ids);
    console.log(yticks);
    // 8. Create the trace for the bar chart. 
    var barData = [{
      type: 'bar',
      x: sample_values,
      y: yticks,
      hovertext: otu_labels,
      orientation: 'h'
    }];
      
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found"};
    
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar', barData, barLayout);
  

    // 1. Create the trace for the bubble chart.
     var bubbleData = [{
       x: otu_ids,
       y: sample_values,
       hovertext: otu_labels,
       mode: 'markers',
       marker: {
         color: otu_ids,
         size: sample_values

       }
}
    ];
 
    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Belly Button Bacteria Bubble Chart',
      xaxis: {title: "OTU ID (Operational taxonmic unit)",
      },
      yaxis: {title: 'Sample Value'},
      width: 1100,
      plot_bgcolor: 'rgba(0, 0, 0, 0)',
      paper_bgcolor: 'rgba(0, 0, 0, 0)'
    };
 
    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
 

    // 4. Create the trace for the gauge chart.
   let level = parseFloat(wfreq) * 20;
   var gaugeData = [{
     type: "indicator",
     mode: "gauge+number",
     value: 'level',
     title: {text: 'Bellyt Button Bacteria Gauge Chart'},
     gauge: {
       axis: {range: [null, 10], tickwidth: 1, tickcolor: "darkblue"},
       bar: {color: "darkblue"},
       bgcolor: "white",
       borderwidth: 2,
       bordercolor: "gray",
     }

   }
  ];
  
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      shapes: [
        {
          type: "path",
        
          fillcolor: "850000",
          line: {
            color: "850000"
          }
        }
      ],
      title: "Belly Button Washing Frequency <br> Scrubs per Week",
      height: 500,
      width: 500,
      xaxis: {
        zeroline:false,
        showticklabels: false,
        showgrid: false,
        range: [-1, 1]
      },
      yaxis: {
        zeroline: false,
        showticklabels: false,
        showgrid: false,
        range: [-1, 1]
      }
    };
      
  
 
   // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, guageLayout);
  });
}


  
  
