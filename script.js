// =============================================
// TAB ORIZZONTALI — Discipline
// =============================================

function mostraTab(nomeTab, bottoneCliccato) {
    // Nascondi tutti i pannelli
    const pannelli = document.querySelectorAll('.tab-pannello');
    pannelli.forEach(function(pannello) {
        pannello.classList.remove('attivo');
    });

    // Rimuovi "attivo" da tutti i bottoni
    const bottoni = document.querySelectorAll('.tab-btn');
    bottoni.forEach(function(btn) {
        btn.classList.remove('attivo');
    });

    // Mostra il pannello selezionato
    document.getElementById('tab-' + nomeTab).classList.add('attivo');

    // Attiva il bottone cliccato
    bottoneCliccato.classList.add('attivo');
}
