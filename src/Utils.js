const Utils = {
    getUniqueDictVals: function(data, key, sorter) {
        let vals = data.map(x => x[key]);
        var uniqueVals = groupVals.filter((v, i, a) => a.indexOf(v) === i);
        return uniqueVals.filter(x => x.trim().length > 0).sort(sorter);
    }
}

export default Utils;