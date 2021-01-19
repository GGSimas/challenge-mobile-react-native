import {Reducer} from 'redux';
import {actionTypes, IHeroesState} from './types';

const INITIAL_STATE: IHeroesState = {
  heroes: [],
};

const heroReducer: Reducer<IHeroesState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.addHeroesFavSuccess:
      const {hero} = action.payload;
      const heroes = [...state.heroes, hero];

      return {
        ...state,
        heroes,
      };

    case actionTypes.RemoveHeroesFavSuccess:
      const {heroId} = action.payload;
      const delHeroes = state.heroes.filter((hero) => hero.id !== heroId);
      return {
        ...state,
        heroes: delHeroes,
      };
    default:
      return state;
  }
};

export default heroReducer;
