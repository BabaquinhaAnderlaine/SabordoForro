// CORREÇÃO DO JAVASCRIPT DOS CONTROLES DE MÚSICA
document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const volumeControl = document.getElementById('volume-control');
    const volumeLevel = document.getElementById('volume-level');
    const musicInfo = document.querySelector('.music-info');
    
    // Verificar se os elementos foram encontrados
    console.log('Play button:', playBtn);
    console.log('Prev button:', prevBtn);
    console.log('Next button:', nextBtn);
    
    // Lista de músicas de forró (links de exemplo)
    const songs = [
        {
            title: "Sonho de Amor",
            src: "musicas\\Sonho de Amor.mp3"
        },
        {
            title: "Manchete dos Jornais",
            src: "musicas\\Manchete Dos Jornais.mp3"
        },
        {
            title: "Diga Sim pra Mim",
            src: "musicas\\Diga Sim pra Mim.mp3"
        }
    ];
    
    let currentSongIndex = 0;
    let isPlaying = false;
    let audio = new Audio(songs[currentSongIndex].src);
    audio.volume = 0.7;
    
    // Atualiza o nível de volume visual
    volumeLevel.style.width = (audio.volume * 100) + '%';
    
    // Atualiza o nome da música
    musicInfo.textContent = songs[currentSongIndex].title;
    
    // Função para tocar música
    function playSong() {
        audio.play().catch(error => {
            console.log('Erro ao reproduzir:', error);
        });
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    
    // Função para pausar música
    function pauseSong() {
        audio.pause();
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
    
    // Função para carregar e tocar uma música
    function loadSong(index) {
        currentSongIndex = index;
        audio.src = songs[currentSongIndex].src;
        audio.load();
        musicInfo.textContent = songs[currentSongIndex].title;
        if (isPlaying) {
            playSong();
        }
    }
    
    // Event listeners para os botões - COM VERIFICAÇÃO
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            if (isPlaying) {
                pauseSong();
            } else {
                playSong();
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            let newIndex = currentSongIndex - 1;
            if (newIndex < 0) {
                newIndex = songs.length - 1;
            }
            loadSong(newIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            let newIndex = currentSongIndex + 1;
            if (newIndex >= songs.length) {
                newIndex = 0;
            }
            loadSong(newIndex);
        });
    }
    
    // Controle de volume
    if (volumeControl) {
        volumeControl.addEventListener('click', function(e) {
            const rect = volumeControl.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newVolume = Math.min(1, Math.max(0, clickX / rect.width));
            
            audio.volume = newVolume;
            volumeLevel.style.width = (newVolume * 100) + '%';
        });
    }
    
    // Tocar música automaticamente quando a página carregar
    // (com interação do usuário necessária em alguns navegadores)
    document.body.addEventListener('click', function initAudio() {
        if (!isPlaying) {
            playSong();
        }
        document.body.removeEventListener('click', initAudio);
    });
    
    // Avançar para a próxima música quando a atual terminar
    audio.addEventListener('ended', function() {
        let newIndex = currentSongIndex + 1;
        if (newIndex >= songs.length) {
            newIndex = 0;
        }
        loadSong(newIndex);
    });

    // CÓDIGO PARA OS BOTÕES DE PRODUTOS
    const productCards = document.querySelectorAll('.product-card');
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalDetails = document.getElementById('modalDetails');
    const modalPrice = document.getElementById('modalPrice');
    const closeModal = document.getElementById('closeModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    // Dados detalhados dos produtos
    const productsData = {
        dindin: {
            title: "Dindins Gourmet",
            image: "imagens\\dindin1.jpg",
            description: "Nossos deliciosos dindins gourmet são uma explosão de sabor em cada mordida. Feitos com ingredientes selecionados e receita exclusiva, são a combinação perfeita entre tradição e sofisticação.",
            details: "<p><strong></strong></p><p><strong>Opções de sabor:</strong> Morango, Ninho, Coco, Maracujá, Biscoito.</p>",
            price: "R$ 5,00"
        },
        empadao: {
            title: "Empadão Nordestino",
            image: "imagens\\epadao2.jpg",
            description: "Nosso empadão nordestino é preparado com massa sequinha e recheio especial de frango temperado com especiarias típicas da região. Uma verdadeira experiência gastronômica que remete às tradições do Nordeste.",
            details: "<p><strong></p><p><strong>Tamanho:</strong> Porção individual (aproximadamente 300g)</p>",
            price: "R$ 7,00"
        },
        suco: {
            title: "Sucos Naturais",
            image: "imagens\\suco.jpg",
            description: "Nossos sucos naturais são extraídos das frutas mais frescas do Nordeste, sem adição de conservantes. Cada copo é uma explosão de vitaminas e sabor que refresca e revigora.",
            details: "<p><strong>Sabores disponíveis:</strong> Maracujá e Laranja.</p><p><strong>Tamanho:</strong> 200ml</p><p><strong></p>",
            price: "R$ 3,00"
        }
    };

    // Adicionar evento de clique aos cards de produto
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productType = this.getAttribute('data-product');
            const productData = productsData[productType];
            
            // Preencher o modal com os dados do produto
            modalTitle.textContent = productData.title;
            modalImage.src = productData.image;
            modalImage.alt = productData.title;
            modalDescription.textContent = productData.description;
            modalDetails.innerHTML = productData.details;
            modalPrice.textContent = productData.price;
            
            // Exibir o modal
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Impede rolagem do fundo
        });
    });

    // Fechar modal
    function closeProductModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaura rolagem
    }

    closeModal.addEventListener('click', closeProductModal);
    modalCloseBtn.addEventListener('click', closeProductModal);

    // Fechar modal ao clicar fora do conteúdo
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProductModal();
        }
    });

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProductModal();
        }
    });
});