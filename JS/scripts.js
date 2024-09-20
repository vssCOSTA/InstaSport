// Função para capturar e adicionar a mensagem ao feed
function addPost(event) {
    event.preventDefault(); // Impede o recarregamento da página ao enviar o formulário

    // Captura o valor do input
    const inputField = document.getElementById("post-input");
    const postContent = inputField.value.trim(); // Remove espaços em branco extras

    // Verifica se o campo está vazio
    if (postContent === "") {
        return; // Não faz nada se o campo estiver vazio
    }

    // Limpa o campo de input
    inputField.value = "";

    // Cria o post e salva no localStorage
    const post = {
        content: postContent,
        user: "Vinicius Costa",
        avatar: "img/avatar2.jpg",
        date: new Date().toLocaleString() // Data e hora do post
    };

    // Adiciona o post ao localStorage
    savePostToLocalStorage(post);

    // Adiciona o post ao feed
    addPostToFeed(post);
}

// Função para adicionar um post ao localStorage
function savePostToLocalStorage(post) {
    let posts = JSON.parse(localStorage.getItem('posts')) || []; // Pega os posts existentes ou cria um array vazio
    posts.unshift(post); // Adiciona o novo post ao início (de modo que os mais recentes apareçam primeiro)
    localStorage.setItem('posts', JSON.stringify(posts)); // Salva no localStorage
}

// Função para carregar os posts salvos no localStorage ao carregar a página
function loadPostsFromLocalStorage() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(post => addPostToFeed(post)); // Adiciona cada post ao feed
}

// Função para adicionar um post ao feed
function addPostToFeed(post) {
    const feedContainer = document.getElementById("feed-container");

    // Cria um novo elemento para o post
    const newPost = document.createElement("div");
    newPost.classList.add("card", "mb-4"); // Adiciona as classes de estilo do Bootstrap

    // Conteúdo do post
    newPost.innerHTML = `
        <div class="card-body">
            <div class="media">
                <img src="${post.avatar}" alt="Avatar" width="55" class="rounded-circle mr-3">
                <div class="media-body">
                    <h5>${post.user}</h5>
                    <p>${post.content}</p>
                    <small class="text-muted">${post.date}</small>
                </div>
            </div>
        </div>
    `;

    // Adiciona o novo post ao feed
    feedContainer.prepend(newPost); // Adiciona o novo post no topo do feed
}

// Função para adicionar posts aleatórios de esportes ao carregar a página
function loadRandomPosts() {
    const randomPosts = [
        {
            content: "Incrível o jogo de ontem! Que virada no segundo tempo!",
            user: "Lucas Silva",
            avatar: "img/pessoa1.jpeg",
            date: new Date().toLocaleString()
        },
        {
            content: "Treino pesado hoje. Preparação para a próxima maratona!",
            user: "Ana Souza",
            avatar: "img/pessoa2.jpg",
            date: new Date().toLocaleString()
        },
        {
            content: "Alguém mais assistiu à final da NBA? Que jogo foi aquele!",
            user: "Pedro Henrique",
            avatar: "img/pessoa4.png",
            date: new Date().toLocaleString()
        },
        {
            content: "Fiz minha inscrição para o próximo campeonato de futebol de praia!",
            user: "Leticia Marques",
            avatar: "img/pessoa3.jpg",
            date: new Date().toLocaleString()
        },
        {
            content: "Estreia do novo uniforme do meu time favorito hoje!",
            user: "Carla Pereira",
            avatar: "img/pessoa5.png",
            date: new Date().toLocaleString()
        }
    ];

    randomPosts.forEach(post => {
        addPostToFeed(post); // Adiciona os posts aleatórios ao feed
    });
}

// Chama a função para carregar os posts e adicionar posts aleatórios quando a página é carregada
window.onload = function() {
    loadPostsFromLocalStorage();
    loadRandomPosts();
};
