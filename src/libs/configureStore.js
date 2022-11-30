'use strict';
import {createStore, applyMiddleware} from 'redux';
import {persistStore} from 'redux-persist';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return {store, persistor};
};
