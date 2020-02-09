# SWerver
RESTful Node.JS server for creating planets with possibility to add species from <a href="https://swapi.co/api/">SWapi</a>


## Running

Requires mongodb instance as database.
Starting scripts include npm install to make running a bit easier.

**npm**  
Development  
```npm start-dev```

Production  
```npm start```

**yarn**  
Development  
```yarn start-dev```

Production  
```yarn start```


**API**

API implements basic CRUD operations for planets and species

```GET /planets```
```return Array<Planet>```
Get all planets

```GET /planets/:id```
```return Planet```
Get planet with id

```GET /planets/:id/species```
```return Array<Species>```
Get all species of a planet

```GET /planets/:id/species/:sid```
```return Species```
Get a certain species of a planet

```POST /planets/```
```body: {name : string}```
Add a planet with name

```POST /planets/:id/species```
```body: {name : string}```
Add a species from swapi

```PUT /planets/:id```
```body: {name : string}```
Edit planet name

```PUT /planets/:id/species/:sid```
```body: {changedVals : Specie}```
Edit specie values

```DELETE /planets/```
Remove all planets

```DELETE /planets/:id```
Remove planet with id

```DELETE /planets/:id/species```
Remove all species from planet

```DELETE /planets/:id/species/:sid```
Remove species with id from planet


**Planet Model**

```{```
```  "_id": unique string,```
```  "name": string,```
```  "species": [```
```    Array of species objects from SWapi```
```  ]```
```}```

**Specie Model**

```{```
```  "_id": unique string,```
```  "name": string",```
```  "classification": string,```
```  "designation": string,```
```  "average_height": number,```
```  "skin_colors": string,```
```  "hair_colors": string,```
```  "eye_colors": string,```
```  "average_lifespan": number,```
```  "language": string```
```}```
