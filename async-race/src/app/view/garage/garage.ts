import './garage.css';
import HTMLElementFactory from '../../utils/html-element-factory';
import Api from '../../api/api';
import { IGettedCar } from '../../api/types';
import getCarImage from '../../utils/get-car';

export default class Garage {
  private GarageElement : HTMLElement;

  Api : Api;

  constructor() {
    this.GarageElement = HTMLElementFactory.create('div', ['garage']);
    this.Api = new Api();
    this.composeGarage();
  }

  async composeGarage() {
    const garage = HTMLElementFactory.create('div', ['garage']);
    const garageController = HTMLElementFactory.create('div', ['garage-controller']);
    garageController.append(Garage.composeCreateOption(), Garage.composeUpdateOption());
    const carsData = await this.Api.getCars();
    const garageTitle = await HTMLElementFactory.create('div', ['garage__title'], `GARAGE (${carsData.cars.length})`);
    const garageCars = HTMLElementFactory.create('div', ['garage__cars']);
    garageCars.append(Garage.composeGarageCars(carsData));
    garage.append(garageController, garageTitle, garageCars);
    this.GarageElement.append(garage);
  }

  static composeCreateOption() {
    const createOption = HTMLElementFactory.create('div', ['garage-controller__option', 'create']);
    const createDiv = HTMLElementFactory.create('div', ['create__div', 'input_div']);
    const inputCarName = HTMLElementFactory.create('input', ['create__div-name', 'div__name']);
    const inputCarColor = HTMLElementFactory.create('input', ['create__div-color', 'div__color']);
    inputCarColor.setAttribute('type', 'color');
    createDiv.append(inputCarName, inputCarColor);
    const createBtn = HTMLElementFactory.create('button', ['garage-controller__option-btn'], 'Create');
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
    const updateBtn = HTMLElementFactory.create('button', ['garage-controller__option-btn'], 'Update') as HTMLInputElement;
    updateBtn.disabled = true;
    updateOption.append(updateDiv, updateBtn);
    return updateOption;
  }

  static composeGarageCars(carsData : {
    cars: IGettedCar[];
    carsAmount: number;
  }) {
    const garageCars = HTMLElementFactory.create('div', ['garage__cars']);
    carsData.cars.forEach((car) => {
      const carContainer = HTMLElementFactory.create('div', ['garage__car']);
      const carContainerTitle = HTMLElementFactory.create('div', ['car__title']);
      const selectBtn = HTMLElementFactory.create('button', ['select-btn'], 'Select');
      const removeBtn = HTMLElementFactory.create('button', ['remove-btn'], 'Remove');
      const nameCar = HTMLElementFactory.create('div', ['remove-btn'], `${car.name}`);
      const carContainerBody = HTMLElementFactory.create('div', ['car__body']);
      const carRemoteOptions = HTMLElementFactory.create('div', ['car__remote']);
      const startBtn = HTMLElementFactory.create('button', ['start-btn'], 'Start');
      const stopBtn = HTMLElementFactory.create('button', ['stop-btn'], 'Stop');
      carRemoteOptions.append(startBtn, stopBtn);
      const carImage = HTMLElementFactory.create('div', ['car'], `${getCarImage(car.color)}`);
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
