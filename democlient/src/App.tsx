import React, { useEffect, useState, useReducer } from 'react';
import Planets from './components/Planets';
import Species from './components/Species';

import './App.css';


interface State {
  planets: Planet[];
  active?: Planet;
}

export interface Planet {
  id: string;
  name: string;
  species: Specie[];
}

export interface Specie {
  name: string, 
  classification: string, 
  designation: string, 
  average_height: number, 
  skin_colors: string, 
  hair_colors: string, 
  eye_colors: string, 
  average_lifespan: number,
  language: string, 
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

const planetReducer = (state: State = initialState, { type, planet }: {type: string, planet: Planet}): State => {
  switch (type) {
    case "add":
      return { ...state, planets: [...state.planets, planet]};
    case "remove":
      return { ...state, planets: state.planets.filter(p => p.id === planet.id) };
    case "update":
      let temp = [...state.planets];
      temp[temp.findIndex(p => p.id === planet.id)] = planet;
      return {...state, planets: temp};
    default:
      return state;
  }
}

const speciesReducer = (state: State = initialState, { type, id, specie }: {type: string, id: string, specie: Specie}): State => {
  let temp;
  switch (type) {
    case "add":
      temp = [...state.planets];
      temp[temp.findIndex(p => p.id === id)].species.push(specie);
      return {...state, planets: temp};
    case "remove":
      temp = [...state.planets];
      temp.find(p => p.id === id)?.species.filter(s => s.name === specie.name);
      return { ...state, planets: temp };
    case "update":
      temp = [...state.planets];
      let indx = temp.findIndex(p => p.id === id);
      temp[indx].species[temp[indx].species.findIndex(s => s.name === specie.name)] = specie;
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

  const [state, dispatch] = useReducer(combineReducers(planetReducer, activeReducer, speciesReducer), initialState);

  return (
    <div className="App">
      <header className="App-header">
        <h3>SWerver simple client</h3>
      </header>
      
      <div className="App-container">
        <Planets planets={state.planets}/>
        <Species/>
      </div>
    </div>
  );
}

export default App;

