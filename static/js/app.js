// Note: Some code utilized from Instructor Dom's class room example
console.log("This is app.js");

//Create function to draw bar graph
function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);

    d3.json("static/data/samples.json").then((data) => {
        // get samples data
        var samples = data.samples;
        // filter on id
        var resultArray = samples.filter(s => s.id == sampleId);
        // only one match for each ID so get index 0:
        var result = resultArray[0];
        // get info for selected id
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

//create function to draw bubblechart
function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);

    d3.json("static/data/samples.json").then((data) => {
        
        // get samples for this id
        var samples = data.samples;
        // filter on requested id
        var resultArray = samples.filter(ot => ot.id == sampleId);
        // only one match for each ID so get index 0:
        var result = resultArray[0];

        // get info for selected id
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                color: otu_ids,
                colorscale: "Earth",
                size: sample_values
            },
            
        }

        var bubbleLayout = {
            margin: { t: 0},
            xaxis: {
                title: "<b>OTU ID</b>",
            },
            showlegend: false
           
        };

        Plotly.newPlot("bubble", [bubbleData], bubbleLayout);
    });
    

}

//create function to populate metadata table
function ShowMetadata(sampleId) {
    console.log(`ShowMetadata(${sampleId})`);

    d3.json("static/data/samples.json").then((data) => {
        
        var metadata = data.metadata;
        var resultArray = metadata.filter(md => md.id == sampleId);
        var result = resultArray[0];
        
        var panel = d3.select('#sample-metadata');
        panel.html("");

        Object.entries(result).forEach((key) => {   
            panel.append("h6").text(key[0].toLocaleLowerCase() + ": " + key[1] + " \n");
        });
    });
}

// create function to allow user to change sample id
function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);

    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    ShowMetadata(newSampleId);
}

// function to initialize dashboard and load data
function InitDashboard() {
    console.log(`Calling InitDashboard()`);

    var selector = d3.select("#selDataset");

    //load the data
    d3.json("static/data/samples.json").then((data) => {
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

