import IQueryParam from './types';

export default function generateQueryString(queryParams: IQueryParam[] = []) {
  return queryParams.length ? `?${queryParams.map((param) => `${param.key}=${param.value}`).join('&')}` : '';
}
