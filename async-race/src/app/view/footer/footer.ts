import HTMLElementFactory from '../../utils/html-element-factory';
import './footer.css';

export default class Footer {
  private Footer: HTMLElement;

  constructor() {
    this.Footer = HTMLElementFactory.create('div', ['footer']);
    this.composeFooter();
  }

  composeFooter() {
    const author = HTMLElementFactory.create('div', ['footer__author'], 'created by <a href="https://github.com/sheritsh">// sheritsh</a> © 2023');
    const school = HTMLElementFactory.create('div', ['footer_rolling-scopes'], '<a href="https://rs.school/js/">Rolling Scopes School</a>');
    this.Footer.append(author, school);
  }

  getFooter() {
    return this.Footer;
  }
}
