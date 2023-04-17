export function fetchCountries(name) { 
// Initializing data fetching
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)  
      .then(response => response.json()) // Response handling
      .catch(error => console.log(error)) // Error handling
  } 
// this promise 