// =============================================
// GALLERIA SCROLLABLE — Coppa Italia Regioni
// =============================================

let slideCorrente = 0;

function getFotoPerVolta() {
    // 1 foto su mobile, 3 su desktop
    return window.innerWidth <= 768 ? 1 : 3;
}

function getTotaleSlide() {
    return document.querySelectorAll('.gallery-slide').length;
}

function getTotalePagine() {
    return Math.ceil(getTotaleSlide() / getFotoPerVolta());
}

function inizializzaGalleria() {
    const dotsContainer = document.getElementById('galleryDots');
    if (!dotsContainer) return;

    // Svuota e ricrea i puntini
    dotsContainer.innerHTML = '';
    const totalePagine = getTotalePagine();

    for (let i = 0; i < totalePagine; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('attivo');
        dot.addEventListener('click', function() {
            slideCorrente = i;
            aggiornaGalleria();
        });
        dotsContainer.appendChild(dot);
    }

    slideCorrente = 0;
    aggiornaGalleria();
}

function scorriGalleria(direzione) {
    const totalePagine = getTotalePagine();
    slideCorrente += direzione;

    // Ciclo infinito
    if (slideCorrente < 0) slideCorrente = totalePagine - 1;
    if (slideCorrente >= totalePagine) slideCorrente = 0;

    aggiornaGalleria();
}

function aggiornaGalleria() {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.dot');
    const fotoPerVolta = getFotoPerVolta();
    const totaleSlide = getTotaleSlide();

    // Mostra/nascondi le slide in base alla pagina corrente
    slides.forEach(function(slide, i) {
        const inizio = slideCorrente * fotoPerVolta;
        const fine = inizio + fotoPerVolta;
        if (i >= inizio && i < fine) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });

    // Aggiorna i puntini
    dots.forEach(function(dot, i) {
        dot.classList.toggle('attivo', i === slideCorrente);
    });

    // Mostra/nascondi le frecce in base alla posizione
    const frecciaSinistra = document.querySelector('.gallery-arrow.sinistra');
    const frecciaDestra   = document.querySelector('.gallery-arrow.destra');
    const totalePagine = getTotalePagine();

    if (frecciaSinistra) frecciaSinistra.style.visibility = slideCorrente === 0 ? 'hidden' : 'visible';
    if (frecciaDestra)   frecciaDestra.style.visibility   = slideCorrente === totalePagine - 1 ? 'hidden' : 'visible';
}

// Ricalcola se si ridimensiona la finestra
window.addEventListener('resize', inizializzaGalleria);

// Avvia quando la pagina è pronta
document.addEventListener('DOMContentLoaded', inizializzaGalleria);
