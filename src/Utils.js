/* eslint no-undef: "off"*/
import Colors from './Colors'
const Utils = {
    getUniqueDictVals: function(data, key, sorter) {
        let vals = data.map(x => x[key]);
        var uniqueVals = vals.filter((v, i, a) => a.indexOf(v) === i);
        return uniqueVals.filter(x => x && x.trim().length > 0).sort(sorter);
    },

    // For each group, gets the proportion of each response
    /**
     *
     * @param {array} data array of dictionaries representing the data
     * @param {string} groupKey the group that we want proportions for
     * @param {string} groupVal the specific group value that we want proportions for
     * @param {string} responseKey the dictionary key of the response variable that we want proportions for
     */
     /* getProportions : function(data, groupKey, groupVal, responseKey){
       var final_result = [];
       var unique_rkeys = [];

       for (var i = 0; i < data.length; i++) {
           var rKey = data[i].responseKey;
           if (unique_rkeys.includes(rKey)){
               continue;
           } else {
               unique_rkeys.push(rKey);
           }
       }

       var total_responses = data.length

       for (i = 0; i < unique_rkeys.length; i++) {
         var response_key = unique_rkeys[i]
         final_result.push({
            response_key: 0
         })
         for (var j = 0; j < data.length; j++) {
             var gKey = data[j].groupKey;
             var gVal = data[j].groupVal;
             var rKey = data[j].responseKey;

             if (rKey = response_key){
                 final_result.response_key = final_result.response_key + 1;
             } else {
                 continue;
             }
          }

          final_result.response_key = final_result.response_key / total_responses;

        }

         return final_result;

     },*/

    getCounts : function(data, responseKey) {
        let responseVals = this.getUniqueDictVals(data, responseKey, undefined);
        let filteredData = data.filter(x => x[responseKey] != undefined);
        let countsDict = {}
        for(let val of responseVals) {
            countsDict[val] = 0;
        }
        filteredData.forEach(x => countsDict[x[responseKey]]++);
        let propsDict = {};
        for(let val of responseVals){ 
            propsDict[val] = countsDict[val]; 
        }
        return propsDict;
    }, 
    getProportions : function(data, groupKey, groupVal, responseKey) {
         let responseVals = this.getUniqueDictVals(data, responseKey, undefined);
         let filteredData = data.filter(x => (x[groupKey] == groupVal || groupVal == "All") && x[responseKey] != undefined);
         let countsDict = {}
         for(let val of responseVals) {
             countsDict[val] = 0;
         }

         let total = filteredData.length;
         filteredData.forEach(x => countsDict[x[responseKey]]++);
         let propsDict = {};
         for(let val of responseVals){ 
             propsDict[val] = countsDict[val] / total;
         }
         return propsDict;
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
