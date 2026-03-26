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

      // Aplica propriedades com !important via setProperty
      // (style.cssText ignora !important — único modo correto é setProperty)
      function applyStyles(el, props) {
        Object.keys(props).forEach(function (prop) {
          el.style.setProperty(prop, props[prop], 'important');
        });
      }

      // Cria container
      var acoes = document.createElement('div');
      acoes.className = 'acoes-produto';
      applyStyles(acoes, {
        'display': 'flex',
        'opacity': '1',
        'visibility': 'visible',
        'transform': 'none',
        '-webkit-transform': 'none',
        'position': 'relative',
        'top': 'auto',
        'bottom': 'auto',
        'left': 'auto',
        'right': 'auto',
        'z-index': '999',
        'justify-content': 'space-between',
        'padding': '0 10px',
        'width': '100%',
        'box-sizing': 'border-box',
        'min-height': '50px'
      });

      var btnBaseProps = {
        'display': 'block',
        'width': '48%',
        'height': '40px',
        'line-height': '40px',
        'text-align': 'center',
        'border-radius': '4px',
        'border': 'none',
        'background-image': 'none',
        'color': '#ffffff',
        'font-size': '14px',
        'font-weight': 'bold',
        'cursor': 'pointer',
        'position': 'relative',
        'z-index': '999',
        'pointer-events': 'auto',
        'text-decoration': 'none',
        'box-sizing': 'border-box',
        'overflow': 'visible'
      };

      // Botão CARRINHO
      var btnComprar = document.createElement('a');
      btnComprar.className = 'botao-comprar';
      btnComprar.setAttribute('href', cartUrl);
      btnComprar.setAttribute('title', 'Adicionar ao carrinho');
      btnComprar.textContent = 'CARRINHO';
      applyStyles(btnComprar, btnBaseProps);
      btnComprar.style.setProperty('background-color', '#28a745', 'important');

      // Botão VER MAIS
      var btnVerMais = document.createElement('a');
      btnVerMais.className = 'ver-mais botao-ver-mais';
      btnVerMais.setAttribute('href', prodUrl);
      btnVerMais.setAttribute('title', 'Ver detalhes do produto');
      btnVerMais.textContent = 'VER MAIS';
      applyStyles(btnVerMais, btnBaseProps);
      btnVerMais.style.setProperty('background-color', '#0056b3', 'important');

      acoes.appendChild(btnComprar);
      acoes.appendChild(btnVerMais);
      item.appendChild(acoes);
    });
  }

  // Força fundo vermelho na barra inicial (sem alterar display nem filhos)
  function fixBarraInicial() {
    var barra = document.querySelector('.barra-inicial');
    if (!barra) return;
    barra.style.setProperty('background-color', '#ff0000', 'important');
    barra.style.setProperty('background-image', 'none', 'important');
  }

  // 1ª injeção: logo que o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      injetarBotoes();
      fixBarraInicial();
    });
  } else {
    injetarBotoes();
    fixBarraInicial();
  }

  // 2ª injeção: após o tema JS carregar (~500ms e 1500ms)
  window.addEventListener('load', function () {
    setTimeout(function () { injetarBotoes(); fixBarraInicial(); }, 500);
    setTimeout(function () { injetarBotoes(); fixBarraInicial(); }, 1500);
  });

})();
