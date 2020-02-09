import {Fetch, METHODS} from './fetch';

export const getPlanets = () => Fetch(METHODS.GET, `/planets`)
export const getPlanet = (id:string) => Fetch(METHODS.GET, `/planets/${id}`)

export const postPlanet = (name:string) => Fetch(METHODS.POST, `/planets`, {name:name})

export const updatePlanet = (id:string, name:string) => Fetch(METHODS.PUT, `/planets/${id}`, {name:name})

export const deletePlanets = () => Fetch(METHODS.DELETE, `/planets`)
export const deletePlanet = (id:string) => Fetch(METHODS.DELETE, `/planets/${id}`)