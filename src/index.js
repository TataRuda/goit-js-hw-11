import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImages } from './js/fetch_img';
import { renderGallery } from './js/gallery_item';
//import { onScroll } from './js/scroll_img';

const refs = {
  searchForm: document.getElementById('search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'), 
};

let query = '';
let page = 1;
const perPage = 40;


refs.searchForm.addEventListener('submit', onSearchImages);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

//onScroll()

// Create function for searching 
function onSearchImages(ev) {
 ev.preventDefault()
 //window.scrollTo({ top: 0 })
 page = 1
 query = ev.currentTarget.searchQuery.value.trim()
 refs.gallery.innerHTML = ''


 if (query === '') {
  alertEmptyString();
  return
 }

 fetchImages (query, page, perPage)
 .then(({data}) => {
  if (data.totalHits === 0) {
    alertNoImages();
  }
   else {
    renderGallery(data.hits);
    refs.loadMoreBtn.classList.add('is-hidden')
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();
    alertHitsImages(data);
  }
  if (data.totalHits > perPage) {
    refs.loadMoreBtn.classList.remove('is-hidden')
  }
 })
 .catch(error => console.log(error))
}

function onLoadMore() {
  page += 1

  fetchImages( query, page, perPage)
    .then(({data}) => {
      renderGallery(data.hits);
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();
      const totalPages = Math.ceil(data.totalHits / perPage)

      if (page > totalPages) {
        refs.loadMoreBtn.classList.add('is-hidden')
        alertEndOfImages()
      }
    }
    )
    .catch(error => console.log(error))

}

// create functions for notifications
function alertEmptyString() {
  Notiflix.Notify.failure("The search string cann't be empty. Please specify your search query.",
  {distance: '30px',
  width: '320px',
  })
}

function alertNoImages() {
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.',
  {distance: '30px',
  width: '320px',
  })
}

function alertEndOfImages() {
  Notiflix.Notify.info("We're sorry, but you've reached the end of search results.", 
  {timeout: 2500,
  distance: '30px',
  width: '320px',
  })
}

function alertHitsImages(data) {
  Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`, 
  {timeout: 2500,
  distance: '30px',
  width: '320px',
  })
}

