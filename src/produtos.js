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