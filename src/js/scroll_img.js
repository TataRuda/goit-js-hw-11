export { onScroll }

window.addEventListener('scroll', onScroll)

function onScroll() {
const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
  
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}

