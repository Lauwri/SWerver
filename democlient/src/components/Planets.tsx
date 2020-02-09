import React, { FunctionComponent, useEffect, useState, useReducer } from 'react';
import { Planet } from '../App'
import './Planets.css';

interface Planets {
  planets: Planet[]
}


const pager = (array: Planet[], page: number, size:number) => {
  return array.slice((page - 1) * page, page * size);
}

const Planets: FunctionComponent<Planets> = ({planets}) => {

  const [page, setPage] = useState(0);

  return (
    <div className="Planets">
      {page > 0 ? <button onClick={() => setPage(page+1)}>&lt;</button>:""}

      <h3>{pager(planets, page, 1)[0].name }</h3>

      {page < planets.length ? <button onClick={() => setPage(page-1)} >></button>:""}
    </div>
  );
}

export default Planets;
