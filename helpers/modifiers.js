import { locateIndex } from './finders';
import { noPriorRunVal } from './constants';
import { storeDataItem } from '../helpers/fb-paced';

export const addGame = (userId, title, imageUrl, currentData) => {
    const newGameEntry = {
        title: title,
        category: ['empty'],
        imageUrl: imageUrl
    }
    
    var dataCopy = [];
    if (currentData != 'empty') {
        dataCopy = JSON.parse(JSON.stringify(currentData));
    }
    dataCopy.push(newGameEntry);
    storeDataItem(userId, dataCopy);
};

export const removeGame = (userId, title, currentData) => {
    var dataCopy = JSON.parse(JSON.stringify(currentData));
    dataCopy.splice(locateIndex(dataCopy, "title", title), 1);

    if (dataCopy.length == 0) {
        dataCopy.push('empty');
    }

    storeDataItem(userId, dataCopy);
};

export const editGame = (userId, originalTitle, newTitle, imageUrl, currentData) => {
    var dataCopy = JSON.parse(JSON.stringify(currentData));
    dataCopy[locateIndex(dataCopy, "title", originalTitle)].imageUrl = imageUrl;
    dataCopy[locateIndex(dataCopy, "title", originalTitle)].title = newTitle;
    storeDataItem(userId, dataCopy);
};

export const addCategory = (userId, run, currentGame, currentData) => {
    const newCategoryEntry = {
        run: run,
        splits: ['empty'],
    }
    var dataCopy = JSON.parse(JSON.stringify(currentData));

    if (dataCopy[locateIndex(dataCopy, 'title', currentGame)].category == 'empty') {
        dataCopy[locateIndex(dataCopy, 'title', currentGame)].category = [];
    }
    
    dataCopy[locateIndex(dataCopy, 'title', currentGame)].category.push(newCategoryEntry);
    storeDataItem(userId, dataCopy);
};

export const removeCategory = (userId, categoryToUpdate, currentGame, currentData) => {
    var dataCopy = JSON.parse(JSON.stringify(currentData));
    var categoryArray = dataCopy[locateIndex(dataCopy, 'title', currentGame)].category;
    categoryArray.splice(locateIndex(categoryArray, "run", categoryToUpdate.run), 1);

    if (categoryArray.length == 0) {
        categoryArray.push('empty');
    }

    storeDataItem(userId, dataCopy);
};

export const editCategory = (userId, newRun, categoryToUpdate, currentGame, currentData) => {
    var dataCopy = JSON.parse(JSON.stringify(currentData));
    var categoryArray = dataCopy[locateIndex(dataCopy, 'title', currentGame)].category;
    categoryArray[locateIndex(categoryArray, "run", categoryToUpdate.run)].run = newRun;
    storeDataItem(userId, dataCopy);
};

export const addSplits = (userId, splitName, currentData, currentGame, currentCategory, setOverallStateFunc, setSplitsFunc) => {
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
    storeDataItem(userId, dataCopy);
};

export const addSplitsFromJSON = (userId, qrArrayJSON, currentData, currentGame, currentCategory, setOverallStateFunc, setSplitsFunc) => {
    var dataCopy = JSON.parse(JSON.stringify(currentData));
    var categoryArray = dataCopy[locateIndex(dataCopy, 'title', currentGame)].category;

    if (categoryArray[locateIndex(categoryArray, 'run', currentCategory)].splits == 'empty') {
        categoryArray[locateIndex(categoryArray, 'run', currentCategory)].splits = [];
    }

    categoryArray[locateIndex(categoryArray, 'run', currentCategory)].splits = qrArrayJSON;
    setOverallStateFunc(dataCopy);
    setSplitsFunc(categoryArray[locateIndex(categoryArray, 'run', currentCategory)].splits);
    storeDataItem(userId, dataCopy);
}

export const convertQrSplitsToJSON = (validQr) => {
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
