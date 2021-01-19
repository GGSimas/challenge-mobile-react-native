import {takeLatest, all, put} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';
import {
  addHeroesFavRequest,
  addHeroesFavSuccess,
  removeHeroFavRequest,
  removeHeroFavSuccess,
} from './actions';

import {actionTypes} from './types';
import {store} from '../store';

type IAddHeroesToFavRequest = ReturnType<typeof addHeroesFavRequest>;
type IRemoveHeroesToFavRequest = ReturnType<typeof removeHeroFavRequest>;

function* addHeroesFavorite({payload}: IAddHeroesToFavRequest) {
  const {hero} = payload;
  try {
    const allHeroes = store.getState().heroes.heroes;

    const alreadyExistThisHero = allHeroes.find((h) => h.name === hero.name);

    if (!alreadyExistThisHero) {
      yield put(addHeroesFavSuccess(hero));
    } else {
      Toast.show({
        type: 'error',
        text1: 'Houve um erro',
        text2: `parece que o heroi ${hero.name}, já foi adicionado`,
        position: 'bottom',
      });
    }
  } catch (err) {
    Toast.show({
      type: 'error',
      text1: 'Houve um erro',
      text2: 'Tente novamente mais tarde!',
      position: 'bottom',
    });
  }
}

function* removeHeroesFavorite({payload}: IRemoveHeroesToFavRequest) {
  const {heroId} = payload;

  yield put(removeHeroFavSuccess(heroId));
}

export default all([
  takeLatest(actionTypes.addHeroesFavRequest, addHeroesFavorite),
  takeLatest(actionTypes.RemoveHeroesFavRequest, removeHeroesFavorite),
]);
