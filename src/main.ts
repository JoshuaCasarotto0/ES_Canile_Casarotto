type Fascia = "Cucciolo" | "Adulto" | "Anziano";
let ultimoNome: string = "";
let postiLiberi: number = 6;
let contaCane: number = 0;
let contaGatto: number = 0;
let contaConiglio: number = 0;

function registra(): void {
    let messaggio = document.getElementById("messaggio") as HTMLElement;
    let nome = String((document.getElementById("nome") as HTMLInputElement).value).trim();
    let specie = (document.getElementById("specie") as HTMLSelectElement).value;
    let taglia = (document.querySelector('input[name="taglia"]:checked') as HTMLInputElement)?.value;
    let etaTXT = String((document.getElementById("eta") as HTMLInputElement).value);
    let eta = Number((document.getElementById("eta") as HTMLInputElement).value);
    let vaccinato = (document.getElementById("vaccinato") as HTMLInputElement).checked;
    const immagine = document.getElementById("immagine") as HTMLImageElement;

    let fascia: Fascia = "Cucciolo";
    let tagliaT: string = "";
    let costo: number = 0;

    // Controlli
    if(nome == ""){
        messaggio.textContent = "Inserisci il nome dell'animale";
        return;
    }

    if(nome.toLowerCase() == ultimoNome.toLowerCase()){
        messaggio.textContent = nome + " è appena stata registrata";
        return;
    }

    if(specie == ""){
        messaggio.textContent = "Scegli la specie";
        return;
    }

    if(taglia == undefined){
        messaggio.textContent = "Scegli la taglia";
        return;
    }

    if(etaTXT == "" || Number.isNaN(eta) || eta < 0 || eta > 20 || !Number.isInteger(eta)){
        messaggio.textContent = "L'età deve essere un numero intero da 0 a 20";
        return;
    }

    messaggio.textContent = "";

    // Fascia d'età
    if(eta <= 1){
        fascia = "Cucciolo";
    }
    else if(eta <= 7){
        fascia = "Adulto";
    }
    else{
        fascia = "Anziano";
    }
    
    
    switch(specie){
        case "Cane":
            immagine.src = "img/cane.svg";
            immagine.alt = "Cane";
            contaCane += 1;
            break;

        case "Gatto":
            immagine.src = "img/gatto.svg";
            immagine.alt = "Gatto";
            contaGatto += 1;
            break;

        case "Coniglio":
            immagine.src = "img/coniglio.svg";
            immagine.alt = "Coniglio";
            contaConiglio += 1;
            break;
    }

    // Costo di adozione
    switch(taglia){
        case "P":
            tagliaT = "Piccola";
            costo = 40;
            break;

        case "M":
            tagliaT = "Media";
            costo = 60;
            break;

        case "G":
            tagliaT = "Grande";
            costo = 80;
            break;
    }

    if(fascia == "Anziano"){
        costo = costo / 2;
    }

    // Elenco
    const elencoPronti = document.getElementById("elenco-pronti") as HTMLUListElement;
    const elencoAttesa = document.getElementById("elenco-attesa") as HTMLUListElement;

    const riga: HTMLElement = document.createElement("li");

    riga.textContent = nome + " - " + specie + ", taglia " + tagliaT + " - " + eta + " anni (" + fascia + ") - " + costo + " € ";

    if(fascia == "Anziano" && vaccinato == false){
        riga.textContent = "URGENTE " + riga.textContent;
        riga.style.color = "red";
    }

    const link = document.createElement("a");
    link.href = "mailto:adozioni@canile.it?subject=" + encodeURIComponent("Informazioni su " + nome);
    link.textContent = "Chiedi info";
    riga.appendChild(link);

    if(vaccinato == true){
        elencoPronti.appendChild(riga);
    }
    else{
        elencoAttesa.appendChild(riga);
    }

    // Tabella
    const cella1= document.getElementById("conta_cane") as HTMLTableCellElement;
    const cella2 = document.getElementById("conta_gatto") as HTMLTableCellElement;
    const cella3 =document.getElementById("conta_coniglio") as HTMLTableCellElement;
    cella1.textContent = String(contaCane);
    cella2.textContent = String(contaGatto);
    cella3.textContent = String(contaConiglio);

    // Specie più ospitata
    const piuOspitata = document.getElementById("piu-ospitata") as HTMLElement;

    if(contaCane > contaGatto && contaCane > contaConiglio){
        piuOspitata.textContent = "Specie più ospitata: Cane";
    }
    else if(contaGatto > contaCane && contaGatto > contaConiglio) {
        piuOspitata.textContent = "Specie più ospitata: Gatto";
    }
    else if(contaConiglio > contaCane && contaConiglio > contaGatto) {
        piuOspitata.textContent = "Specie più ospitata: Coniglio";
    }
    else{
        piuOspitata.textContent = "Nessuna specie prevale";
    }

    // Posti disponibili
    postiLiberi -= 1;

    const posti = document.getElementById("posti") as HTMLElement;
    const pulsante = document.getElementById("registra") as HTMLButtonElement;

    if(postiLiberi == 0){
        posti.textContent = "Canile al completo";
        pulsante.disabled = true;
    }
    else{
        posti.textContent = "Posti liberi: " + postiLiberi;
    }

    ultimoNome = nome;
}
