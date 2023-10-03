import IQueryParam from '../utils/types';
import { generateQueryString } from '../utils/utils';
import {
  ICar,
  IEngineDrive,
  IEngineStatus,
  IGettedCar,
  IWinner,
}
  from './types';
import urlServer from './url';

export default class Api {
  private url : string = urlServer;

  private path = {
    garage: '/garage',
    winners: '/winners',
    engine: '/engine',
  };

  async getCars(queryParams: IQueryParam[] = []) {
    const responce = await fetch(`${this.url}${this.path.garage}${generateQueryString(queryParams)}`);
    const cars : IGettedCar[] = await responce.json();
    const carsAmount : number = Number(responce.headers.get('X-Total-Count'));
    return { cars, carsAmount };
  }

  async getCar(id: number) {
    const responce = await fetch(`${this.url}${this.path.garage}/${id}`);
    const car : IGettedCar = await responce.json();
    return car;
  }

  async createCar(carData: ICar) {
    const responce = await fetch(`${this.url}${this.path.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
    const car : IGettedCar = await responce.json();
    return car;
  }

  async deleteCar(id: number) {
    const responce = await fetch(`${this.url}${this.path.garage}/${id}`, {
      method: 'DELETE',
    });
    const car : object = await responce.json();
    return car;
  }

  async updateCar(id: number, carData: ICar) {
    const responce = await fetch(`${this.url}${this.path.garage}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });
    const car : IGettedCar = await responce.json();
    return car;
  }

  async startEngine(id: number) {
    const responce = await fetch(`${this.url}${this.path.engine}?id=${id}&status=started`, {
      method: 'PATCH',
    });
    const engineStatus : IEngineStatus = await responce.json();
    return engineStatus;
  }

  async stopEngine(id: number) {
    const responce = await fetch(`${this.url}${this.path.engine}?id=${id}&status=stopped`, {
      method: 'PATCH',
    });
    const engineStatus : IEngineStatus = await responce.json();
    return engineStatus;
  }

  async switchEngineToDrive(id: number) {
    const responce = await fetch(`${this.url}${this.path.engine}?id=${id}&status=drive`, {
      method: 'PATCH',
    });
    const engineStatus : IEngineDrive = await responce.json();
    return engineStatus;
  }

  async getWinners(queryParams: IQueryParam[] = []) {
    const responce = await fetch(`${this.url}${this.path.winners}${generateQueryString(queryParams)}`);
    const winners : IWinner[] = await responce.json();
    const winnersAmount : number = Number(responce.headers.get('X-Total-Count'));
    return { winners, winnersAmount };
  }

  async getWinner(id: number) {
    const responce = await fetch(`${this.url}${this.path.winners}/${id}`);
    const winner : IWinner = await responce.json();
    return winner;
  }

  async createWinner(winnerData: IWinner) {
    const responce = await fetch(`${this.url}${this.path.winners}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winnerData),
    });
    const winner : IWinner = await responce.json();
    return winner;
  }

  async deleteWinner(id: number) {
    const responce = await fetch(`${this.url}${this.path.winners}/${id}`, {
      method: 'DELETE',
    });
    const winner : object = await responce.json();
    return winner;
  }

  async updateWinner(id: number, winnerData: IWinner) {
    const responce = await fetch(`${this.url}${this.path.winners}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winnerData),
    });
    const winner : IWinner = await responce.json();
    return winner;
  }
}
