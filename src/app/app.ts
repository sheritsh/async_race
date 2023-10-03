import HTMLElementFactory from './utils/html-element-factory';
import Footer from './view/footer/footer';
import Garage from './view/garage/garage';
import Header from './view/header/header';
import Winners from './view/winners/winners';

export default class App {
  static composePage() {
    const header = new Header();
    const garage = new Garage();
    const winners = new Winners();
    const footer = new Footer();
    const main = HTMLElementFactory.create('main', ['main']);
    const garageElement = garage.getGarage();
    const winnersElement = winners.getWinners();
    winnersElement.style.display = 'none';
    setTimeout(() => {
      main.append(garageElement, winnersElement);
    }, 50);
    document.body.append(header.getHeader(), main, footer.getFooter());
    header.setOnGarageClickCallback(() => {
      const garageClass = document.querySelector('.garage') as HTMLElement;
      const winnersClass = document.querySelector('.winners') as HTMLElement;
      garageClass.style.display = 'block';
      winnersClass.style.display = 'none';
    });
    header.setOnWinnersClickCallback(() => {
      winners.render();
      const garageClass = document.querySelector('.garage') as HTMLElement;
      const winnersClass = document.querySelector('.winners') as HTMLElement;
      garageClass.style.display = 'none';
      winnersClass.style.display = 'block';
    });
  }
}
