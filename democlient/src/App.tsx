import React, { useEffect, useState, useReducer } from 'react';
import './App.css';


interface State {
  planets: Planet[];
  active?: Planet;
}

interface Planet {
  id: number;
  name: string;
  species: Species[];
}

interface Species {
  name: string;
}


const initialState: State = {
  planets: [],
  active: undefined,
}

const combineReducers = (...reducers: Function[]) => 
  (state: State = initialState, action: any): any => {
    for(let i=0;i<reducers.length;i++) 
      state = reducers[i](state, action)
    return state;
  }

const planetReducer = (state: State = initialState, { type, value, index }: {type: string, value: Planet, index: number}): State => {
  let temp;
  switch (type) {
    case "add":
      return { ...state, planets: [...state.planets, value]};
    case "remove":
      temp = [...state.planets];
      temp.splice(index,1);
      return { ...state, planets: temp };
    case "update":
      temp = [...state.planets];
      temp[index] = value
      return {...state, planets: temp};
    default:
      return state;
  }
}

const activeReducer = (state: State = initialState, { type, index }: any) => {
  switch (type) {
    case "set":
      if(index > state.planets.length) index = state.planets.length-1;
      if(index < 0) index = 0;
      return { ...state, active: state.planets[index]};
    default:
      return state;
  }
}

const App: React.FC = () => {

  const [state, dispatch] = useReducer(combineReducers(planetReducer, activeReducer), initialState);

  return (
    <div className="App">
      <header className="App-header">
        <h3>SWerver simple client</h3>
      </header>
      
      <div className="App-container">

      </div>
    </div>
  );
}

export default App;

