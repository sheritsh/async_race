export enum ServerResponces {
  OK = 200,
  CREATED = 201,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  TOO_MANY_REQUESTS = 429,
  ITERNAL_SERVER_ERROR = 500,
}

export interface ICar {
  name: string;
  color: string;
}

export interface IGettedCar {
  name: string;
  color: string;
  id: number;
}

export interface IEngineStatus {
  velocity: number;
  distance: number;
}

export interface IEngineDrive {
  success: boolean;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}
