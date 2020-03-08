/* eslint no-undef: "off"*/
import Colors from './Colors'
const Utils = {
    getUniqueDictVals: function(data, key, sorter) {
        let vals = data.map(x => x[key]);
        var uniqueVals = vals.filter((v, i, a) => a.indexOf(v) === i);
        return uniqueVals.filter(x => x.trim().length > 0).sort(sorter);
    }, 

    // For each group, gets the proportion of each response
    /**
     * 
     * @param {array} data array of dictionaries representing the data
     * @param {string} groupKey the group that we want proportions for
     * @param {string} groupVal the specific group value that we want proportions for
     * @param {string} responseKey the dictionary key of the response variable that we want proportions for
     */ 
    getProportions : function(data, groupKey, groupVal, responseKey) {
        let responseVals = this.getUniqueDictVals(data, responseKey, null);
        let filteredData = data.filter(x => x[groupKey] == groupVal);
        let countsDict = {}
        for(let val of responseVals) {
            countsDict[val] = 0;
        }
        
    },

    getQuestionSorter: function(question) {
        if(question.sorter) {
            return $.pivotUtilities.sortAs(question.sorter);
        }
        else {
            return (a, b) => a.localeCompare(b);
        }
    },

    getGroupSorter: function(group) {
        if(group.sorter) {
            return (a, b) => {
                if (a == "All") return -1;
                if (b == "All") return 1;
                else return $.pivotUtilities.sortAs(group.sorter)(a, b);
            }
        }
        else {
            return (a, b) => { 
                if (a == "All") return -1;
                if (b == "All") return 1;
                else return a.localeCompare(b)
            }
        }
    }, 

    getColorPattern: function(question) {
        let colorPattern = question.color && typeof(question.color == "string") 
        && question.color in Colors ? Colors[question.color] : question.color;
        if(colorPattern) return colorPattern
        else return Colors.Categorical
    }
}

export default Utils;