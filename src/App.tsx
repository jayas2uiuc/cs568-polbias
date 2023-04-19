import React from 'react';
import './App.css';
import {Button, defaultTheme, Provider} from '@adobe/react-spectrum';
import AppContainer from "./modules/AppContainer";


function App() {
    return (
      <Provider theme={defaultTheme} >
            <AppContainer />
      </Provider>
  )
};

export default App;
