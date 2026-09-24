// ======================================
// AULA 07 - CATÁLOGO
// js/app.js
// ======================================


// ======================================
// AULA 07 - CATÁLOGO
// ======================================

const listaProjetos =
    document.querySelector('#lista-projetos');

const busca =
    document.querySelector('#busca');

const statusProjetos =
    document.querySelector('#status');

const contadorSelecionados =
    document.querySelector('#contador-selecionados');

const cards =
    document.querySelectorAll('.projeto-card');

const botoesFiltro =
    document.querySelectorAll('.btn-filtro');


/*if (
    listaProjetos &&
    busca &&
    statusProjetos &&
    contadorSelecionados &&
    cards.length > 0
) {

    const estado = {
        projeto:[],
        categoria: 'todos',
        busca: '',
        selecionados: new Set()
    };


    function cardCombina(card) {

        const categoria =
            card.dataset.categoria;

        const texto =
            card.textContent
                .toLowerCase();

        const categoriaOk =
            estado.categoria === 'todos'
            ||
            estado.categoria === categoria;

        const buscaOk =
            texto.includes(
                estado.busca
            );

        return categoriaOk && buscaOk;
    }


    function renderizarCatalogo() {

        let totalVisiveis = 0;


        cards.forEach(
            function (card) {

                const mostrar =
                    cardCombina(card);

                if (mostrar) {

                    card.classList.remove(
                        'escondido'
                    );

                    totalVisiveis++;

                } else {

                    card.classList.add(
                        'escondido'
                    );

                }


                const id =
                    card.dataset.id;

                const selecionado =
                    estado.selecionados.has(id);

                card.classList.toggle(
                    'selecionado',
                    selecionado
                );


                const botaoSelecionar =
                    card.querySelector(
                        '.btn-selecionar'
                    );

                if (botaoSelecionar) {

                    botaoSelecionar.setAttribute(
                        'aria-pressed',
                        String(selecionado)
                    );

                    botaoSelecionar.textContent =
                        selecionado
                            ? 'Selecionado'
                            : 'Selecionar';
                }

            }
        );


        statusProjetos.textContent =
            totalVisiveis
            +
            ' projeto(s) encontrado(s).';


        contadorSelecionados.textContent =
            estado.selecionados.size
            +
            ' selecionado(s)';
    }


    botoesFiltro.forEach(
        function (botao) {

            botao.addEventListener(
                'click',
                function () {

                    estado.categoria =
                        botao.dataset.filtro;


                    botoesFiltro.forEach(
                        function (item) {

                            item.classList.remove(
                                'ativo'
                            );

                        }
                    );


                    botao.classList.add(
                        'ativo'
                    );


                    renderizarCatalogo();
                }
            );

        }
    );


    busca.addEventListener(
        'input',
        function () {

            estado.busca =
                busca.value
                    .trim()
                    .toLowerCase();

            renderizarCatalogo();
        }
    );


    // Delegação de evento:
    // um listener no container atende todos os cards.
    listaProjetos.addEventListener(
        'click',
        function (evento) {

            const botao =
                evento.target.closest(
                    '.btn-selecionar'
                );

            if (!botao) {
                return;
            }


            const card =
                botao.closest(
                    '.projeto-card'
                );

            if (!card) {
                return;
            }


            const id =
                card.dataset.id;


            if (
                estado.selecionados.has(id)
            ) {

                estado.selecionados.delete(id);

            } else {

                estado.selecionados.add(id);

            }


            renderizarCatalogo();
        }
    );


    renderizarCatalogo();
}*/

const estado = {    
    projeto : [],
    categoria : 'todos',
    busca : '',
    selecionados : new Set()
}

function cardCombina(card){
    const categoria = card.dataset.categoria;
    const texto = card.textContent.toLocaleLowerCase();
    const categoriaOk = estado.categoria === 'todos' || estado.categoria === categoria;
    const buscaOk = texto.includes(estado.busca);

    return categoriaOk && buscaOk;
}

function renderizarCatalogo(){
    const projetoFiltrados = filtrarProjetos();
 
    listaProjetos.innerHTML = projetoFiltrados.map(function (projeto) {
        const id= String(projeto.id);
       
        const selecionado = estado.selecionados.has(id);
 
        return `
            <article
                class="card projeto-card ${selecionado ? 'selecionado' : ' '}"
                data-id="${id}"
                data-categoria="${projeto.categoria}"
            >
                <h3>${projeto.titulo}</h3>
                <p>${projeto.descricao}</p>
           
                <button
                    type="button"
                    class="btn-selecionar"
                    aria-pressed="${selecionado}"
                >
                    ${
                        selecionado ? 'Selecionado' : 'Selecionar'
                    }
                </button>
               
            </article>          
        `;
    }).join('');

    if(statusProjetos){
        statusProjetos.textContent = projetoFiltrados.length + 'projeto(s) encontrados.';
    }
    if(contadorSelecionados){
        contadorSelecionados.textContent = estado.selecionados.size + 'selecionado(s)';
    }

    if(listaProjetos){
        if(busca){
            busca.addEventListener('input',
                function(){
                    estado.busca = busca.ariaValueMax.trim().toLocaleLowerCase();
                    renderizarCatalogo()
                }
            )
        }

        listaProjetos.addEventListener('click',
            function(evento){
                const botao = evento.target.closest('.btn-selecionar');

                if (!botao){
                    return
                }

                const card = botao.closest('.projeto-card');

                if (!card){
                    return
                }

                const id = card.dataset.id;

                if (estado.selecionados.has(id)){
                    estado.selecionados.delete(id);
                }else{
                    estado.selecionados.add(id);
                }

                renderizarCatalogo();
            }
        )
    };

    carregarProjetos();
}

async function carregarProjetos() {

    if(window.location.protocol === 'file'){

        const mensagem = 'Abra o projeto pelo servidor local: execute iniciar-servidor.bat'
        console.erro(mensagem);
        listaProjetos.innerHTML = '<p class= '
    }
    try{
        const resposta =
            await fetch('data/projetos.json');
        
        if (!resposta.ok) {
            throw new Error(
                'Erro HTTP: ' + resposta.status);
        }

        const projetos =
            await resposta.json();
    
        console.log(projetos);
    } catch (error) {
        console.error(
            'Erro ao carregar projetos:',
            error
        );
    }
}

function filtrarProjetos(){
    return estado.projeto.filter(

        function (projeto){
            const texto = ( projeto.titulo + "projeto.descricao").toLocaleLowerCase();
            const categoriaOk = estado.categoria === 'todos' || projeto.categoria === estado.categoria;
            const buscaOk = texto.includes(estado.busca);

            return categoriaOk && buscaOk;
        }
    );
}