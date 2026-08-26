const menuToggle = document.querySelector('.menu-toggle');
const menuPrincipal = document.querySelector('#menu-principal');

menuToggle.addEventListener('click', () => {
  const menuAberto = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!menuAberto));
  menuPrincipal.classList.toggle('aberto');
});

const linksNav = document.querySelectorAll('#menu-principal a');
const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';

linksNav.forEach((link) =>{
  const arquivoDoLink = link.getAttribute('href').split('#')[0] || 'index.html';

  if(arquivoDoLink === paginaAtual){
    link.classList.add('ativo');
  }
});

const conteudoParallax = document.querySelector('.parallax');

if (conteudoParallax){
    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
        if (entrada.isIntersecting){
        conteudoParallax.classList.add('em-foco');
        observer.unobserve(conteudoParallax);
        }
    });
  }, { threshold: 0.3 });

  observer.observe(conteudoParallax);
}

const carrossel = document.querySelector('.carrossel');

if (carrossel){
  const cards = document.querySelectorAll('.produto-card');

  const observerCarrossel = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      entrada.target.classList.toggle('ativo', entrada.isIntersecting);
    });
  }, {
    root: carrossel,
    threshold: 0.6
  });

  cards.forEach((card) => observerCarrossel.observe(card));
}

const bentoItens = document.querySelectorAll('.bento-item');

if (bentoItens.length){
  const observerBento = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada, indice) => {
      if (entrada.isIntersecting){
        setTimeout(() => {
          entrada.target.classList.add('visivel');
        }, indice * 80);
        observerBento.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.2 });

  bentoItens.forEach((item) => observerBento.observe(item));
}

document.querySelector("#ano-atual").textContent = new Date().getFullYear();