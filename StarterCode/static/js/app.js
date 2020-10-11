console.log("This is app.js");

function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);
}

function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);
}

function ShowMetadata(sampleId) {
    console.log(`ShowMetadata(${sampleId})`);
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

