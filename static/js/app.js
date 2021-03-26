
var dropdownmenu = d3.select('#selDataset');

d3.json("data/samples.json").then(function (data) {

    var data_names = data.names;
    
    data_names.forEach(function (id) {
      dropdownmenu
          .append("option")
          .text(id)
          .property("value", id);
    });


    // define default ID
    demo_info("0")
    bar_chart("0")
    bubble_chart("0")
    gauge_chart("0")
     // console.log(data.metadata[selected_id]);
  });

function optionChanged(value){
d3.json("data/samples.json").then(function (data) {
     var data_names = data.names;
     var index = data_names.indexOf(value);
     demo_info(index);
     bar_chart(index);
     bubble_chart(index);
     gauge_chart(index);
});
};

function demo_info(selected_id){
     d3.json("data/samples.json").then(function (data) {
          //console.log(data.metadata[selected_id]);
          var demo_data=data.metadata[selected_id];
          var sampleinfo = d3.select('#sample-metadata');
          sampleinfo.html('');
          Object.keys(demo_data).forEach((key) => {
               sampleinfo
                    .append('text').html(key + ": " + demo_data[key])
                    .append('br');
     });
     });
};

function bar_chart(selected_id){
     console.log("2 bar chart");
     d3.json("data/samples.json").then(function (data) {
          var otu_data=data.samples[selected_id];
          var otu_sample_val=otu_data.sample_values.slice(0, 10);
          var otu_ids=otu_data.otu_ids.slice(0, 10);
          var otu_idList = [];
          for (let i = 0; i < otu_ids.length; i++) {
               otu_idList.push(`OTU ${otu_ids[i]}`);
          }

          var otu_labels=otu_data.otu_labels.slice(0, 10)
          
          console.log(otu_sample_val);
          console.log(otu_ids);

          var trace = {
               x: otu_sample_val,
               y: otu_idList,
               type: "bar",
               orientation: "h"
             };

          // data
          var chartData = [trace];

          var layout = {
               title: "Top 10 Microbial Species Found <br> in Subject's Belly Button",
               margin: {
                 l: 100,
                 r: 100,
                 t: 100,
                 b: 100
               },
               autosize: false,
               yaxis: {
                    autorange: "reversed",
                    automargin: true
               }
          };
          return Plotly.newPlot("bar", chartData, layout);
     });
}

function bubble_chart(selected_id){
     d3.json("data/samples.json").then(function (data) {
          var otu_data=data.samples[selected_id];
          var otu_sample_val=otu_data.sample_values;
          var otu_ids=otu_data.otu_ids;
          var otu_labels=otu_data.otu_labels;
          var trace1 = {
               x: otu_ids,
               y: otu_sample_val,
               text: otu_labels,
               hoverinfo: "x+y+text",
               mode: "markers",
               marker: {
                    size: otu_sample_val,
                    color: otu_ids
               }
          };

          var plotData = [trace1]

          var layout = {
          title: "Sample Volume vs OTU ID",
          showLegend: false
          }
          return Plotly.newPlot("bubble", plotData, layout)
     });
}

function gauge_chart(selected_id){
     d3.json("data/samples.json").then(function (data) {
          var meta_data=data.metadata[selected_id];
          var wfreq = meta_data.wfreq
         // Enter a speed between 0 and 180
         var level = wfreq;
 
         // Trig to calc meter point
         var degrees = 180 - level*20,
              radius = .5;
         var radians = degrees * Math.PI / 180;
         var x = radius * Math.cos(radians);
         var y = radius * Math.sin(radians);
 
         // Path: may have to change to create a better triangle
         var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
              pathX = String(x),
              space = ' ',
              pathY = String(y),
              pathEnd = ' Z';
         var path = mainPath.concat(pathX,space,pathY,pathEnd);
 
         var data = [{ type: 'scatter',
            x: [0], y:[0],
             marker: {size: 28, color:'DB5F59'},
             showlegend: false,
             name: 'Washing Frequency',
             text: level,
             hoverinfo: 'text+name'},
           { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
           rotation: 90,
           text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
           textinfo: 'text',
           textposition:'inside',
           marker: {colors: ['rgba(0, 112, 17, 1)', 'rgba(0, 143, 21, 1)', 'rgba(0, 179, 27, 1)',
           'rgba(0, 219, 33, 1)', 'rgba(5, 255, 43, 1)', 'rgba(66, 255, 95, 1)', 
           'rgba(97, 255, 121, 1)', 'rgba(122, 255, 142, 1)', 'rgba(173, 255, 186, 1)', 
           'rgba(255, 255, 255, 0)']},
           labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
           hoverinfo: 'label',
           hole: .5,
           type: 'pie',
           showlegend: false
         }];
 
         var layout = {
           shapes:[{
               type: 'path',
               path: path,
               fillcolor: 'DB5F59',
               line: {
                 color: 'DB5F59'
               }
             }],
           title: ' Belly Button Weekly Washing Frequency',
           xaxis: {zeroline:false, showticklabels:false,
                      showgrid: false, range: [-1, 1]},
           yaxis: {zeroline:false, showticklabels:false,
                      showgrid: false, range: [-1, 1]}
         };
 
 
         return Plotly.newPlot('gauge', data, layout);
     });
 }