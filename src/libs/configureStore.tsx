import {createStore, applyMiddleware} from 'redux';
import {Persistor, persistStore} from 'redux-persist';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

let store: any;
let persistor: Persistor;

class ConfigureStore {
  initialStore() {
    const sagaMiddleware = createSagaMiddleware();
    store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    persistor = persistStore(store);
    sagaMiddleware.run(rootSaga);
    return {store, persistor};
  }

  getPersistor() {
    return {persistor};
  }
}

const StoreApp = new ConfigureStore();

export {StoreApp};
