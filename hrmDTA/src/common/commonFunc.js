export function groupArrayByKey(arr, key) {
    return arr.reduce(function (newArr, item) {
        newArr[item[key]] = newArr[item[key]] || [];
        newArr[item[key]].push(item);
        return newArr;
    }, {});
}