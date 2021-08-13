import React from 'react';
import { Provider } from 'react-redux';

// Import Redux store from the file we created in /utils
import store from './store';

export default function CarProvider(props) {
  // Return the provider component provided by react-redux
  return <Provider store={store} {...props} />;
}
