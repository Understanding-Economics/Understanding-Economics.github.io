const Utils = {
    getUniqueGroupVals: function(data, group, sorter) {
        let groupVals = data.map(x => x[group.id]);
        var uniqueGroupVals = groupVals.filter((v, i, a) => a.indexOf(v) === i);
        return uniqueGroupVals.filter(x => x.trim().length > 0).sort(sorter);
    }
}

export default Utils;