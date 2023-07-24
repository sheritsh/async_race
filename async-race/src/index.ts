import Api from './app/api/api';

console.log('Hello World!');

const apiController = new Api();

const getCars = await apiController.getWinners();

console.log(getCars.winners);
