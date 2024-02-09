const btnadicionarTarefa = document.querySelector('.app__button--add-task'); // Captura botão de adicionar tarefa
const deletaCampoFormulario = document.querySelector('.app__form-footer__button--delete');
const cancelarFormulario = document.querySelector('.app__form-footer__button--cancel');
const formulario = document.querySelector('.app__form-add-task'); // Captura identificador do formulário
const textAreaFormulario = document.querySelector('.app__form-textarea'); // Captura o campo texto do formulario
const ulTarefas = document.querySelector('.app__section-task-list');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');


const tarefasLista = JSON.parse(localStorage.getItem('tarefas')) || [];
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

function atualizarTarefas (){
    localStorage.setItem('tarefas', JSON.stringify(tarefasLista)); // Realiza o tratamento para o armazenamento local seja realizado corretamente por meio da API JSON
};

function limpaFormulario(){
    textAreaFormulario.value = '';
}


function criarTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.classList.add('app__section-task-icon-status');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;

    const paragrafo = document.createElement('p');
    paragrafo.classList.add('app__section-task-list-item-description');
    paragrafo.textContent = tarefa.descricao;

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');
    botao.onclick = () => {
        const novaDescricao = prompt('Qual é o novo nome da tarefa?');
        if (novaDescricao){
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas();    
        };
    }; // Edição de tarefa


    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute('src', './imagens/edit.png');

    botao.append(imagemBotao);
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    li.onclick = () => {
        paragrafoDescricaoTarefa.textContent = tarefa.descricao;
        document.querySelectorAll('.app__section-task-list-item-active').forEach(element => {
            element.classList.remove('app__section-task-list-item-active');
        });

        if (tarefaSelecionada == tarefa) {
            paragrafoDescricaoTarefa.textContent = '';
            tarefaSelecionada = null;
            liTarefaSelecionada = null;
            return;
        } 
        tarefaSelecionada = tarefa;
        liTarefaSelecionada = li;
        li.classList.add('app__section-task-list-item-active');
    };

    return(li);
};

btnadicionarTarefa.addEventListener('click', () => {
    formulario.classList.toggle('hidden'); // Mostra ou esconde o formulario
});


deletaCampoFormulario.addEventListener('click', limpaFormulario);

cancelarFormulario.addEventListener('click', () => {
    limpaFormulario()
    formulario.classList.add('hidden');
});


formulario.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Impede o recarregamento da página toda vez que uma tarefa é adicionada
    const tarefa = {
        descricao: textAreaFormulario.value
    }; // Objeto de tarefas
    tarefasLista.push(tarefa);
    const elementoTarefa = criarTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
    atualizarTarefas();
    textAreaFormulario.value = '';
    formulario.classList.add('hidden');
});

tarefasLista.forEach(tarefa => {
    const elementoTarefa = criarTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});

document.addEventListener('FocoFinalizado', () => {
    if(tarefaSelecionada && liTarefaSelecionada){
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
    }
});

