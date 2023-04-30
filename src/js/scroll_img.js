
export { onScroll, onTopBtn, smoothScroll }

const toTopBtn = document.querySelector('.btn-top');
const gallery = document.querySelector('.gallery');

window.addEventListener('scroll', onScroll)
toTopBtn.addEventListener('click', onTopBtn)

function onScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;
  
  if (scrolled > coords) {
    toTopBtn.classList.add('btn-top--visible')
  }
  if (scrolled < coords) {
    toTopBtn.classList.remove('btn-top--visible')
  }
}

function onTopBtn() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function smoothScroll() {
  const { height } = gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
