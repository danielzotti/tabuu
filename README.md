# Tabuu

**Tabuu** è un divertente e frenetico gioco di parole a squadre, ispirato al classico gioco da tavolo "Taboo". L'obiettivo del gioco è far indovinare ai propri compagni di squadra una parola misteriosa, guidandoli con degli indizi, ma facendo molta attenzione a non pronunciare una determinata lista di **"parole proibite"** (le parole tabù).

---

## 🎮 Come si gioca

### Preparazione

1. Dividetevi in due squadre (o più).
2. Scegliete quale squadra inizia e chi di quella squadra sarà il primo **Suggeritore**.
3. Gli altri membri della squadra avranno il ruolo di **Indovinatori**.
4. Un giocatore della squadra avversaria dovrà posizionarsi dietro o accanto al Suggeritore per controllare lo schermo, facendo l'**Arbitro**.

### Il Turno

1. Una volta cliccato su **"Inizia a Giocare"**, partirà un timer di 60 secondi (visibile in alto).
2. Sullo schermo apparirà una carta contente:
   - In grande: la **Parola da Indovinare**.
   - Sotto, in un riquadro: una lista di **Parole tabù** (Parole proibite).
3. Il Suggeritore deve fornire indizi vocali (parlando) ai propri Indovinatori per fargli indovinare la parola indicata in grande.
4. **ATTENZIONE:** Il Suggeritore **NON PUÒ** pronunciare:
   - La Parola da Indovinare stessa o parti di essa.
   - Nessuna delle parole tabù elencate nella carta.
   - Versioni modificate, diminutivi, plurali o traduzioni straniere delle parole proibite.
   - Gesti evidenti ed effetti sonori.

### Punteggi e Pulsanti in Gioco

Mentre il Suggeritore dà gli indizi, il controllore (l'Arbitro della squadra avversaria) gestisce i pulsanti dell'interfaccia:

- ✅ **Corretto (+1 Punto):** Gli Indovinatori pronunciano l'esatta parola misteriosa. L'Arbitro clicca il pulsante verde, la squadra guadagna un punto e appare automaticamente la carta successiva.
- ⏭️ **Passo (0 Punti):** La parola risulta troppo difficile. Il Suggeritore o l'Arbitro cliccano il pulsante per scartare la carta e passarne a una nuova senza perdere punti.
- ❌ **Tabuu (-1 Punto):** Il Suggeritore commette un errore o pronuncia inavvertitamente una parola proibita. L'Arbitro esclama "Tabù!" e preme il pulsante rosso. La squadra viene penalizzata di 1 punto, la carta viene annullata e si passa a quella successiva.

*(Novità: puoi anche mettere in pausa la partita cliccando l'icona Pausa vicino al timer, o fermare anzitempo il turno con il tasto Stop).*

### Fine del Turno e della Partita

- Quando il timer si esaurisce, il turno è terminato.
- Annotate o ricordate il punteggio ottenuto e passate il turno (e lo smartphone/computer) al Suggeritore della squadra successiva.
- Continuate ad alternarvi a piacimento finché lo stabilite, chiusura carte, o raggiungimento del punteggio target scelto da voi all'inizio.
- Al termine della partita, potrete ricominciare assicurandovi che le carte già uscite nella sessione **non vengano pescate di nuovo**.

---

## 💻 Tech Stack

Questo progetto Tabuu è sviluppato con tecnologie web all'avanguardia:

- **Framework:** Next.js 16 (App Router)
- **Linguaggio:** TypeScript
- **Stile e UI:** Tailwind CSS v4, Radix UI, Shadcn/ui
- **Icone:** Lucide React
- **Fetch dei dati:** TanStack React Query
- **Persistenza:** LocalStorage sincronizzato (se chiudi o ricarichi per errore, il tuo timer, i punti e la tua carta saranno ripristinati istantaneamente).

## 🚀 Avviare il progetto in locale

Se vuoi eseguire il progetto o contribuire allo sviluppo, sul tuo computer:

1. **Clona la repository**
2. **Installa le dipendenze:**

   ```bash
   npm install
   ```

3. **Avvia il server di sviluppo locale:**

   ```bash
   npm run dev
   ```

4. **Apri nel browser l'URL:**
   [http://localhost:3007](http://localhost:3007)

Buon divertimento! 🎉
