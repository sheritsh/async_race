import './winners.css';
import HTMLElementFactory from '../../utils/html-element-factory';
import Api from '../../api/api';
import getCarImage from '../../utils/get-car';

export default class Winners {
  private WinnersElement : HTMLElement;

  Api : Api;

  constructor() {
    this.WinnersElement = HTMLElementFactory.create('div', ['winners']);
    this.Api = new Api();
    this.composeWinners();
  }

  async composeWinners() {
    const winnersContainer = HTMLElementFactory.create('div', ['winners__container']);
    const winnersTable = HTMLElementFactory.create('table', ['winners__table']);
    const winnersData = await this.Api.getWinners();
    this.WinnersElement.innerHTML = `WINNERS(${winnersData.winners.length})`;
    winnersTable.innerHTML = `<table>
    <tr>
      <th>№</th>
      <th>Машина</th>
      <th>Имя</th>
      <th>Количество побед</th>
      <th>Лучшее время (сек)</th>
    </tr></table>`;
    winnersData.winners.forEach(async (winner) => {
      const carData = await this.Api.getCar(winner.id);
      winnersTable.innerHTML += `<tr>
      <td>${winner.id}</td>
      <td>${getCarImage(`${carData.color}`)}</td>
      <td>${carData.name}</td>
      <td>${winner.wins}</td>
      <td>${winner.time}</td>
    </tr>`;
    });
    winnersContainer.append(winnersTable);
    this.WinnersElement.append(winnersContainer);
  }

  getWinners() {
    return this.WinnersElement;
  }
}
