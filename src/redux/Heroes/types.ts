export enum actionTypes {
  addHeroesFavRequest = 'ADD_HEROES_FAV_REQUEST',
  addHeroesFavSuccess = 'ADD_HEROES_FAV_SUCCESS',
  RemoveHeroesFavRequest = 'REMOVE_HEROES_FAV_REQUEST',
  RemoveHeroesFavSuccess = 'REMOVE_HEROES_FAV_SUCCESS',
}

export interface IHeroes {
  id: number;
  name: string;
  description?: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface IHeroesState {
  heroes: IHeroes[];
}
