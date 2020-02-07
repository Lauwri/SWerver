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

**Planet Model**

id (mongo default)  
name (String)  
species (Array of species objects from SWapi)  
