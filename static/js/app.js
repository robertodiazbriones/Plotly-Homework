
var dropdownmenu = d3.select('#selDataset');

d3.json("data/samples.json").then(function (data) {

    var data_names = data.names;
    
    data_names.forEach(function (name) {
      dropdownmenu
          .append("option")
          .text(name)
          .property("value", name);
    });

    //let selectedID = "940";

    //datapull(selectedID);
  });



// // Create Dynamic changes on Dropdowm button
// function optionChanged(value){

//      MetaDataSample(value);
//      PieChart(value);
//      BubbleChart(value);
//      GaugeChart(value);
 
//  }