import { storeDataItem } from '../helpers/fb-paced';

export const addGame = (title, imageUrl, currentData) => {
    const newGameEntry = {
        title: title,
        category: [],
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