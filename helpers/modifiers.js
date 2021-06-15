import { locateIndex } from './finders';
import { storeDataItem } from '../helpers/fb-paced';

// FIXME: How to handle empty arrays upon initialization? Currently using string placeholder of 'empty'
// This is problem, empty key persists within firebase; need to somehow delete it when adding first item

export const addGame = (title, imageUrl, currentData) => {
    const newGameEntry = {
        title: title,
        category: ['empty'],
        imageUrl: imageUrl
    }
    var dataCopy = JSON.parse(JSON.stringify(currentData));
    dataCopy.push(newGameEntry);
    storeDataItem(dataCopy);
};

export const removeGame = (title, currentData) => {
};

export const editGame = (title, currentData) => {
};

export const addCategory = (run, currentData, currentGame) => {
    const newCategoryEntry = {
        run: run,
        splits: ['empty'],
    }
    var dataCopy = JSON.parse(JSON.stringify(currentData));
    dataCopy[locateIndex(dataCopy, 'title', currentGame)].category.push(newCategoryEntry);
    storeDataItem(dataCopy);
};

export const addSplits = () => {
};