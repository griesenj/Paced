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

// https://stackoverflow.com/questions/16946632/search-json-array-for-a-string-and-retrieve-object-that-contains-it-as-a-value

// export function find(arr, key, val) { // Find array element which has a key value of val 
//     for (var ai, i = arr.length; i--;)
//       if ((ai = arr[i]) && ai[key] == val)
//         return ai;
//     return null;
//   }