import {createStore, applyMiddleware} from 'redux';
import CreateSagaMiddleware from 'redux-saga';
import {persistReducer, persistStore} from 'redux-persist';
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';
import {IHeroesState} from './Heroes/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IState {
  heroes: IHeroesState;
}
const persistConfig = {
  key: '@marvel/heroes',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = CreateSagaMiddleware();
const middlewares = [];

middlewares.push(sagaMiddleware);

const store = createStore(persistedReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export {store, persistor};
