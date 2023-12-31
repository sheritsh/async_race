import './garage.css';
import HTMLElementFactory from '../../utils/html-element-factory';
import Api from '../../api/api';
import { ICar, IGettedCar, ServerResponces } from '../../api/types';
import getCarImage from '../../utils/get-car';
import { getRandomColor, getRandomName } from '../../utils/utils';
import Winners from '../winners/winners';
import Pagination from '../pagination/pagination';
import IQueryParam from '../../utils/types';

export default class Garage {
  private GarageElement : HTMLElement;

  private currentPage : number = 1;

  Api : Api;

  Pagination : Pagination | null;

  private raceIdWinner: number | null = null;

  private raceTimeWinner: number | null = null;

  private raceNameWinner: string | null = null;

  private raceVelocityWinner: number | null = null;

  constructor() {
    this.GarageElement = HTMLElementFactory.create('div', ['garage']);
    this.Api = new Api();
    this.Pagination = null;
    this.composeGarage();
  }

  render() {
    setTimeout(() => {
      this.GarageElement.innerHTML = '';
      this.composeGarage();
    }, 500);
  }

  async composeGarage() {
    const garage = HTMLElementFactory.create('div', ['garage']);
    const garageController = HTMLElementFactory.create('div', ['garage-controller']);
    garageController.append(
      this.composeCreateOption(),
      Garage.composeUpdateOption(),
      this.composeRaceOption(),
    );
    const queryParams: IQueryParam[] = [{ key: '_page', value: this.currentPage.toString() }, { key: '_limit', value: '7' }];
    const carsData = await this.Api.getCars(queryParams);
    const garageTitle = await HTMLElementFactory.create('div', ['garage__title'], `GARAGE (${carsData.carsAmount})`);
    const garageCars = HTMLElementFactory.create('div', ['garage__cars']);
    garageCars.append(this.composeGarageCars(carsData));
    garage.append(garageController, garageTitle, garageCars);
    if (this.Pagination === null) {
      this.Pagination = new Pagination(carsData.carsAmount, 7);
      this.Pagination.setOnPageChangeCallback((currentPage) => {
        this.currentPage = currentPage;
        this.render();
      });
    } else if (this.Pagination.totalPages !== Math.ceil(carsData.carsAmount / 7)) {
      if ((this.Pagination.totalPages > Math.ceil(carsData.carsAmount / 7))) {
        this.Pagination.prevPage();
      } else {
        this.Pagination.currentPage = this.currentPage;
      }
      this.Pagination.totalPages = Math.ceil(carsData.carsAmount / 7);
      this.Pagination.totalItems = carsData.carsAmount;
      this.Pagination.render();
    } else {
      this.Pagination.totalPages = Math.ceil(carsData.carsAmount / 7);
    }
    this.GarageElement.append(garage, this.Pagination.getPagination() as HTMLElement);
  }

  composeRaceOption() {
    const optionsDiv = HTMLElementFactory.create('div', ['options__div']);
    const resetBtn = HTMLElementFactory.create('button', ['reset-btn', 'options-btn'], 'RESET') as HTMLInputElement;
    resetBtn.disabled = true;
    const raceBtn = HTMLElementFactory.create('button', ['race-btn', 'options-btn'], 'RACE') as HTMLInputElement;
    raceBtn.addEventListener('click', () => {
      this.raceIdWinner = null;
      this.raceNameWinner = null;
      this.raceTimeWinner = null;
      this.raceVelocityWinner = null;
      // TO DO 1
      const garageController = document.querySelector('.garage-controller');
      const optionElements = garageController?.querySelectorAll('input, button');
      const startBtns = document.querySelectorAll('.start-btn');
      optionElements?.forEach((elem) => {
        const element = elem as HTMLInputElement;
        element.disabled = true;
      });
      startBtns.forEach((btn) => {
        const button = btn as HTMLButtonElement;
        button.click();
      });
      setTimeout(async () => {
        try {
          const winner = await this.Api.getWinner(this.raceIdWinner as number);
          if (winner.id !== undefined) {
            if (this.raceTimeWinner !== null) {
              const newTime = this.raceTimeWinner < winner.time ? this.raceTimeWinner : winner.time;
              const newWinAmount = winner.wins + 1;
              const newData = {
                id: winner.id,
                wins: newWinAmount,
                time: newTime as number,
              };
              await this.Api.updateWinner(winner.id, newData);
            }
          } else {
            throw new Error(`Error: ${ServerResponces.NOT_FOUND}`);
          }
        } catch {
          if (this.raceTimeWinner === null) {
            this.raceTimeWinner = 12;
          }
          await this.Api.createWinner(
            { id: this.raceIdWinner as number, time: this.raceTimeWinner as number, wins: 1 },
          );
        }
        if (
          this.raceIdWinner !== null && this.raceNameWinner !== null && this.raceTimeWinner !== null
        ) {
          const winnerLayout = HTMLElementFactory.create('div', ['winner-layout']);
          const cupImg = HTMLElementFactory.create('div', ['winner-layout__cup']);
          const winnerTitle = HTMLElementFactory.create('div', ['winner-layout__winner'], `${this.raceNameWinner} won in ${this.raceTimeWinner} sec`);
          winnerLayout.append(cupImg, winnerTitle);
          document.body.append(winnerLayout);
          setTimeout(() => {
            const layout = document.querySelector('.winner-layout');
            layout?.remove();
          }, 3000);
        }
        resetBtn.disabled = false;
      }, 6000);
    });
    resetBtn.addEventListener('click', () => {
      const stopBtns = document.querySelectorAll('.stop-btn');
      stopBtns.forEach((btn) => {
        resetBtn.disabled = true;
        raceBtn.disabled = false;
        const button = btn as HTMLButtonElement;
        button.click();
      });
    });
    const generateCars = HTMLElementFactory.create('button', ['generate-btn', 'options-btn'], 'GENERATE CARS') as HTMLInputElement;
    generateCars.addEventListener('click', () => {
      for (let i = 0; i < 100; i += 1) {
        const name = getRandomName();
        const color = getRandomColor();
        this.Api.createCar({ name, color });
      }
      this.render();
    });
    optionsDiv.append(raceBtn, resetBtn, generateCars);
    return optionsDiv;
  }

  composeCreateOption() {
    const createOption = HTMLElementFactory.create('div', ['garage-controller__option', 'create']);
    const createDiv = HTMLElementFactory.create('div', ['create__div', 'input_div']);
    const inputCarName = HTMLElementFactory.create('input', ['create__div-name', 'div__name']) as HTMLInputElement;
    const inputCarColor = HTMLElementFactory.create('input', ['create__div-color', 'div__color']) as HTMLInputElement;
    inputCarColor.value = '#e0218A';
    inputCarColor.setAttribute('type', 'color');
    createDiv.append(inputCarName, inputCarColor);
    const createBtn = HTMLElementFactory.create('button', ['garage-controller__option-btn', 'create-btn'], 'Create');
    createBtn.addEventListener('click', async () => {
      const carName = inputCarName.value ? inputCarName.value : getRandomName();
      await this.Api.createCar(
        { name: carName, color: inputCarColor.value },
      );
      this.render();
    });
    createOption.append(createDiv, createBtn);
    return createOption;
  }

  static composeUpdateOption() {
    const updateOption = HTMLElementFactory.create('div', ['garage-controller__option', 'update']);
    const updateDiv = HTMLElementFactory.create('div', ['update__div', 'input_div']);
    const inputCarName = HTMLElementFactory.create('input', ['update__div-name', 'div__name']) as HTMLInputElement;
    inputCarName.disabled = true;
    const inputCarColor = HTMLElementFactory.create('input', ['update__div-color', 'div__color']);
    inputCarColor.setAttribute('type', 'color');
    updateDiv.append(inputCarName, inputCarColor);
    const updateBtn = HTMLElementFactory.create('button', ['garage-controller__option-btn', 'update-btn'], 'Update') as HTMLInputElement;
    updateBtn.disabled = true;
    updateOption.append(updateDiv, updateBtn);
    return updateOption;
  }

  composeGarageCars(carsData : {
    cars: IGettedCar[];
    carsAmount: number;
  }) {
    const garageCars = HTMLElementFactory.create('div', ['garage__cars']);
    carsData.cars.forEach((car) => {
      const carContainer = HTMLElementFactory.create('div', ['garage__car']);
      const carContainerTitle = HTMLElementFactory.create('div', ['car__title']);
      const selectBtn = HTMLElementFactory.create('button', ['select-btn'], 'Select');
      selectBtn.addEventListener('click', () => {
        const updateBtn = document.querySelector('.update-btn') as HTMLInputElement;
        updateBtn.disabled = false;
        const selectedCarName = document.querySelector('.update__div-name') as HTMLInputElement;
        const selectedCarColor = document.querySelector('.update__div-color') as HTMLInputElement;
        selectedCarName.disabled = false;
        selectedCarName.value = car.name;
        selectedCarColor.value = car.color;
        updateBtn.addEventListener('click', () => {
          const carData : ICar = {
            name: selectedCarName.value,
            color: selectedCarColor.value,
          };
          this.Api.updateCar(car.id, carData);
          this.render();
        });
      });
      const removeBtn = HTMLElementFactory.create('button', ['remove-btn'], 'Remove');
      removeBtn.addEventListener('click', () => {
        this.Api.deleteCar(car.id);
        this.Api.deleteWinner(car.id);
        this.render();
        const winnersRerender = new Winners();
        winnersRerender.render();
      });
      const nameCar = HTMLElementFactory.create('div', ['remove-btn'], `${car.name}`);
      const carContainerBody = HTMLElementFactory.create('div', ['car__body']);
      const carRemoteOptions = HTMLElementFactory.create('div', ['car__remote']);
      const startBtn = HTMLElementFactory.create('button', ['start-btn'], 'Start') as HTMLButtonElement;
      const stopBtn = HTMLElementFactory.create('button', ['stop-btn'], 'Stop') as HTMLButtonElement;
      stopBtn.disabled = true;
      carRemoteOptions.append(startBtn, stopBtn);
      const carImage = HTMLElementFactory.create('div', ['car'], `${getCarImage(car.color)}`);
      let isBurnOut: boolean = false;
      startBtn.addEventListener('click', async () => {
        isBurnOut = false;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        const engineInfo = await this.Api.startEngine(car.id);

        const carTime: number = Number(
          (engineInfo.distance / engineInfo.velocity / 1000).toFixed(3),
        );

        const windowWidth: number = window.innerWidth;
        const distanceToPass: number = windowWidth * 0.81 - 150;

        const fpsAnimation = 240;
        const durationAnimation = carTime * 1000;
        const frame = distanceToPass / fpsAnimation;
        let currentPosition: number = 0;

        function moveCar() {
          if (isBurnOut) {
            return;
          }
          currentPosition += frame;
          carImage.style.translate = `${currentPosition}px`;
          if (currentPosition < distanceToPass) {
            setTimeout(moveCar, durationAnimation / fpsAnimation);
          }
        }
        moveCar();
        try {
          await this.Api.switchEngineToDrive(car.id);
          if (this.raceVelocityWinner === null || engineInfo.velocity > this.raceVelocityWinner) {
            this.raceIdWinner = car.id;
            this.raceNameWinner = car.name;
            this.raceTimeWinner = carTime;
            this.raceVelocityWinner = engineInfo.velocity;
          }
        } catch (error) {
          isBurnOut = true;
        }
      });
      stopBtn.addEventListener('click', async () => {
        stopBtn.disabled = true;
        startBtn.disabled = false;
        isBurnOut = true;
        await this.Api.stopEngine(car.id);
        carImage.style.translate = '0';
      });
      const finishImage = HTMLElementFactory.create('div', ['finish']);
      carContainerBody.append(carRemoteOptions, carImage, finishImage);
      carContainerTitle.append(selectBtn, removeBtn, nameCar);
      carContainer.append(carContainerTitle, carContainerBody);
      garageCars.append(carContainer);
    });
    return garageCars;
  }

  getGarage() {
    return this.GarageElement;
  }
}
