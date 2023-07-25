import HTMLElementFactory from '../../utils/html-element-factory';
import './header.css';

export default class Header {
  private onGarageClickCallback: () => void;

  private onWinnersClickCallback: () => void;

  constructor() {
    this.onGarageClickCallback = () => {};
    this.onWinnersClickCallback = () => {};
  }

  composeHeader() {
    const header = HTMLElementFactory.create('div', ['header']);
    const navMenu = HTMLElementFactory.create('nav', ['header__nav']);
    const ulMenu = HTMLElementFactory.create('ul', ['nav__menu']);
    const toGarage = HTMLElementFactory.create('li', ['menu__item'], 'Garage');
    toGarage.addEventListener('click', () => {
      this.onGarageClickCallback();
    });
    const toWinners = HTMLElementFactory.create('li', ['menu__item'], 'Winners');
    toWinners.addEventListener('click', () => {
      this.onWinnersClickCallback();
    });
    ulMenu.append(toGarage, toWinners);
    navMenu.append(ulMenu);
    const title = HTMLElementFactory.create('h1', ['header__title'], 'Async Race');
    header.append(navMenu, title);
    return header;
  }

  setOnGarageClickCallback(callback: () => void) {
    this.onGarageClickCallback = callback;
  }

  setOnWinnersClickCallback(callback: () => void) {
    this.onWinnersClickCallback = callback;
  }

  getHeader() {
    return this.composeHeader();
  }
}
