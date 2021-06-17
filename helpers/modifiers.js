import { locateIndex } from './finders';
import { noPriorRunVal } from './constants';
import { storeDataItem } from '../helpers/fb-paced';

// FIXME: How to handle empty arrays upon initialization? Currently using string placeholder of 'empty'
// This is problem, empty key persists within firebase; need to somehow delete it when adding first item

export const addGame = (title, imageUrl, currentData) => {
    const newGameEntry = {
        title: title,
        category: ['empty'],
        imageUrl: imageUrl
    }
    
    var dataCopy = [];
    if (currentData != null) {
        dataCopy = JSON.parse(JSON.stringify(currentData));
    }
    dataCopy.push(newGameEntry);
    storeDataItem(dataCopy);
};

export const removeGame = (title, currentData) => {
    var dataCopy = JSON.parse(JSON.stringify(currentData));
    dataCopy.splice(locateIndex(dataCopy, "title", title), 1);
    storeDataItem(dataCopy);
};

export const editGame = (originalTitle, newTitle, imageUrl, currentData) => {
    var dataCopy = JSON.parse(JSON.stringify(currentData));
    dataCopy[locateIndex(dataCopy, "title", originalTitle)].imageUrl = imageUrl;
    dataCopy[locateIndex(dataCopy, "title", originalTitle)].title = newTitle;
    storeDataItem(dataCopy);
};

export const addCategory = (run, currentData, currentGame) => {
    const newCategoryEntry = {
        run: run,
        splits: ['empty'],
    }
    var dataCopy = JSON.parse(JSON.stringify(currentData));

    if (dataCopy[locateIndex(dataCopy, 'title', currentGame)].category == 'empty') {
        dataCopy[locateIndex(dataCopy, 'title', currentGame)].category = [];
    }
    
    dataCopy[locateIndex(dataCopy, 'title', currentGame)].category.push(newCategoryEntry);
    storeDataItem(dataCopy);
};

export const addSplits = (splitName, currentData, currentGame, currentCategory, setOverallStateFunc, setSplitsFunc) => {
    const newSplitsEntry = {
        split: splitName,
        goldSeg: noPriorRunVal,
        pbSeg: noPriorRunVal,
        pbTotal: noPriorRunVal,
        runSeg: 0,
        runTotal: 0,
    }
    
    var dataCopy = JSON.parse(JSON.stringify(currentData));
    var categoryArray = dataCopy[locateIndex(dataCopy, 'title', currentGame)].category;

    if (categoryArray[locateIndex(categoryArray, 'run', currentCategory)].splits == 'empty') {
        categoryArray[locateIndex(categoryArray, 'run', currentCategory)].splits = [];
    }

    categoryArray[locateIndex(categoryArray, 'run', currentCategory)].splits.push(newSplitsEntry);
    setOverallStateFunc(dataCopy);
    setSplitsFunc(categoryArray[locateIndex(categoryArray, 'run', currentCategory)].splits);
    storeDataItem(dataCopy);
};

export const addSplitsFromJSON = (qrArrayJSON, currentData, currentGame, currentCategory, setOverallStateFunc, setSplitsFunc) => {
    var dataCopy = JSON.parse(JSON.stringify(currentData));
    var categoryArray = dataCopy[locateIndex(dataCopy, 'title', currentGame)].category;

    if (categoryArray[locateIndex(categoryArray, 'run', currentCategory)].splits == 'empty') {
        categoryArray[locateIndex(categoryArray, 'run', currentCategory)].splits = [];
    }

    categoryArray[locateIndex(categoryArray, 'run', currentCategory)].splits = qrArrayJSON;
    setOverallStateFunc(dataCopy);
    setSplitsFunc(categoryArray[locateIndex(categoryArray, 'run', currentCategory)].splits);
    storeDataItem(dataCopy);
}

export const converQrSplitsToJSON = (validQr) => {
    var newSplitsArr = [];
    var splitJSON = {
        split: '',
        goldSeg: 0,
        pbSeg: 0,
        pbTotal: 0,
        runSeg: 0,
        runTotal: 0,
    };

    var lines = validQr.split('\n');
    var line = "";
    for (var i = 0; i < lines.length; i++) {
        line = lines[i];
        fields = line.split(',');
        splitJSON.split = fields[0];
        splitJSON.goldSeg = fields[1];
        splitJSON.pbSeg = fields[2];
        splitJSON.pbTotal = fields[3];

        newSplitsArr.push(JSON.parse(JSON.stringify(splitJSON)));
    }
    return newSplitsArr;
}
