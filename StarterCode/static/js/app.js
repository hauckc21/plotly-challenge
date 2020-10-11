console.log("This is app.js");

function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);

    d3.json("samples.json").then((data) => {
        
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();
        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }
        Plotly.newPlot("bar", [barData], barLayout);
    });

}

function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);
}

function ShowMetadata(sampleId) {
    console.log(`ShowMetadata(${sampleId})`);

    d3.json("samples.json").then((data) => {
        
        var metadata = data.metadata;
        var resultArray = metadata.filter(md => md.id == sampleId);
        var result = resultArray[0];
        
        var panel = d3.select('#sample-metadata');

        Object.defineProperties(result).forEach(([key, value]) => {

        });
    });
}

function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);

    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    ShowMetadata(newSampleId);
}

function InitDashboard() {
    console.log(`Calling InitDashboard()`);

    var selector = d3.select("#selDataset");

    //load the data
    d3.json("samples.json").then((data) => {
            console.log(data);


            // get the names
            var sampleNames = data.names;

            //populate the selector with sample IDs
            sampleNames.forEach((sampleId) => {
            selector.append("option")
            .text(sampleId)
            .property("value", sampleId);
            });
            
            //Get first sample Id
            var sampleId = sampleNames[0];
            console.log("Starting sample: ", sampleId);
            

            //Draw the graphs
            DrawBargraph(sampleId);
            DrawBubblechart(sampleId);
            ShowMetadata(sampleId);

    });
}

InitDashboard();

