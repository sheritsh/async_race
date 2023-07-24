import Api from './app/api/api';

console.log('Hello World!');

const apiController = new Api();

const getCars = await apiController.getWinners();

console.log(getCars.winners);

// eslint-disable-next-line no-alert
alert('Здравствуй!\nЕсли ты вдруг проснулся с утра по раньше\nи решил проверить мою работу, то пожалуйста,\nподожди до обеда я все зарефакторю и обновлю gh-pages\nОГРОМНОЕ СПАСИБО ЗА ПОНИМАНИЕ\n25.07.2023');
