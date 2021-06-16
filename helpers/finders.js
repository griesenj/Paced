export const locateEntry = (arr, key, val) => {
    for (var index = 0; index < arr.length; index++) {
        var entry = arr[index];
        if (entry[key] == val) {
            return entry;
        }
    }
    return null;
}

export const locateIndex = (arr, key, val) => {
    for (var index = 0; index < arr.length; index++) {
        var entry = arr[index];
        if (entry[key] == val) {
            return index;
        }
    }
    return null;
}
