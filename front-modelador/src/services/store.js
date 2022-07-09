import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { default as rootReducer } from '@services/reducer';
import { default as rootSaga } from '@services/saga';
import { templateMid, uiMid } from '@services/middleware';

const initialiseSagaMiddleware = createSagaMiddleware();
let storeEnhancers;
try {
  storeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25,
    }) || compose;
} catch (err) {
  storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  rootReducer,
  storeEnhancers(
    applyMiddleware(templateMid, uiMid, initialiseSagaMiddleware)
  )
);

initialiseSagaMiddleware.run(rootSaga);

export default store;
