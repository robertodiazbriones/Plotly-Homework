
var dropdownmenu = d3.select('#selDataset');

d3.json("data/samples.json").then(function (data) {

    var data_names = data.names;
    
    data_names.forEach(function (id) {
      dropdownmenu
          .append("option")
          .text(id)
          .property("value", id);
    });
//     let index = data_names.indexOf(data_names[0])
//     console.log(data_names[0]);
//     console.log(index)

    // define default ID
    demo_info("0")
    bubble_chart("0")
     // console.log(data.metadata[selected_id]);
  });

  function optionChanged(value){
     d3.json("data/samples.json").then(function (data) {
          var data_names = data.names;
          var index = data_names.indexOf(value);
          demo_info(index);
          // PieChart(value);
          bubble_chart(index);
          // GaugeChart(value);
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

function bubble_chart(selected_id){
     d3.json("data/samples.json").then(function (data) {
          var otu_data=data.samples[selected_id];
          var otu_sample_val=otu_data.sample_values
          var otu_ids=otu_data.otu_ids
          var otu_labels=otu_data.otu_labels
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

   

