import HTMLElementFactory from '../../utils/html-element-factory';
import './pagination.css';

export default class PaginationWinners {
  private PaginationElement: HTMLElement | null;

  public currentPage: number = 1;

  public totalPages: number;

  public totalItems : number;

  static onPageChangeCallback: (currentPage: number) => void = () => {};

  constructor(itemsAmount: number, itemsPerPage: number) {
    this.totalItems = itemsAmount;
    this.totalPages = Math.ceil(this.totalItems / itemsPerPage);
    this.PaginationElement = HTMLElementFactory.create('div', ['pagination-winners']);
    this.composePagination();
  }

  render() {
    console.log('render');
    this.PaginationElement = HTMLElementFactory.create('div', ['pagination-winners']);
    this.composePagination();
  }

  rerender() {
    console.log('rerender');
    const paginationElement = document.querySelector('.pagination-winners');
    if (paginationElement) {
      paginationElement.innerHTML = '';
      this.render();
      paginationElement.append(this.getPagination() as HTMLElement);
    } else {
      this.render();
    }
  }

  nextPage() {
    console.log('i am in next method');
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      PaginationWinners.onPageChangeCallback(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      PaginationWinners.onPageChangeCallback(this.currentPage);
    }
  }

  setOnPageChangeCallback(callback: (currentPage: number) => void) {
    PaginationWinners.onPageChangeCallback = callback.bind(this);
  }

  composePagination() {
    const prevBtn = HTMLElementFactory.create('button', ['pagination-winners__prev'], 'Prev') as HTMLButtonElement;
    prevBtn.addEventListener('click', () => {
      this.prevPage();
      this.rerender();
    });
    const nxtBtn = HTMLElementFactory.create('button', ['pagination-winners__next'], 'Next') as HTMLButtonElement;
    nxtBtn.addEventListener('click', () => {
      console.log('ya ebu next');
      this.nextPage();
      this.rerender();
    });
    const currentPosition = HTMLElementFactory.create('div', ['pagination-winners__current'], `${this.currentPage}`);
    if (this.currentPage === 1) {
      prevBtn.disabled = true;
    } else if (this.currentPage === this.totalPages) {
      nxtBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
      nxtBtn.disabled = false;
    }
    this.PaginationElement?.append(prevBtn, currentPosition, nxtBtn);
  }

  getPagination() {
    return this.PaginationElement;
  }
}
