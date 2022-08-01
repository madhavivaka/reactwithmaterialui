/* import { createStore, applyMiddleware } from 'redux';
import countryReducer from './reducers/countryReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const middleware = [thunk];

export const store = createStore(
    countryReducer,
    composeWithDevTools(applyMiddleware(...middleware))
    
);
*/
import { configureStore } from '@reduxjs/toolkit'

import countryReducer from './reducers/countryReducer';

export const store = configureStore({ reducer: countryReducer })

