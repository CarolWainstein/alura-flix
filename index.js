/*
let listaFilmes = [
    { nome: 'Butterfly Effect', url: 'https://upload.wikimedia.org/wikipedia/pt/thumb/4/43/Butterflyeffect_poster.jpg/230px-Butterflyeffect_poster.jpg' },
    { nome: 'Arrival', url: 'https://upload.wikimedia.org/wikipedia/en/d/df/Arrival%2C_Movie_Poster.jpg' },
];
*/

// para armazenar a lista na memória do navegador
let listaFilmes = JSON.parse(localStorage.getItem('listaFilmes')) || [];

function removerDuplicatas(filmes) {
    const filmesSemDuplicatas = [];
    const nomes = new Set();

    for (const filme of filmes) {
        const nomeUpper = filme.nome.toUpperCase();

        if (!nomes.has(nomeUpper)) {
            nomes.add(nomeUpper);
            filmesSemDuplicatas.push(filme);
        }
    }
    return filmesSemDuplicatas;
}

function ordemAlfabetica(a, b) {
    const nomeA = a.nome.toUpperCase();
    const nomeB = b.nome.toUpperCase();

    if (nomeA < nomeB) {
        return -1;
    } else if (nomeA > nomeB) {
        return 1;
    } else {
        return 0;
    }
}

function criarElementoFilme(filme) {
    const divElement = document.createElement('div');
    divElement.className = 'filme-container'; // Adicione uma classe para estilização no CSS

    const imgElement = document.createElement('img');
    imgElement.src = filme.url;
    imgElement.alt = filme.nome;
    imgElement.style.maxHeight = '250px';

    const buttonElement = document.createElement('button');
    buttonElement.textContent = 'Remover';
    buttonElement.addEventListener('click', function () {
        removerFilme(filme);
    });

    divElement.appendChild(imgElement);
    divElement.appendChild(buttonElement);

    return divElement;
}

function exibirLista() {
    // Limpar a lista de filmes no HTML
    const listaFilmesElement = document.getElementById('listaFilmes');
    listaFilmesElement.innerHTML = '';

    // Recriar a lista de filmes ordenada
    const filmesOrdenados = removerDuplicatas(listaFilmes).sort(ordemAlfabetica);

    // Adicionar os filmes ordenados ao HTML usando a nova função
    for (var i = 0; i < filmesOrdenados.length; i++) {
        const elementoFilme = criarElementoFilme(filmesOrdenados[i]);
        listaFilmesElement.appendChild(elementoFilme);
    }
}

// Carregar a lista de filmes ao iniciar a página
window.onload = function () {
    exibirLista();
};

function adicionarFilme() {
    var nomeFilme = document.getElementById('nomeFilme').value;
    var urlFilme = document.getElementById('urlFilme').value;

    if (nomeFilme && urlFilme) {
        listaFilmes.push({ nome: nomeFilme, url: urlFilme });

        // Armazenar listaFilmes no localStorage
        localStorage.setItem('listaFilmes', JSON.stringify(listaFilmes));

        // Exibir a lista atualizada
        exibirLista();

        // Limpar os campos de entrada
        document.getElementById('nomeFilme').value = '';
        document.getElementById('urlFilme').value = '';
    }
}

function removerFilme(filme) {
    // Remover o filme da lista
    listaFilmes = listaFilmes.filter(item => item !== filme);

    // Atualizar o localStorage
    localStorage.setItem('listaFilmes', JSON.stringify(listaFilmes));

    // Exibir a lista atualizada
    exibirLista();
}

function criarElementoFilme(filme) {
    const divElement = document.createElement('div');
    divElement.className = 'filme-container'; // Adicione uma classe para estilização no CSS

    // Adiciona um link ao redor da imagem
    const linkElement = document.createElement('a');
    linkElement.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(filme.nome)}+trailer`;
    linkElement.target = '_blank'; // Abre o link em uma nova guia

    const imgElement = document.createElement('img');
    imgElement.src = filme.url;
    imgElement.alt = filme.nome;
    imgElement.style.maxHeight = '250px';

    // Adiciona a imagem dentro do link
    linkElement.appendChild(imgElement);

    const buttonElement = document.createElement('button');
    buttonElement.textContent = 'Remover';
    buttonElement.addEventListener('click', function () {
        removerFilme(filme);
    });

    // Adiciona o link e o botão ao contêiner
    divElement.appendChild(linkElement);
    divElement.appendChild(buttonElement);

    return divElement;
}
