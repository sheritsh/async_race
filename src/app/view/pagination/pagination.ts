import HTMLElementFactory from '../../utils/html-element-factory';
import './pagination.css';

export default class Pagination {
  private PaginationElement: HTMLElement | null;

  public currentPage: number = 1;

  public totalPages: number;

  public totalItems : number;

  static onPageChangeCallback: (currentPage: number) => void = () => {};

  constructor(itemsAmount: number, itemsPerPage: number) {
    this.totalItems = itemsAmount;
    this.totalPages = Math.ceil(this.totalItems / itemsPerPage);
    this.PaginationElement = HTMLElementFactory.create('div', ['pagination']);
    this.composePagination();
  }

  render() {
    this.PaginationElement = HTMLElementFactory.create('div', ['pagination']);
    this.composePagination();
  }

  rerender() {
    const paginationElement = document.querySelector('.pagination');
    if (paginationElement) {
      paginationElement.innerHTML = '';
      this.render();
      paginationElement.append(this.getPagination() as HTMLElement);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      Pagination.onPageChangeCallback(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      Pagination.onPageChangeCallback(this.currentPage);
    }
  }

  setOnPageChangeCallback(callback: (currentPage: number) => void) {
    Pagination.onPageChangeCallback = callback.bind(this);
  }

  composePagination() {
    const prevBtn = HTMLElementFactory.create('button', ['pagination__prev'], 'Prev') as HTMLButtonElement;
    prevBtn.addEventListener('click', () => {
      this.prevPage();
      this.rerender();
    });
    const nxtBtn = HTMLElementFactory.create('button', ['pagination__next'], 'Next') as HTMLButtonElement;
    nxtBtn.addEventListener('click', () => {
      this.nextPage();
      this.rerender();
    });
    const currentPosition = HTMLElementFactory.create('div', ['pagination__current'], `${this.currentPage}`);
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
