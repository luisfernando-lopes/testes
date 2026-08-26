//MENU MOBILE
/*
export function iniciarMenu(){
    const menuToggle = document.querySelector('.menu-toggle');
    const menuPrincipal = document.querySelector('#menu-principal');
    if(menuToggle && menuPrincipal){
    menuToggle.addEventListener('click', () => {
    const menuAberto = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!menuAberto));
    menuPrincipal.classList.toggle('aberto');
    });
    }
}
import { iniciarMenu } from "./components/menu.js";

iniciarMenu();
*/


//LINKS DO NAV
/*
export function destacarLinkAtivo(){
    const linksNav = document.querySelectorAll('#menu-principal a');
    const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';
  
    linksNav.forEach((link) => {
      const arquivoDoLink = link.getAttribute('href').split('#')[0] || 'index.html';
  
      if (arquivoDoLink === paginaAtual){
        link.classList.add('ativo');
      }
    });
}

import { iniciarMenu, destacarLinkAtivo } from "./components/menu.js";

destacarLinkAtivo();
*/