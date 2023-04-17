import './css/styles.css';
import  { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const refs = {
    inputCountry: document.getElementById('search-box'),
    listCountries: document.querySelector('.country-list'),
    infoCountries: document.querySelector('.country-info'),
};

refs.inputCountry.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));
// Create function for searching 
function onInputCountry() {
    const name = refs.inputCountry.value.trim()  // Remove whitespace from both sides of a string
     if (name === '') {
      return (refs.listCountries.innerHTML = ''), (refs.infoCountries.innerHTML = '') // set markup contained within the element
    } 

    fetchCountries(name)
    .then(countries => {
      refs.listCountries.innerHTML = '' // set markup contained within the element
      refs.infoCountries.innerHTML = '' // set markup contained within the element
      // request results with 1 country - card markup with info  
      if (countries.length === 1) { 
        refs.listCountries.insertAdjacentHTML('beforeend', renderCountryList(countries)) // insert the resulting nodes into the DOM-tree 
        refs.infoCountries.insertAdjacentHTML('beforeend', renderCountryInfo(countries)) // inside the element, after its last child
      } else if (countries.length >= 10) {      // back-end returns more than 10 countries
        alertManyMatches() // notification appears - the name should be more specific
      } else {
        refs.listCountries.insertAdjacentHTML('beforeend', renderCountryList(countries)) // insert the result into the DOM-tree
      }
    })
    .catch(alertWrongName) // back-end return error 404, user get notification
}

// create functions for notifications
function alertWrongName() {
    Notiflix.Notify.failure('Oops, there is no country with that name.',
    {timeout: 2500,
    distance: '30px',
    width: '320px',
    position: 'center-top',
    })
  }
  
function alertManyMatches() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.', 
    {timeout: 2500,
    distance: '30px',
    width: '320px',
    position: 'center-top',
    })
  }

// create item with name and flag
function renderCountryList(countries) {
    const markup = countries
      .map(({ name, flags }) => {
        return `
            <li class="country-list__item">
                <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 50px height = 30px>
                <p class="country-list__name"><b>${name.official}</b></p>
            </li>
            `
      })
      .join('')
    return markup
  }

// create item with info
function renderCountryInfo(countries) {
    const markup = countries
    .map(({ capital, population, languages }) => {
        return `
          <ul class="country-info__list">
              <li class="country-info__item"><p><b>Capital:</b> ${capital}</p></li>
              <li class="country-info__item"><p><b>Population:</b> ${population}</p></li>
              <li class="country-info__item"><p><b>Languages:</b> ${Object.values(languages).join(', ')}</p></li>
          </ul>
          `// languages are array of objects, Object.values().join(', ') returns an array with string-keyed property values
      })
    .join('')
    return markup
  }



