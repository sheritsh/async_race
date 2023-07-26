import './winners.css';
import HTMLElementFactory from '../../utils/html-element-factory';
import Api from '../../api/api';
import getCarImage from '../../utils/get-car';
import PaginationWinners from '../pagination/pagination-winners';
import IQueryParam from '../../utils/types';

export default class Winners {
  private WinnersElement : HTMLElement;

  Api : Api;

  Pagination : PaginationWinners | null;

  private currentPage : number = 1;

  constructor() {
    this.WinnersElement = HTMLElementFactory.create('div', ['winners']);
    this.Api = new Api();
    this.Pagination = null;
    this.composeWinners();
  }

  render() {
    this.WinnersElement.innerHTML = '';
    this.composeWinners();
  }

  async composeWinners() {
    const winnersContainer = HTMLElementFactory.create('div', ['winners__container']);
    const winnersTable = HTMLElementFactory.create('table', ['winners__table']);
    const queryParams: IQueryParam[] = [{ key: '_page', value: this.currentPage.toString() }, { key: '_limit', value: '10' }];
    const winnersData = await this.Api.getWinners(queryParams);
    this.WinnersElement.innerHTML = `WINNERS(${winnersData.winnersAmount})`;
    winnersTable.innerHTML = `<table>
    <tr>
      <th>№</th>
      <th>Car</th>
      <th>Model</th>
      <th>Wins</th>
      <th>Best time (sec)</th>
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

    const winnersArrayLength = winnersData.winnersAmount;

    if (this.Pagination === null) {
      this.Pagination = new PaginationWinners(winnersArrayLength, 10);
      this.Pagination.setOnPageChangeCallback((currentPage) => {
        this.currentPage = currentPage;
        this.render();
      });
    }

    this.WinnersElement.append(winnersContainer, this.Pagination.getPagination() as HTMLElement);
  }

  getWinners() {
    return this.WinnersElement;
  }
}
