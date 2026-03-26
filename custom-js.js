/**
 * XERIFE PIMENTA — Injetor de botões de ação nos cards de produto
 *
 * O tema 325 da Loja Integrada NÃO gera os botões .botao-comprar
 * e .ver-mais no HTML. Este script cria e insere os botões
 * dinamicamente em cada .listagem-item.
 *
 * Cole este código em: Aparência > JavaScript Personalizado
 * (junto ao bloco "CODIGO HOME V6" já existente)
 */
(function () {

  function injetarBotoes() {
    document.querySelectorAll('.listagem-item').forEach(function (item) {
      // Evita duplicar se já injetado
      if (item.querySelector('.acoes-produto')) return;

      // URL do produto via overlay ou link do nome
      var linkEl = item.querySelector('a.produto-sobrepor') ||
                   item.querySelector('a.nome-produto');
      var prodUrl = linkEl ? linkEl.getAttribute('href') : '#';
      var prodId  = item.getAttribute('data-id');

      // URL do carrinho — tenta add direto; se o produto tiver variantes
      // a Loja Integrada redireciona automaticamente para a página do produto
      var cartUrl = prodId
        ? '/carrinho/add/?produto_id=' + prodId + '&quantidade=1'
        : prodUrl;

      // Cria container
      var acoes = document.createElement('div');
      acoes.className = 'acoes-produto';

      // Botão CARRINHO
      var btnComprar = document.createElement('a');
      btnComprar.className = 'botao-comprar';
      btnComprar.setAttribute('href', cartUrl);
      btnComprar.setAttribute('title', 'Adicionar ao carrinho');

      // Botão VER MAIS
      var btnVerMais = document.createElement('a');
      btnVerMais.className = 'ver-mais botao-ver-mais';
      btnVerMais.setAttribute('href', prodUrl);
      btnVerMais.setAttribute('title', 'Ver detalhes do produto');

      acoes.appendChild(btnComprar);
      acoes.appendChild(btnVerMais);
      item.appendChild(acoes);
    });
  }

  // 1ª injeção: logo que o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injetarBotoes);
  } else {
    injetarBotoes();
  }

  // 2ª injeção: após o tema JS carregar (~500ms e 1500ms)
  window.addEventListener('load', function () {
    setTimeout(injetarBotoes, 500);
    setTimeout(injetarBotoes, 1500);
  });

})();
