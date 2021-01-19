import {actionTypes, IHeroes} from './types';

export function addHeroesFavRequest(hero: IHeroes) {
  return {
    type: actionTypes.addHeroesFavRequest,
    payload: {
      hero,
    },
  };
}

export function addHeroesFavSuccess(hero: IHeroes) {
  return {
    type: actionTypes.addHeroesFavSuccess,
    payload: {
      hero,
    },
  };
}

export function removeHeroFavRequest(heroId: number) {
  return {
    type: actionTypes.RemoveHeroesFavRequest,
    payload: {
      heroId,
    },
  };
}

export function removeHeroFavSuccess(heroId: number) {
  return {
    type: actionTypes.RemoveHeroesFavSuccess,
    payload: {
      heroId,
    },
  };
}
