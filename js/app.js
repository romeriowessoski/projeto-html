console.log("JavaScript carregado");

const listaProjetos = document.querySelector("#listar-projetos");

const statusProjetos = document.querySelector("#status");

const contatoSelecionado = document.querySelector("#contatos-selecionados");

const busca = document.querySelector("#busca");

const cards = document.querySelectorAll(".projeto-card");

const botoesFiltro = document.querySelectorAll(".btn-filtro");

if (listaProjetos && busca && statusProjetos && contatoSelecionado && cards.length > 0
) {
    const estado = {
        categoria: "todos",
        busca: "",
        Selection: new Set()
    };

    function cardCombina(card) {
        const categoria = card.dataset.categoria;
        const texto = card.textContent.toLowerCase();
        const categoriaOk = estado.categoria === "todos" || estado.categoria === categoria;
        const buscaOk = texto.includes(estado.busca.toLowerCase());
        return categoriaOk && buscaOk;
    }

    function renderizarCatalogo() {
        let totalVisiveis = 0;

        cards.forEach(function (card) {
            const mostrar = cardCombina(card);

            if (mostrar) {
                card.classList.remove("escondido");
                totalVisiveis++;
            } else {
                card.classList.add("escondido");
            }

            const id = card.dataset.id;
            const selecionado = estado.Selection.has(id);

            card.classList.toggle("selecionado", selecionado);

            const botaoSelecionar = card.querySelector(".btn-selecionar");
            if (botaoSelecionar) {
                botaoSelecionar.setAttribute("aria-pressed", String(selecionado));
            }

            botaoSelecionar.textContent = selecionado ? "Selecionado" : "Selecionar";

        });

        statusProjetos.textContent = totalVisiveis + " projeto(s) encontrado(s)";

        contatoSelecionado.textContent = estado.Selection.size + " projeto(s) selecionado(s)";
    }

    botoesFiltro.forEach(
        function (botao) {
            botao.addEventListener("click", function () {

                estado.categoria = botao.dataset.filtro;

                botoesFiltro.forEach(
                    function (item) {
                        item.classList.remove("ativo");
                    }
                );

                botao.classList.add("ativo");

                renderizarCatalogo();
            }
            )

        }
    );

    busca.addEventListener("input", 
        function () {
            estado.busca = busca.value.trim().toLowerCase();
            renderizarCatalogo();
        }
    );

    //um listener no container atende todos os cards

    listaProjetos.addEventListener("click", 
        function (evento) {
            const botao = evento.target.closest("btn-selecionar");
            if (!botao) {
                return;
            }

            const card = botao.closest(".projeto-card");
            if (!card) {
                return;
            }

            const id = card.dataset.id;
            if(estado.Selection.has(id)) {
                estado.Selection.delete(id);
            } else {
                estado.Selection.add(id);
            }

            renderizarCatalogo();
        }
    );

    renderizarCatalogo();
}



console.log(busca);
console.log(cards);
console.log(botoesFiltro);

// botoesFiltro.forEach(function(botao) {
//     botao.addEventListener('click', function() {
//         console.log("Cliquei!");
//         alert("Cliquei!");
//     });
// });