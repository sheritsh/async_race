import IQueryParam from './types';

export function generateQueryString(queryParams: IQueryParam[] = []) {
  return queryParams.length ? `?${queryParams.map((param) => `${param.key}=${param.value}`).join('&')}` : '';
}

export function getRandomName() : string {
  const brands = ['Toyota', 'Ford', 'Honda', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Audi', 'Nissan', 'Hyundai'];
  const randomBrandIndex = Math.floor(Math.random() * brands.length);
  const models = ['Phoenix', 'Thunderbolt', 'Stealth', 'Inferno', 'Silver', 'Midnight', 'Cosmic', 'Eclipse', 'Thunderstorm', 'Velocity'];
  const randomModelsIndex = Math.floor(Math.random() * models.length);
  const res = `${brands[randomBrandIndex]} ${models[randomModelsIndex]}`;
  return res;
}

export function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const color = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;

  return color;
}
