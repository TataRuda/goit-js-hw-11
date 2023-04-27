export { onScroll }

window.addEventListener('scroll', onScroll)

function onScroll() {
const { height } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
  
  window.scrollBy({
    top: height * 2,
    behavior: "smooth",
  });
}

