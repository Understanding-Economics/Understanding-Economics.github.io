function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = decodeURI(value);
    });
    return vars;
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

var selectedFields = { 
    demographic : null,
    content: null
}

var demo_fields = {}
var fields = {}
var chosen_survey = null
var data = {}
function main(rawFields, surveyData, page) {
    let slctContent = document.getElementById("slctContent");
    let contentFieldDesc = document.getElementById("contentFieldDesc");
    for(let field of rawFields.demographics) {
        demo_fields[field.id] = field; 
    }
    for(let survey of rawFields.surveys){
        if(survey.id == page){
            chosen_survey = survey;
            document.getElementById(survey.id).style.display = "block";
        }
        else{
            document.getElementById(survey.id).remove();
        }
    }
    for(let field of chosen_survey.questions){
        fields[field.id] = field;
    }
    data = surveyData;
    for(let d of data) {
        for(let k in d) {
            if(!d[k] || d[k].length == 0){
                d[k] = " No Response";
            }
        }
    }

}

function updateViz() {
    if(selectedFields.demographic && selectedFields.content){
        updateCrosstabs();
        updateChart();
    }
}

function updateCrosstabs() {
    if(fields[selectedFields.content].numeric){
        $("#crosstab").pivot(data, 
            {
                rows : [selectedFields.demographic],
                aggregator: $.pivotUtilities.aggregators["Average"]([selectedFields.content])
            });
    }
    else {
        $("#crosstab").pivot(data, 
            {
                rows : [selectedFields.demographic],
                cols: [selectedFields.content],
                aggregator: $.pivotUtilities.aggregators["Count as Fraction of Rows"]()
            });
    }
}

function updateChart() {
    if(fields[selectedFields.content].numeric) {

    }
    else {
        console.log($.pivotUtilities.c3_renderers)
        $("#chart").pivot(data, {
            rows : [selectedFields.demographic],
            cols: [selectedFields.content],
            aggregator: $.pivotUtilities.aggregators["Count as Fraction of Rows"](),
            renderer: $.pivotUtilities.c3_renderers["Horizontal Stacked Bar Chart"],
            rowOrder: "value_z_to_a", colOrder: "value_z_to_a",
            rendererOptions: {
                c3: {
                    title : {
                        text: "Frequency percentage"
                    }
                }
            }
        });
        document.getElementById("chart").getElementsByTagName("p")[0].remove();
    }
}

function unique(vals) {
    return vals.filter((value, index, self) => self.indexOf(value) == index);
}

function onDemoSelect() {
    let slctDemo = document.getElementById("slctDemo");
    selectedFields.demographic = slctDemo.options[slctDemo.selectedIndex].value;
    let slctDemoDesc = document.getElementById("demoFieldDesc");
    slctDemoDesc.innerHTML = demo_fields[selectedFields.demographic].description;
    updateViz();
}

function onContentSelect() {
    let slctContent = document.getElementById("slctContent");
    selectedFields.content = slctContent.options[slctContent.selectedIndex].value;
    let slctContentDesc = document.getElementById("contentFieldDesc");
    slctContentDesc.innerHTML = fields[selectedFields.content].description;
    slctContentDesc.parentElement.style.height = `${slctContent.offsetHeight}px`;
    updateViz();
}

