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

const NUMERO_LOJA = "55SEUNUMERO";
const CHAVE_BANCO_SIMULADO = "acuidadeVisual_bancoSimulado";

function obterBancoSimulado(){
  const dados = localStorage.getItem(CHAVE_BANCO_SIMULADO);
  return dados ? JSON.parse(dados) : [];
}

function salvarNoBancoSimulado(registro){
  const banco = obterBancoSimulado();
  banco.push(registro);
  localStorage.setItem(CHAVE_BANCO_SIMULADO, JSON.stringify(banco));
}

function verificarCliente(nome, telefone){
  return new Promise((resolve) => {
    setTimeout(() => {
      const banco = obterBancoSimulado();

      const encontrado = banco.find((registro) =>
        registro.nome.trim().toLowerCase() === nome.trim().toLowerCase() &&
        registro.telefone.replace(/\D/g, "") === telefone.replace(/\D/g, "")
      );

      resolve({ existe: Boolean(encontrado) });
    }, 400);
  });
}

const modal = document.querySelector("#modal-cupom");
const formCupom = document.querySelector("#form-cupom");
const modalProdutoNome = document.querySelector("#modal-produto-nome");
const inputNome = document.querySelector("#input-nome");
const inputTelefone = document.querySelector("#input-telefone");
const botaoConfirmar = document.querySelector("#botao-confirmar");

let produtoSelecionado = "";

document.querySelectorAll(".botao-cupom").forEach((botao) => {
  botao.addEventListener("click", () => {
    produtoSelecionado = botao.dataset.produto;
    modalProdutoNome.textContent = produtoSelecionado;

    formCupom.reset();
    botaoConfirmar.textContent = "Continuar";

    modal.showModal();
  });
});

document.querySelector("#botao-cancelar").addEventListener("click", () => modal.close());

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.close();
});

formCupom.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = inputNome.value.trim();
  const telefone = inputTelefone.value.trim();

  botaoConfirmar.disabled = true;
  botaoConfirmar.textContent = "Verificando...";

  await verificarCliente(nome, telefone);

  botaoConfirmar.disabled = false;
  finalizarResgate(nome, telefone);
});

function finalizarResgate(nome, telefone){
  salvarNoBancoSimulado({ nome, telefone });

  const mensagem =
    `Olá! Me chamo ${nome} e quero resgatar meu cupom de desconto no produto "${produtoSelecionado}".\n` +
    `Meu WhatsApp: ${telefone}\n` +
    `Cupom: DESCONTO5`;

  const linkWhatsApp = `https://wa.me/${NUMERO_LOJA}?text=${encodeURIComponent(mensagem)}`;

  window.open(linkWhatsApp, "_blank");
  modal.close();
}