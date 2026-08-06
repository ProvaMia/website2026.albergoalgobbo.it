# Piano di Refactor — Albergo Al Gobbo

> **Scopo del documento.** Questo piano guida lo sviluppo del refactor di
> `albergoalgobbo.it` sul boilerplate brochure 2026. Ogni istanza di lavoro
> (skill o agent) DEVE leggere prima la sezione condivisa **§0 Sistema grafico
> generale**, che definisce linguaggio visivo, componenti, media, i18n e fix
> SEO/accessibilità validi per tutto il sito.
>
> **Stack di destinazione.** React 19 + Vite + TypeScript, Tailwind v4,
> react-i18next, react-router v7. Monorepo pnpm + Turbo. Le pagine sono
> componenti in `apps/frontend/src/pages/` (da creare), montate tramite
> `LanguageRouter.tsx`, con rotte localizzate in `src/i18n/routes.ts`.
>
> **Sito di riferimento.** `https://albergoalgobbo.it` — i contenuti derivano
> dall'audit eseguito in precedenza (`analysis/docs/company_summary.md` e
> `analysis/media/`).
>
> **Richiesta specifica del cliente.** La pagina **Camere** del sito originale
> viene sostituita da una pagina **Prenota**, che include un form di ricerca
> (date + numero di persone) e la lista delle camere filtrate per disponibilità
> e capienza. La home page avrà una hero a tutto schermo con le immagini WebP
> già preparate in `analysis/media/heros/`.

---

## §0 — Sistema grafico generale (LEGGERE PRIMA, vale per tutte le pagine)

### 0.1 Identità & tono

- **Brand:** Albergo Al Gobbo — hotel a conduzione familiare nel cuore di
  Venezia (Cannaregio / Campo San Geremia), attivo dal 1930, una stella.
- **Tono di voce:** caldo, accogliente, familiare, autentico. Pilastri:
  *storia, pulizia, posizione centrale, accoglienza personale*.
- **Narrativa portante:** "a casa, nel cuore di Venezia" — piccolo albergo
  gestito dalla stessa famiglia da tre generazioni, a due passi dalla stazione.
- **Posizionamento visivo:** veneziano classico e contemporaneo. Tonalità
  calde e naturali (avorio, oro antico, mattone spento) alternate a blocchi
  scuri (`night`, inchiostro) che ricordano i canali e la notte veneziana.
  Niente effetto "template", niente colori elettrici.

### 0.2 Palette (derivata dalle immagini hero)

Le hero mostrano uno sfondo **avorio caldo**, un disegno architettonico in
**grigio-seppia / inchiostro** e accenti **dorati** sulle cupole e sui
fregi. La palette riflette questi toni: niente colori accesi, niente blu
notte canonico. L'unico punto caldo è il **mattone/brick spento** usato per
i CTA principali, in modo da essere visibile senza rompere l'armonia.

| Ruolo | Token | Valore baseline | Uso |
|---|---|---|---|
| Avorio | `--color-ivory` | `#F5F0E6` | sfondo principale, hero chiara, sezioni chiare |
| Crema | `--color-cream` | `#FAF7F0` | sfondi alternati, card chiare |
| Sabbia | `--color-sand` | `#E8E2D4` | card, bordi morbidi, sfondi secondari |
| Pietra | `--color-stone` | `#CFC8B8` | separatori, bordi, linee sottili |
| Inchiostro | `--color-ink` | `#2C241B` | testo principale su chiaro, disegni |
| Inchiostro soft | `--color-ink-soft` | `#5A5247` | testo secondario |
| Grigio testo | `--color-muted` | `#7A7265` | didascalie, caption |
| Oro antico | `--color-gold` | `#B8954A` | accenti, dettagli, icone, CTA secondari |
| Oro profondo | `--color-gold-deep` | `#8A6D2F` | hover su oro |
| Mattone | `--color-brick` | `#A65D48` | CTA primari, pulsanti principali, link attivi |
| Mattone scuro | `--color-brick-deep` | `#854A39` | hover su CTA primari |
| Notte veneziana | `--color-night` | `#1C2230` | sfondi scuri, footer, hero scure |
| Notte soft | `--color-night-soft` | `#2A3345` | sezioni scure alternate, hover |
| Bianco | `--color-white` | `#FFFFFF` | testo su scuro, sfondi puliti |

- Definire i token in `apps/frontend/src/index.css` come variabili CSS +
  mappatura Tailwind v4 `@theme`.
- Contrasto: testo principale ≥ 4.5:1. Su sfondo `night` usare testo bianco;
  su sfondo `ivory`/`cream` usare `ink`.
- Usare `gold` come accento su sfondi scuri e chiari; evitare combinazioni
  `gold` su `sand` per basso contrasto.
- Usare `useBackgroundContrast` (hook già esistente) dove header/nav si
  sovrappone a immagini/hero.

### 0.3 Tipografia

- **Display/Titoli:** un serif elegante e veneziano (es. *Cormorant Garamond*,
  *Playfair Display* o *Libre Baskerville*) per H1/H2 e numeri evidenza.
- **Testo/UI:** un sans geometrico pulito (es. *Inter*) per body, nav, label,
  form.
- **Etichette/uppercase:** usare tracking ampio (`tracking-widest`,
  `uppercase`, `text-xs`) per occhielli e label di sezione, in colore `gold`
  o `muted`.
- Scala fluida (`clamp()`): H1 ~ `clamp(2.5rem, 5vw, 4.5rem)`, H2 ~
  `clamp(1.75rem, 3.5vw, 2.75rem)`, body 1rem/1.125rem, line-height 1.6–1.7.
- Caricare i font self-hosted o via `@fontsource`; evitare blocchi di
  rendering (`font-display: swap`).

### 0.4 Griglia, spaziature, layout

- Container max-width ~ `1200px`, padding laterale `clamp(1rem, 5vw, 4rem)`.
- Ritmo verticale a sezioni: padding verticale `clamp(4rem, 8vw, 7rem)`.
- Alternare sfondi `cream` ↔ `white` ↔ blocco scuro `night` per scandire la
  lettura.
- Mobile-first. Breakpoint Tailwind standard. Griglie responsive (1→2→3 col).
- Linee sottili `stone/30` come separatori tra sezioni.

### 0.5 Header / Navigazione (componente condiviso)

- Header già presente in `src/components/layout/Header.tsx` — estenderlo, non
  duplicarlo.
- **Logo:** usare solo il marchio grafico `logos/logo-al-gobbo-soloimg.png`
  (la maschera / gobbo), senza testo. A sinistra, dimensioni `h-8 md:h-10`.
- **Voci nav centrali (centrate a schermo):**
  - **Home**
  - **Chi siamo** (`/it/chi-siamo`, `/en/about`)
  - **Galleria** (`/it/galleria`, `/en/gallery`)
  - **Contatti** (`/it/contatti`, `/en/contacts`)
- **Prenota** NON compare nella nav centrale: diventa un **pulsante outline**
  (`border-ink`, testo `ink`, hover `bg-ink text-white`) posizionato a destra
  accanto al selettore lingua.
- Layout a tre colonne flessibili (`flex-1 | flex-none | flex-1`) per mantenere
  la nav centrale perfettamente centrata e bilanciare le parti laterali.
- Selettore lingua: usare `LanguageSelector.tsx` esistente. Navigazione
  localizzata via `LocalizedLink.tsx`.
- Header trasparente sulla hero home, poi solido `cream` con bordo sottile allo
  scroll. Sulle pagine con hero chiaro può restare trasparente o passare a
  `cream`.

### 0.6 Footer (componente condiviso)

- Creare `src/components/layout/Footer.tsx`.
- Contatti:
  - Indirizzo: Campo San Geremia 312, Cannaregio, 30121 Venezia
  - Tel: `+39 041 715125` (click-to-call `tel:+39041715125`) — verificare con
    il cliente, usare come baseline
  - Email: `info@albergoalgobbo.it` (`mailto`) — verificare con il cliente
- Link rapidi: Home, Prenota, Chi siamo, Galleria, Contatti, Privacy.
- Link legali: Privacy + Cookie (gestione cookie via `CookieConsentContext`
  già presente).
- Firma: "Albergo Al Gobbo — Famiglia Vinco".
- Sfondo `night`, testo `white`/grigio chiaro, link in `gold`.

### 0.7 Componenti UI ricorrenti (creare in `src/components/ui/` riutilizzabili)

- `Hero` — hero con/senza immagine, titolo serif, sottotitolo, CTA.
  - **Home:** immagine full-bleed WebP da `public/media/heros/`, nessun testo
    sovrapposto, ancorata in basso (`object-bottom`), decorazioni agli angoli
    sopra l’header.
  - **Pagine interne:** NO immagini. Hero a schermo intero o a 40–60vh su
    sfondo `ivory`/`cream` con disegno decorativo sottile (linee, stelle,
    angoli in `ink/25` e `gold`). H1 serif + sottotitolo descrittivo.
- `HeroCornerDecoration` — angolo ornamentale SVG fine-line (linee sottili,
  stella dorata, puntini). Usato sulla home e, in versione più elaborata,
  sulle pagine interne. Nascosto su mobile. Posizionato agli angoli superiori
  anche nello spazio dell’header (`z` sopra l’header, `pointer-events-none`).
- `SectionHeading` — occhiello uppercase tracking-wide + H2 serif +
  paragrafo intro (opzionale).
- `FeatureCard` — icona + titolo + descrizione breve. Stile pulito, bordo
  sottile `sand`, hover con sollevamento e accento `brick`.
- `RoomCard` — immagine, nome camera, capienza, servizi, prezzo da, CTA
  "Richiedi prenotazione" / "Prenota". Usato nella pagina Prenota.
- `BookingForm` — form con date, adulti, bambini, pulsante cerca. Usato nella
  pagina Prenota.
- `CtaBanner` — blocco scuro `night` con testo `white` e CTA.
- `InfoCard` — elenco contatti/orari con icone.
- `ContactForm` — componente form già pianificato; va integrato nella pagina
  Contatti.
- `PageMeta` — gestione titolo/meta/og/JSON-LD per pagina.
- `ImageGallery` — griglia/lightbox per la pagina Galleria.
- Motion: usare `framer-motion` per fade/slide-in discreti on-scroll
  (`prefers-reduced-motion` rispettato). Niente animazioni invadenti.

### 0.8 Media disponibili (`analysis/media/`)

- **Hero home:** WebP in `analysis/media/heros/` — copiare in
  `apps/frontend/public/media/heros/` mantenendo i nomi puliti:
  - Desktop: `al_gobbo_1280.webp`, `al_gobbo_1920.webp`,
    `al_gobbo_2560.webp`, `al_gobbo_3840.webp`
  - Mobile: `hero-light-logo-v-810.webp`, `hero-light-logo-v-1080.webp`,
    `hero-light-logo-v-1215.webp`
- **Logo:** `logos/logo-al-gobbo-soloimg.png` (marchio grafico usato in header),
  `logos/logo-al-gobbo-B.png`, `logos/logo-al-gobbo-BIANCO.png`,
  `logos/logo-al-gobbo2-2.jpg`.
- **Favicon:** `favicon/cropped-logo-al-gobbo-512-*.jpg`.
- **Camere:** usare le foto specifiche per tipologia (vedi § Prenota).
- **Galleria:** tutte le foto in `analysis/media/images/` relative ad ambienti,
  esterni, colazione, hall.
- **Attrazioni:** foto in `analysis/media/images/` di luoghi veneziani (Rialto,
  San Marco, Ghetto, Ponte delle Guglie, Stazione S. Lucia, Palazzo Ducale,
  Ponte dei Sospiri, Piazzale Roma, Campo S. Geremia).
- **Icone servizi:** `images/wf.png`, `images/wifi-signal.jpg`,
  `images/air-conditioner.png`, `images/hot-weather.png`,
  `images/restaurant-1.png`, `images/rooms-1.png`, `images/dog.png`,
  `images/pulizie-e1670003932870.jpg` (da convertire in icone Lucide o SVG
  coerenti dove possibile).
- Copiare i media usati in `apps/frontend/public/media/` con nomi puliti;
  aggiornare i riferimenti.
- **Ogni `<img>` DEVE avere `alt` descrittivo**.

### 0.9 i18n

- Lingue: IT (default) ed EN. Testi in
  `apps/frontend/public/locales/{it,en}/common.json` con namespace per pagina
  (`home.*`, `booking.*`, `about.*`, `gallery.*`, `contacts.*`, `privacy.*`).
- Aggiungere ogni nuova rotta in `src/i18n/routes.ts` (vedi §0.10) e tradurre
  slug + contenuti.
- Nessuna stringa hardcoded nei componenti: usare `useTranslation()`.

### 0.10 Rotte localizzate (aggiungere a `src/i18n/routes.ts`)

| key | it | en |
|---|---|---|
| `home` | `''` | `''` |
| `booking` | `prenota` | `book` |
| `about` | `chi-siamo` | `about` |
| `gallery` | `galleria` | `gallery` |
| `contacts` | `contatti` | `contacts` |
| `privacy` | `privacy` | `privacy` |

Montare le nuove pagine in `LanguageRouter.tsx` (sostituendo i placeholder
attuali).

### 0.11 Dati statici — Camere (`src/data/rooms.ts`)

Creare un file TypeScript con i dati delle camere. Ogni camera ha:

```ts
export interface Room {
  id: string
  slug: string
  name: { it: string; en: string }
  description: { it: string; en: string }
  images: string[] // percorsi relativi a /media/
  capacity: { adults: number; children: number; total: number }
  bedType: { it: string; en: string }
  bathroom: { it: string; en: string } // 'privato', 'esterno', 'condiviso'
  services: string[] // chiavi i18n o etichette
  priceFrom: number // prezzo indicativo per notte, baseline
  sqm?: number
}
```

Camere da includere (dall'audit del sito originale):

1. **Comfort AC** — matrimoniale/doppia, bagno privato, aria condizionata,
   WiFi.
2. **Standard Doppia** — doppia, bagno privato.
3. **Basic con AC (wc esterno)** — doppia, aria condizionata, wc esterno.
4. **Economy Doppia** — soluzione economica per due persone.
5. **Standard Singola con bagno** — singola, bagno privato.
6. **Economy Singola con bagno condiviso** — singola economica, bagno
   condiviso.

Le immagini delle camere vanno scelte tra i file `analysis/media/images/`
che iniziano per `camera-*`, `economy-*`, `standard-*`, `comfort-*`, ecc.

### 0.12 Fix SEO & Accessibilità globali (OBBLIGATORI su ogni pagina)

- ✅ **Alt text** su tutte le immagini.
- ✅ **Un solo `<h1>` per pagina**.
- ✅ **Viewport:** consentire lo zoom; nessun `user-scalable=0` /
  `maximum-scale`.
- ✅ **`rel="noopener noreferrer"`** su tutti i `target="_blank"`.
- ✅ **Skip-link** "Vai al contenuto" + landmark semantici
  (`<header> <main> <footer> <nav>`).
- ✅ **Meta description + og:description** su ogni pagina.
- ✅ `canonical` + JSON-LD (`LodgingBusiness` o `Hotel` con indirizzo,
  telefono, email).
- ✅ Form con validazione client e stati di errore/success accessibili.
- ✅ `lang` corretto per documento (it-IT / en).

---

## PAGINA — Home (`/`)

- **Rotta:** `home` · **Componente:** `src/pages/Home.tsx`
- **Ruolo:** vetrina emozionale dell'albergo. Deve trasmettere immediatamente
  posizione, calore familiare, storia e semplicità.
- **Contenuto:** hero full-bleed WebP; sezione "Benvenuti"; anteprime camere
  con link a Prenota; servizi; posizione; recensioni.
- **Media:** hero WebP da `public/media/heros/`; foto hall/camere/colazione;
  icone servizi.
- **i18n:** `home.*` · **SEO/a11y:** H1 nascosto visivamente o nella sezione
  Benvenuti; alt su immagini; JSON-LD `LodgingBusiness`.
- **Done quando:** hero full-bleed funzionante, sezioni principali visibili,
  link a Prenota funzionante, build verde.

### Layout & visual (Home)

- **Atmosfera:** veneziana, accogliente, leggermente cinematografica. L'hero a
  tutto schermo stabilisce subito il senso di "essere a Venezia".
- **Header:** logo solo maschera (`logo-al-gobbo-soloimg.png`) a sinistra; nav
  centrale con Home / Chi siamo / Galleria / Contatti; pulsante “Prenota” +
  selettore lingua a destra.
- **Hero (100dvh, full-bleed):**
  - Immagine WebP responsive con `srcset`, ancorata in basso
    (`object-cover object-bottom`). Se l’immagine è più alta della viewport,
    viene tagliata solo nella parte alta.
  - Nessun testo, logo o pulsante sovrapposto sulla hero.
  - Decorazioni `HeroCornerDecoration` negli angoli superiori (anche nello
    spazio dell’header), nascoste su mobile.
- **NO stats bar sotto l’hero.**
- **Sezione "Benvenuti" (sfondo `ivory`):** `SectionHeading` con occhiello
  "Benvenuti" + H2 "Un piccolo albergo, una grande accoglienza" + paragrafo
  tratto da `company_summary.md` (fondato nel 1930, gestione familiare,
  posizione centrale). Layout 2 colonne: testo a sx, immagine hall/cortile a
  dx.
- **Sezione camere in evidenza (sfondo `cream`):** 2→3 card `RoomCard`
  compatte con le camere principali (Comfort AC, Standard Doppia, Economy
  Singola). Ogni card ha immagine, nome, capienza, prezzo da, link "Vedi
  tutte le camere" verso `/it/prenota`.
- **Sezione servizi (sfondo `ivory`):** griglia 2→3 `FeatureCard` con icone
  Lucide coerenti; ogni card ha titolo e descrizione distinti (non duplicati).
- **Sezione posizione (sfondo `cream`):** breve testo + immagine. CTA "Come
  raggiungerci" verso `/it/contatti`.
- **Sezione recensioni (sfondo `night`, testo chiaro):** 2–3 testimonianze con
  foto avatar (`recensioni-*.png`) e stelline. Occhiello "Dicono di noi".
- **NO banner CTA finale** "Pronto per vivere Venezia?".
- **Footer:** come da §0.6.
- **Motion:** fade-in sezioni allo scroll; hero statica; numeri/barra evidenze
  assenti.

---

## PAGINA — Prenota (`/prenota`)

- **Rotta:** `booking` (en `book`) · **Componente:** `src/pages/Booking.tsx`
- **Ruolo:** sostituisce la pagina Camere del sito originale. Permette di
  cercare disponibilità per date e numero di ospiti, mostrando le camere
  compatibili.
- **Contenuto:** hero chiaro decorato, form di ricerca, lista camere filtrate,
  CTA contatti per conferma.
- **Media:** foto specifiche per ogni camera (nessuna hero image).
- **i18n:** `booking.*` · **SEO/a11y:** un H1; label associate ai campi del
  form; stati di errore/success accessibili; card camera con heading gerarchico
  corretto.
- **Done quando:** form valida date e ospiti, filtro per capienza funzionante,
  card camere complete, CTA "Richiedi prenotazione" apre modal/form contatto,
  build verde.

### Layout & visual (Prenota)

- **Atmosfera:** funzionale ma calda. Focus sulla chiarezza del processo di
  ricerca e sulla leggibilità delle camere.
- **Hero (100dvh o 60vh, senza immagine):** sfondo `ivory` con decorazioni
  `HeroCornerDecoration` più elaborate agli angoli superiori. H1 serif
  "Prenota il tuo soggiorno" + sottotitolo "Scegli le date e trova la camera
  perfetta per la tua Venezia". Palette: sfondo avorio, testo `ink`, accenti
  `gold` nelle decorazioni.
- **Form di ricerca (sticky o in evidenza sotto l'hero, sfondo `white` con
  ombra):**
  - Campi in riga responsive:
    - **Check-in** — input type `date`, obbligatorio, default domani.
    - **Check-out** — input type `date`, obbligatorio, default dopodomani.
    - **Adulti** — select/number, min 1, max 4, default 2.
    - **Bambini** — select/number, min 0, max 3, default 0.
  - Pulsante "Cerca disponibilità" (`brick` pieno).
  - Validazioni:
    - check-out > check-in;
    - totale ospiti (adulti + bambini) ≥ 1;
    - date non nel passato.
  - Stato "iniziale" mostra tutte le camere (o un messaggio invito a
    compilare). Stato "cercato" filtra per capienza totale ≥ ospiti totali.
- **Lista camere (sfondo `cream`):**
  - Griglia 1→2 colonne di `RoomCard`.
  - Ogni card include:
    - Galleria miniatura (1–3 foto) con possibilità di swipe/click.
    - Nome camera (H3).
    - Descrizione breve (2–3 righe).
    - Capienza: icone + testo "2 adulti" / "1 adulto + 1 bambino" ecc.
    - Servizi: icone piccole (WiFi, AC, bagno, …).
    - Prezzo "da €XX / notte" (indicativo).
    - Pulsante "Richiedi prenotazione" che apre un form/modal o scrolla alla
      sezione contatto rapido.
  - Se nessuna camera soddisfa i filtri, mostrare messaggio: "Nessuna camera
    disponibile per la combinazione scelta. Contattaci per una soluzione
    personalizzata." + CTA telefono/email.
- **Disclaimer (testo piccolo `muted`):** "Le disponibilità sono indicative.
  Riceverai conferma della prenotazione tramite email o telefono." — i18n
  `booking.disclaimer`.
- **Sezione "Hai bisogno di aiuto?" (sfondo `white`):** `InfoCard` con
  telefono, email, orari. CTA "Contattaci".
- **Motion:** fade-in card allo scroll; transizione discreta al filtrare le
  camere (layout shift minimo).

### Logica di filtro (frontend)

- I dati delle camere sono statici in `src/data/rooms.ts`.
- Il filtro calcola:
  - `totalGuests = adults + children`
  - `nights = differenceInDays(checkOut, checkIn)`
- Una camera è compatibile se `room.capacity.total >= totalGuests`.
- Se `children > 0`, preferire camere che esplicitamente accettano bambini
  (flag opzionale nel dato).
- Il prezzo stimato mostrato è `priceFrom * nights`.
- Non c'è backend di booking reale: il pulsante "Richiedi prenotazione" apre
  un form di richiesta con i dati già precompilati (date, camera, ospiti) o
  invia a `/it/contatti` con query params.

---

## PAGINA — Chi siamo (`/chi-siamo`)

- **Rotta:** `about` (en `about`) · **Componente:** `src/pages/About.tsx`
- **Ruolo:** raccontare la storia dell'albergo, la famiglia Vinco, i valori
  di pulizia e accoglienza.
- **Contenuto:** hero chiaro decorato, storia, generazioni, punti di forza,
  premio ricevuto, CTA Prenota.
- **Media:** foto storiche o `chi-siamo.jpg`, `corona-anni-4.png`, foto
  famiglia/camere.
- **i18n:** `about.*` · **SEO/a11y:** un H1; alt su immagini.
- **Done quando:** storia completa, build verde.

### Layout & visual (Chi siamo)

- **Hero (100dvh o 50vh, senza immagine):** sfondo `ivory` con decorazioni
  `HeroCornerDecoration` più elaborate agli angoli superiori. H1 serif "La
  nostra storia" + sottotitolo "Tre generazioni di accoglienza veneziana".
  Palette coerente con la home: avorio, inchiostro, oro.
- **Sezione storia (sfondo `cream`):** layout 2 colonne. Testo a sx: "L'Albergo
  Al Gobbo nasce nel 1930 dalla Signora Maria Vinco…" (da
  `company_summary.md`). Immagine `chi-siamo.jpg` o foto hall a dx.
- **Sezione generazioni (sfondo `white`):** timeline orizzontale semplificata
  (1930 → oggi) con 3 milestone.
- **Sezione punti di forza (sfondo `cream`):** 3 `FeatureCard`:
  - Posizione strategica
  - Pulizia e cura
  - Atmosfera familiare
- **Sezione riconoscimento (sfondo `white`):** "Premio Di Servizio Eccezionale"
  da Gohotels.com con `corona-anni-4.png` o icona trofeo.
- **CTA finale:** banner `brick` "Prenota il tuo soggiorno".

---

## PAGINA — Galleria (`/galleria`)

- **Rotta:** `gallery` (en `gallery`) · **Componente:** `src/pages/Gallery.tsx`
- **Ruolo:** mostrare gli ambienti dell'albergo, le camere, la colazione, la
  hall e gli esterni.
- **Contenuto:** hero chiaro decorato, filtri per categoria, griglia immagini,
  lightbox.
- **Media:** foto in `analysis/media/images/` (escludere icone, mappe,
  avatar, bandiere).
- **i18n:** `gallery.*` · **SEO/a11y:** un H1; alt descrittivi; lightbox
  navigabile da tastiera.
- **Done quando:** griglia responsive, lightbox funzionante, build verde.

### Layout & visual (Galleria)

- **Hero (100dvh o 40vh, senza immagine):** sfondo `ivory` con decorazioni
  `HeroCornerDecoration` più elaborate agli angoli superiori. H1 serif
  "Galleria" + sottotitolo "Scopri gli ambienti del nostro albergo". Palette
  coerente con la home.
- **Filtri categoria (sfondo `white`):** pillole/button:
  - Tutte
  - Camere
  - Hall & Reception
  - Colazione
  - Esterni
  - Dettagli
- **Griglia immagini (sfondo `cream`):** masonry o griglia responsive 2→3→4
  colonne. Ogni immagine ha `loading="lazy"` e `alt` descrittivo.
- **Lightbox:** click sull'immagine per aprirla a schermo intero con frecce
  prev/next, chiusura con ESC/click fuori, didascalia sotto.
- **Motion:** fade-in immagini allo scroll; lazy load.

---

## PAGINA — Contatti (`/contatti`)

- **Rotta:** `contacts` (en `contacts`) · **Componente:** `src/pages/Contacts.tsx`
- **Ruolo:** fornire tutti i canali di contatto e raccogliere richieste tramite
  form.
- **Contenuto:** hero chiaro decorato, dati contatto, form, mappa.
- **Media:** nessuna hero image; possibile immagine della facciata/calle.
- **i18n:** `contacts.*` · **SEO/a11y:** un H1; label associate ai campi form;
  stati di errore/success accessibili.
- **Done quando:** form funzionante, dati sede corretti, mappa caricata, build
  verde.

### Layout & visual (Contatti)

- **Atmosfera:** funzionale, rassicurante, caldo. Poche distrazioni.
- **Hero (100dvh o 40vh, senza immagine):** sfondo `ivory` con decorazioni
  `HeroCornerDecoration` più elaborate agli angoli superiori. H1 serif
  "Contatti" + sottotitolo "Siamo qui per aiutarti a pianificare il tuo
  soggiorno". Palette coerente con la home.
- **Layout principale a 2 colonne (desktop) / stack (mobile):**
  - **Colonna sx — `InfoCard`:**
    - Indirizzo: Campo San Geremia 312, Cannaregio, 30121 Venezia
    - Tel: `+39 041 715125` (click-to-call) — *verificare con il cliente*
    - Email: `info@albergoalgobbo.it` (`mailto`) — *verificare con il cliente*
    - Orari check-in/check-out (placeholder da confermare)
    - Indicazioni: "A 2 minuti a piedi dalla stazione Santa Lucia"
  - **Colonna dx — Form contatti:** campi nome, email, telefono
    (opzionale), messaggio, checkbox privacy, honeypot, stati
    idle/submitting/success/error.
- **Mappa (full-width sotto):** embed Google Maps di Campo San Geremia 312,
  Venezia, con `title` per a11y; lazy.
- **Motion:** minimale.

---

## PAGINA — Privacy (`/privacy`)

- **Rotta:** `privacy` · **Componente:** `src/pages/Privacy.tsx`
- **Ruolo:** privacy policy e cookie policy.
- **Contenuto:** testo legale strutturato, link a gestione cookie.
- **Media:** nessuna.
- **i18n:** `privacy.*` · **SEO/a11y:** un H1; `noindex` opzionale; struttura
  a sezioni con ancore.
- **Done quando:** policy presente, banner cookie collegato al consenso, build
  verde.

### Layout & visual (Privacy)

- **Atmosfera:** documentale, massima leggibilità.
- **Layout a colonna singola (sfondo `white`, max-width ~70ch, centrato):** H1
  "Privacy & Cookie Policy", testo a sezioni con H2/H3, ampio interlinea, link
  in `brick`.
- **Gestione cookie:** pulsante "Gestisci preferenze cookie" collegato a
  `CookieConsentContext`.
- **Motion:** nessuna animazione.

---

## §Z — Build & Runtime Review (eseguire a fine refactor)

1. **Routing:** ogni rotta in `src/i18n/routes.ts` risolve in IT ed EN;
   `LanguageRouter.tsx` monta tutte le pagine; nessun placeholder residuo.
2. **i18n:** nessuna stringa hardcoded; chiavi presenti in
   `it/common.json` ed `en/common.json`; switch lingua mantiene la pagina
   corrente.
3. **SEO/a11y checklist globale:** ogni pagina ha esattamente 1 H1, meta
   description + og, canonical, JSON-LD `LodgingBusiness`; tutte le `<img>`
   hanno alt; nessun `user-scalable=0`; tutti i `target=_blank` con
   `rel=noopener noreferrer`; skip-link funzionante.
4. **Media:** tutti i file referenziati esistono in `public/media/`; nessun
   404; immagini grandi con `loading="lazy"`; hero WebP usata con `srcset`
   responsive.
5. **Link esterni:** telefoni con `tel:`, email con `mailto:`, social — tutti
   corretti.
6. **Form Prenota:** validazione date e ospiti; filtro camere per capienza;
   stati di errore accessibili.
7. **Form contatti:** protezione anti-abuso attiva (honeypot); invio testato.
8. **Build:** `pnpm build` verde; `pnpm lint` (typecheck) verde.
9. **E2E:** `pnpm --filter @brochure/frontend exec playwright test` —
   navigazione, switch lingua, presenza H1, link esterni, form prenota.
10. **Responsive:** verifica mobile/tablet/desktop; contrasto AA;
   `prefers-reduced-motion`.
11. **Lighthouse:** SEO ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95.
