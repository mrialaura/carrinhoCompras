//produtos
let produtosDisponiveis = [
    { id: 1, nome: "Blush", preco: 99 },
    { id: 2, nome: "Corretivo", preco: 194 },
    { id: 3, nome: "Gloss", preco: 59.90 }
];

//mostra produtos
function exibirProdutos() {

    const container = document.getElementById("listaProdutos");

    container.innerHTML = "";

    produtosDisponiveis.forEach(produto => {

        const card = document.createElement("div");

        card.innerHTML = `
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco}</p>
            <button onclick="adicionarCarrinho(${produto.id})">
                Adicionar ao carrinho
            </button>
        `;

        container.appendChild(card);
    });
}


//salva carrinho
function getCarrinho() {

    const dados = localStorage.getItem("carrinho");

    if (!dados) {
        return [];
    }

    return JSON.parse(dados);
}


//adiciona produtos no carrinho
function adicionarCarrinho(id) {

    console.log("clicou", id);

    const produto = produtosDisponiveis.find(p => p.id === id);

    const carrinho = getCarrinho();

    const itemExistente = carrinho.find(p => p.id === id);

    if (itemExistente) {

        itemExistente.quantidade++;

    } else {

        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    console.log("Produto adicionado:", carrinho);
}

function exibirCarrinho() {

    const container = document.getElementById("carrinho");

    if (!container) {
        console.log("Div carrinho não encontrada");
        return;
    }

    const carrinho = getCarrinho();

    container.innerHTML = "";

    if (carrinho.length === 0) {
        container.innerHTML = "<p>Carrinho vazio</p>";
        return;
    }

    carrinho.forEach(item => {

        const div = document.createElement("div");

        div.innerHTML = `
            <p>${item.nome}</p>
            <p>Qtd: ${item.quantidade}</p>
        `;

        container.appendChild(div);
    });
}
