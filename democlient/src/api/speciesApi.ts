import {Fetch, METHODS} from './fetch';

export const getSpecies = (id:string) => Fetch(METHODS.GET, `/planets/${id}/species`)
export const getSpecie = (id:string, sid:string) => Fetch(METHODS.GET, `/planets/${id}/species/${sid}`)

export const postSpecie = (id:string, name:string) => Fetch(METHODS.POST, `/planets/${id}/species`, {name:name})

export const updateSpecie = (id:string, sid:string, custom:any) => Fetch(METHODS.PUT, `/planets/${id}/species/${sid}`, custom)

export const deleteSpecies = (id:string) => Fetch(METHODS.DELETE, `/planets/${id}/species`)
export const deleteSpecie = (id:string, sid:string) => Fetch(METHODS.DELETE, `/planets/${id}/species/${sid}`)