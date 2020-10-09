console.log("This is app.js");

function DrawBubblechart(sampleId) {
    console.log(`DrawBarGraph(${sampleId})`);
}

function InitDashboard()
{
    console.log(`Calling InitDashboard()`);

    var selector = d3.select("#selDataset");

    //load the data
    d3.json("samples.json").then((data) => {
        console.log(data);

        //Get the names
        var sampleNames = data.names;

        //populate the selector with all the sample Ids
        sampleNames.forEach((sampleId) => {
        selector.append("option")
            .text(sampleId)
            .property("value", sampleID);

        });

        var sampleId = sampleNames[0];
        console.log("Starting Sample: ", sampleId);

        DrawBargraph(sampleId);
    });
}

InitDashboard();






// function optionChanged(newSampleId) {
//     console.log(`User selected ${newSampleId}`);
// }



