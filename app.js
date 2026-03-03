//produtos
let produtosDisponiveis = [
    { id: 1, nome: "Blush", preco: 99, imagem: "img/blush.jpg" },
    { id: 2, nome: "Corretivo", preco: 194, imagem: "img/corretivo.jpg" },
    { id: 3, nome: "Gloss", preco: 59.90, imagem: "img/gloss.jpg" }
];

//mostra produtos
function exibirProdutos() {

    const container = document.getElementById("listaProdutos");

    container.innerHTML = "";

    produtosDisponiveis.forEach(produto => {

        const card = document.createElement("div");

        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" width="150">
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

    exibirCarrinho();

}

//mostra carrinho
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
            <p>Quantidade: ${item.quantidade}</p>
            <button onclick="removerItem(${item.id})">-</button>
            <button onclick="adicionarItem(${item.id})">+</button>
        `;

        container.appendChild(div);
    });

    const total = calcularTotal();

    const totalDiv = document.createElement("h3");
    totalDiv.textContent = `Total: R$ ${total.toFixed(2)}`;

    container.appendChild(totalDiv);
}

//visualizar carrinho
function verCarrinho() {
    exibirCarrinho();
}

//adicionar mais um produto pelo carrinho
function adicionarItem(id) {

    let carrinho = getCarrinho();

    const item = carrinho.find(p => p.id === id);

    if (item) {
        item.quantidade++;
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    exibirCarrinho();
}

//remover um item do carrinho
function removerItem(id) {

    let carrinho = getCarrinho();

    const item = carrinho.find(p => p.id === id);

    if (item) {
        item.quantidade--;

        if (item.quantidade <= 0) {
            carrinho = carrinho.filter(p => p.id !== id);
        }
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    exibirCarrinho();
}

//total do carrinho
function calcularTotal() {

    const carrinho = getCarrinho();

    let total = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
    });

    return total;
}