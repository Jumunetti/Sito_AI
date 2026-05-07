/* =============================================
   script.js — Script principale
   Sito: Oltre l'Orbita — Missioni NASA
   Progetto didattico — Informatica
   ============================================= */

// =============================================
// 1. ANIMAZIONE DI ENTRATA DELLE SEZIONI
//    Usa IntersectionObserver per rilevare
//    quando una scheda entra nel viewport
// =============================================

// Seleziona tutte le sezioni con classe "scheda"
const schede = document.querySelectorAll('.scheda');

// Configura l'osservatore:
// - threshold: 0.15 = scatta quando il 15% della scheda è visibile
const opzioniOsservatore = {
  threshold: 0.15
};

// Crea l'osservatore che aggiunge la classe "visibile"
const osservatore = new IntersectionObserver(function (voci) {
  voci.forEach(function (voce) {

    // Se l'elemento è entrato nel campo visivo
    if (voce.isIntersecting) {

      // Aggiunge la classe CSS che attiva la transizione di entrata
      voce.target.classList.add('visibile');

      // Smette di osservare (l'animazione scatta una volta sola)
      osservatore.unobserve(voce.target);
    }
  });
}, opzioniOsservatore);

// Avvia l'osservazione su ogni scheda
schede.forEach(function (scheda) {
  osservatore.observe(scheda);
});


// =============================================
// 2. EVIDENZIAZIONE LINK AGENDA DURANTE LO SCROLL
//    Segna come "attivo" il link dell'agenda
//    che corrisponde alla sezione visibile
// =============================================

// Seleziona tutti i link presenti nell'agenda
const linkAgenda = document.querySelectorAll('#agenda a');

// Seleziona tutte le sezioni che hanno un id (ancore)
const sezioni = document.querySelectorAll('section[id]');

// Funzione che aggiorna il link attivo in base alla posizione
function aggiornaLinkAttivo() {

  // Posizione attuale dello scroll verticale
  const scrollY = window.scrollY;

  // Scorre ogni sezione per capire quale è visibile
  sezioni.forEach(function (sezione) {

    // Altezza a cui inizia la sezione (dall'alto della pagina)
    const inizio = sezione.offsetTop - 120;

    // Altezza a cui finisce la sezione
    const fine   = inizio + sezione.offsetHeight;

    // Trova il link nell'agenda che punta a questa sezione
    const linkCorrispondente = document.querySelector(
      '#agenda a[href="#' + sezione.id + '"]'
    );

    // Se lo scroll è dentro questo intervallo E il link esiste
    if (scrollY >= inizio && scrollY < fine && linkCorrispondente) {

      // Rimuove "attivo" da tutti i link
      linkAgenda.forEach(function (l) {
        l.classList.remove('attivo');
      });

      // Aggiunge "attivo" solo al link corrispondente
      linkCorrispondente.classList.add('attivo');
    }
  });
}

// Ascolta l'evento scroll e chiama la funzione ad ogni movimento
window.addEventListener('scroll', aggiornaLinkAttivo);

// Esegui subito al caricamento (per impostare lo stato iniziale)
aggiornaLinkAttivo();


// =============================================
// 3. SFONDO STELLATO DINAMICO
//    Crea piccole stelle casuali sullo sfondo
//    usando canvas HTML5
// =============================================

// Crea un elemento canvas (tela di disegno)
const canvas  = document.createElement('canvas');
const contesto = canvas.getContext('2d');  // accesso agli strumenti di disegno 2D

// Stile del canvas: fisso, dietro tutto il contenuto
canvas.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
`;

// Aggiunge il canvas come primo figlio del body
document.body.prepend(canvas);

// Variabile che conterrà le stelle
let stelle = [];

// Funzione che adatta il canvas alla dimensione della finestra
function ridimensionaCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  creaStelle();  // ricrea le stelle dopo il ridimensionamento
}

// Funzione che genera un array di stelle con posizioni casuali
function creaStelle() {
  stelle = [];

  const numero = Math.floor((canvas.width * canvas.height) / 8000);

  for (let i = 0; i < numero; i++) {
    stelle.push({
      x:         Math.random() * canvas.width,     // posizione X casuale
      y:         Math.random() * canvas.height,    // posizione Y casuale
      raggio:    Math.random() * 1.2 + 0.3,        // dimensione (0.3 – 1.5 px)
      opacita:   Math.random() * 0.6 + 0.2,        // trasparenza (0.2 – 0.8)
      velocita:  Math.random() * 0.005 + 0.001     // velocità del lampeggio
    });
  }
}

// Funzione di animazione: ridisegna le stelle ad ogni frame
function animaStelle() {
  // Pulisce il canvas ad ogni frame
  contesto.clearRect(0, 0, canvas.width, canvas.height);

  stelle.forEach(function (stella) {
    // Aggiorna l'opacità per il lampeggio
    stella.opacita += stella.velocita;

    // Inverte la direzione quando raggiunge i limiti
    if (stella.opacita > 0.8 || stella.opacita < 0.1) {
      stella.velocita *= -1;
    }

    // Disegna la stella come cerchio bianco
    contesto.beginPath();
    contesto.arc(stella.x, stella.y, stella.raggio, 0, Math.PI * 2);
    contesto.fillStyle = `rgba(200, 230, 255, ${stella.opacita})`;
    contesto.fill();
  });

  // Richiede il prossimo frame di animazione (loop)
  requestAnimationFrame(animaStelle);
}

// Aggiorna il canvas se l'utente ridimensiona la finestra
window.addEventListener('resize', ridimensionaCanvas);

// Avvia tutto
ridimensionaCanvas();
animaStelle();


// =============================================
// 4. MESSAGGIO DI BENVENUTO NELLA CONSOLE
//    Utile per i test durante lo sviluppo
// =============================================

console.log('%c🚀 Oltre l\'Orbita — Script caricato correttamente!', 
  'color: #e8c84a; font-family: monospace; font-size: 14px;');

console.log('Sezioni trovate:', sezioni.length);
console.log('Link agenda:', linkAgenda.length);
