document.addEventListener('DOMContentLoaded', () => {
    const btnAbrir = document.getElementById('abrir-video');
    const btnFechar = document.getElementById('close-video');
    const overlay = document.getElementById('video-overlay');
    const iframe = document.getElementById('meuVideo');
    const musica = document.getElementById('musicaFundo');

    // Ajusta o volume da música de fundo (0.0 a 1.0)
    // 0.3 é um bom valor para ficar suave ao fundo
    musica.volume = 0.2;

    // 1. Abrir o vídeo
    btnAbrir.addEventListener('click', () => {
        overlay.classList.remove('video-hide');
        
        // PAUSA a música de fundo para não brigar com o som do YouTube
        musica.pause();

        // Garante que o vídeo do YouTube comece com autoplay
        let url = iframe.src;
        if (!url.includes('autoplay=1')) {
            iframe.src = url + "&autoplay=1";
        }
    });

    // 2. Fechar o vídeo
    btnFechar.addEventListener('click', () => {
        overlay.classList.add('video-hide');
        
        // Para o áudio do YouTube resetando o src
        const srcAtual = iframe.src;
        iframe.src = ''; 
        iframe.src = srcAtual; 

        // RETOMA a música de fundo após fechar o vídeo
        musica.play().catch(e => console.log("Interação necessária para tocar áudio"));
    });

    // 3. Fechar ao apertar a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && !overlay.classList.contains('video-hide')) {
            btnFechar.click();
        }
    });

    // 4. TRUQUE PARA AUTOPLAY: Inicia a música no primeiro clique dela na página
    // Isso evita o bloqueio de áudio dos navegadores modernos
    document.body.addEventListener('click', () => {
        if (musica.paused && overlay.classList.contains('video-hide')) {
            musica.play();
        }
    }, { once: true }); // O "once" garante que esse listener se apague após o primeiro clique
});

document.addEventListener('DOMContentLoaded', () => {
    const btnEntrar = document.getElementById('btn-entrar');
    const overlayEntrada = document.getElementById('overlay-entrada');
    const musica = document.getElementById('musicaFundo');

    btnEntrar.addEventListener('click', () => {
        // 1. Esconde a tela de entrada
        overlayEntrada.style.display = 'none';

        // 2. Toca a música (Agora o navegador permite!)
        musica.volume = 0.3;
        musica.play().catch(e => console.log("Erro ao tocar:", e));
    });

    // ... (restante do seu código de abrir vídeo e fechar)
});

var player;
// Esta função é chamada automaticamente pela API do YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('meuVideo', {
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Garante que o volume do player do YouTube esteja em 100%
    event.target.setVolume(100);
}

// No seu código de abrir o vídeo, adicione o unMute:
btnAbrir.addEventListener('click', () => {
    overlay.classList.remove('video-hide');
    musica.pause(); // Pausa a música de fundo

    if (player && player.unMute) {
        player.unMute();
        player.setVolume(100);
        player.playVideo();
    }
});