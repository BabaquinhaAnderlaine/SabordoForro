// CORREÇÃO DO JAVASCRIPT DOS CONTROLES DE MÚSICA
document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const volumeControl = document.getElementById('volume-control');
    const volumeLevel = document.getElementById('volume-level');
    const musicInfo = document.querySelector('.music-info');
    
    
    // Menu mobile
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    // Verificar se os elementos foram encontrados
    console.log('Play button:', playBtn);
    console.log('Prev button:', prevBtn);
    console.log('Next button:', nextBtn);
    
    // Lista de músicas de forró (links de exemplo)
    const songs = [
        {
            title: "Sonho de Amor",
            src: "https://alpha.123tokyo.xyz/get.php/b/37/3c5QHE0GkSM.mp3?n=Sonho%20de%20Amor&uT=R&uN=aGVsbG8tdFNxRFFJT08z&h=Z4n0hz7VHqEm-fMdB3RvVg&s=1760200843&uT=R&uN=aGVsbG8tdFNxRFFJT08z"
        },
        {
            title: "Manchete dos Jornais",
            src: "https://epsilon.123tokyo.xyz/get.php/7/76/mcjYdqcAvLM.mp3?n=Calcinha%20Preta%20-%20Manchete%20Dos%20Jornais%20%23AoVivoEmBel%C3%A9mDoPar%C3%A1%20DVD%20Vol.2&uT=R&uN=aGVsbG8tdFNxRFFJT08z&h=3wB8QCfxreRh-74wortroA&s=1760202349&uT=R&uN=aGVsbG8tdFNxRFFJT08z"
        },
        {
            title: "Diga Sim pra Mim",
            src: "https://nu.123tokyo.xyz/get.php/3/33/oXy3UulzmW0.mp3?n=Diga%20Sim%20pra%20Mim&uT=R&uN=aGVsbG8tdFNxRFFJT08z&h=EupEJMIF6olxSCVex3jDLQ&s=1760202532&uT=R&uN=aGVsbG8tdFNxRFFJT08z"
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

    // Menu mobile toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
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
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeeGCw2496cbyl93uagn-3KrhDXdoowzj6Mg&s",
            description: "Nossos deliciosos dindins gourmet são uma explosão de sabor em cada mordida. Feitos com ingredientes selecionados e receita exclusiva, são a combinação perfeita entre tradição e sofisticação.",
            details: "<p><strong>Ingredientes:</strong> Farinha de trigo, manteiga, açúcar, ovos, leite condensado, coco ralado, fermento.</p><p><strong>Opções de sabor:</strong> Coco tradicional, chocolate, doce de leite, frutas vermelhas.</p>",
            price: "R$ 5,00"
        },
        empadao: {
            title: "Empadão Nordestino",
            image: "https://renata.com.br/images/receitas/50/renata-imagem-receitas-empadao-de-frango-share.jpg",
            description: "Nosso empadão nordestino é preparado com massa sequinha e recheio especial de frango temperado com especiarias típicas da região. Uma verdadeira experiência gastronômica que remete às tradições do Nordeste.",
            details: "<p><strong>Ingredientes:</strong> Farinha de trigo, manteiga, frango desfiado, cebola, alho, pimentão, azeitonas, ovos, leite, temperos nordestinos.</p><p><strong>Tamanho:</strong> Porção individual (aproximadamente 300g)</p>",
            price: "R$ 7,00"
        },
        suco: {
            title: "Sucos Naturais",
            image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            description: "Nossos sucos naturais são extraídos das frutas mais frescas do Nordeste, sem adição de conservantes ou açúcares. Cada copo é uma explosão de vitaminas e sabor que refresca e revigora.",
            details: "<p><strong>Sabores disponíveis:</strong> Maracujá, acerola, goiaba, caju, manga, abacaxi com hortelã.</p><p><strong>Tamanhos:</strong> 300ml ou 500ml</p><p><strong>Benefícios:</strong> 100% natural, rico em vitaminas, sem conservantes.</p>",
            price: "R$ 3"
        }
    }
        })