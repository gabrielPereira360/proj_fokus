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
const btn_temporizador = document.querySelector('#start-pause'); // Captura a tag do botão do temporizador
const iniciarOuPausarBtn = document.querySelector('#start-pause span'); // Captura o botão de começar
const iniciarOuPausarImg = document.querySelector('.app__card-primary-butto-icon'); // Captura imagem do botao de pausar
const tempoNaTela = document.querySelector('#timer'); // Captura a tag onde irá encaixar o tempo

let tempoDecorridoEmSegundos = 1500; // Iniciar com 25 minutoss
let intervaloId = null; 
const audioPlay = new Audio('./sons/play.wav');
const audioPause = new Audio('./sons/pause.mp3');
const audioBeep = new Audio('./sons/beep.mp3');

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
    tempoDecorridoEmSegundos = 1500;
    zerar();
    resetarComeço();
    mostrarTempo();
}); // Atribui um evento de clique para alterar o atributo data-contexto da tag html

btn_curto.addEventListener('click', () => {
    alteraContexto('descanso-curto');
    btn_curto.classList.add('active');
    tempoDecorridoEmSegundos = 300;
    zerar()
    resetarComeço();
    mostrarTempo();
});

btn_longo.addEventListener('click', () => {
    alteraContexto('descanso-longo');
    btn_longo.classList.add('active');
    tempoDecorridoEmSegundos = 900;
    zerar()
    resetarComeço();
    mostrarTempo();
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

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){
        audioBeep.play();
        alert('Tempo finalizado');
        zerar();
        resetarComeço();
        return;
    }
    tempoDecorridoEmSegundos--;
    mostrarTempo();
}

btn_temporizador.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if (intervaloId){
        audioPause.play();
        resetarComeço();
        zerar();
        return;
    }
    audioPlay.play();
    iniciarOuPausarBtn.textContent = 'Pausar';
    iniciarOuPausarImg.setAttribute('src', './imagens/pause.png');
    intervaloId = setInterval(contagemRegressiva, 1000); // Função que vai decrementar automaticamente o valor a cada 1000ms || 1 segundo
}

function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
}; // Zerar temporizador

function mostrarTempo (){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

function resetarComeço(){
    iniciarOuPausarBtn.textContent = 'Começar';
    iniciarOuPausarImg.setAttribute('src', './imagens/play_arrow.png');
}

mostrarTempo();