// =============================================
// TAB ORIZZONTALI — Discipline
// =============================================

function mostraTab(nomeTab, bottoneCliccato) {
    // cerca tutti i pannelli di contenuto e nasconde quello attualmente visibile
    const pannelli = document.querySelectorAll('.tab-pannello');
    pannelli.forEach(function(pannello) {
        pannello.classList.remove('attivo');
    });

    // cerca tutti i bottoni e toglie il colore giallo da quello attivo
    const bottoni = document.querySelectorAll('.tab-btn');
    bottoni.forEach(function(btn) {
        btn.classList.remove('attivo');
    });

    // mostra il pannello corrispondente alla voce cliccata
    document.getElementById('tab-' + nomeTab).classList.add('attivo');

    // colora di giallo il bottone cliccato
    bottoneCliccato.classList.add('attivo');
}
