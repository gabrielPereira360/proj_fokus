const html = document.querySelector('html'); // Captura os dados da tag html
const btn_foco = document.querySelector('.app__card-button--foco'); // Captura os dados da tag botao de foco
const btn_curto = document.querySelector('.app__card-button--curto'); // Captura os dados da tag botao de foco curto
const btn_longo = document.querySelector('.app__card-button--longo'); // Captura os dados da tag botao de foco longo
const banner = document.querySelector('.app__image'); // Captura a tag da foto do banner da página
const texto_banner = document.querySelector('.app__title'); // Captura a tag do texto do cabecalho da página
const botoes = document.querySelectorAll('.app__card-button'); // Captura os botoes de forma genérica
const musica_chbx = document.querySelector('#alternar-musica'); // Obtem os dados da tag checkbox relacionada a música
const musica = new Audio('./sons/luna-rise-part-one.mp3'); // Instancia uma música com o seu caminho 
musica.loop = true; // Declaro que música irá sempre repetir e estará sempre tocando

musica_chbx.addEventListener('change', () => { 
    if (musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
}); // Evento que verifica se a música esta tocando ou pausada


btn_foco.addEventListener('click', () => {
    alteraContexto('foco');
    btn_foco.classList.add('active');
}); // Atribui um evento de clique para alterar o atributo data-contexto da tag html

btn_curto.addEventListener('click', () => {
    alteraContexto('descanso-curto');
    btn_curto.classList.add('active');

});

btn_longo.addEventListener('click', () => {
    alteraContexto('descanso-longo');
    btn_longo.classList.add('active');
});

function alteraContexto (contexto){

    botoes.forEach(function (btn){ // Percorre os botões e limpa os estilos
        btn.classList.remove('active');
    });
 
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            texto_banner.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
        case 'descanso-curto': 
            texto_banner.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
            break;
        case 'descanso-longo':
            texto_banner.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
            break;
        default:
            alert('Erro! Elemento não encontrado.');
            break;
    }
}
