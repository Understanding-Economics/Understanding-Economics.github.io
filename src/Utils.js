const Utils = {
    getUniqueDictVals: function(data, key, sorter) {
        let vals = data.map(x => x[key]);
        var uniqueVals = vals.filter((v, i, a) => a.indexOf(v) === i);
        return uniqueVals.filter(x => x.trim().length > 0).sort(sorter);
    }, 

    // For each group, gets the proportion of each response
    getProportions : function(data, groupKey, groupVal, responseKey) {
        let responseVals = getUniqueDictVals(data, responseKey, null);
        let filteredData = data.filter(x => x[groupKey] == groupVal);
        let countsDict = {}
        for(let val of responseVals) {
            countsDict[val] = 0;
        }
        
    }
}

export default Utils;