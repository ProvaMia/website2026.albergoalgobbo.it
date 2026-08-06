export interface Attraction {
  id: string
  name: {
    it: string
    en: string
  }
  shortDescription: {
    it: string
    en: string
  }
  fullText: {
    it: string
    en: string
  }
  image: string
}

export const attractions: Attraction[] = [
  {
    id: 'piazza-san-marco',
    name: {
      it: 'Piazza San Marco',
      en: 'Piazza San Marco',
    },
    shortDescription: {
      it: 'Il salotto d\'Europa, unico spazio urbano di Venezia chiamato "piazza".',
      en: 'The Drawing Room of Europe, the only urban space in Venice called a "piazza".',
    },
    fullText: {
      it: 'Piazza San Marco, situata a Venezia in Veneto, è una delle più importanti piazze monumentali italiane, rinomata in tutto il mondo per la sua bellezza e integrità architettonica. È l\'unico spazio urbano di Venezia che assume propriamente il nome di "piazza", in quanto tutti gli altri spazi in forma di piazza sono propriamente definiti "campi". Il suo corpo principale ha forma trapezoidale, su cui si innestano altre aree, ed è lungo circa 170 metri. È anche nota come "la Piazza" o "il salotto d\'Europa".',
      en: 'Piazza San Marco is one of Italy\'s most important monumental squares, renowned worldwide for its beauty and architectural integrity. It is the only urban space in Venice properly called a "piazza"; all other square-shaped spaces are called "campi". Its main body is trapezoidal, about 170 meters long. It is also known as "the Drawing Room of Europe".',
    },
    image: '/media/images/attrazione-piazza-san-marco.jpg',
  },
  {
    id: 'piazzale-roma',
    name: {
      it: 'Piazzale Roma',
      en: 'Piazzale Roma',
    },
    shortDescription: {
      it: 'Principale snodo viario per raggiungere il centro storico dalla terraferma.',
      en: 'The main road hub for reaching the historic center from the mainland.',
    },
    fullText: {
      it: 'Piazzale Roma è il principale snodo viario per raggiungere dalla terraferma il nucleo storico di Venezia, inaugurato il 25 aprile 1933 come svincolo del nuovo ponte Littorio, oggi ponte della Libertà. Sul piazzale si affaccia un\'imponente autorimessa in stile razionalista, che fino agli anni cinquanta fu il parcheggio coperto più grande d\'Europa; nelle vicinanze sorgono i giardini Papadopoli.',
      en: 'Piazzale Roma is the main road hub for reaching Venice\'s historic center from the mainland, inaugurated on April 25, 1933, as the junction of the new Littorio bridge, now Ponte della Libertà. The square overlooks an imposing rationalist-style parking garage that, until the 1950s, was Europe\'s largest covered parking lot; nearby are the Papadopoli Gardens.',
    },
    image: '/media/images/attrazione-piazzale-roma.jpg',
  },
  {
    id: 'ponte-delle-guglie',
    name: {
      it: 'Ponte delle Guglie',
      en: 'Ponte delle Guglie',
    },
    shortDescription: {
      it: 'L\'unico ponte veneziano adornato da pinnacoli, nel cuore di Cannaregio.',
      en: 'The only Venetian bridge adorned with pinnacles, in the heart of Cannaregio.',
    },
    fullText: {
      it: 'Il Ponte delle Guglie si trova nel sestiere di Cannaregio ed è l\'unico ponte veneziano adornato da pinnacoli, gli spioventi posti alla base delle ringhiere che danno il nome al ponte. Fu costruito in legno nel 1285 come ponte di Cannaregio; l\'attuale versione in pietra risale al 1580. Restaurato nel 1641 e 1677, fu ricostruito nel 1823 con l\'aggiunta delle guglie. Nel 1987 un restauro ha aggiunto un percorso per disabili dotato di corrimano in metallo e sostituito i gradini in asfalto con quelli in pietra.',
      en: 'The Ponte delle Guglie lies in the Cannaregio district and is the only Venetian bridge adorned with pinnacles — spires at the base of the railings that give it its name. It was first built of wood in 1285 as the Cannaregio bridge; the current stone version dates to 1580. Restored in 1641 and 1677, it was rebuilt in 1823 with the addition of the spires. A 1987 restoration added an accessible walkway with a metal handrail and replaced asphalt steps with stone ones.',
    },
    image: '/media/images/attrazione-ponte-delle-guglie.jpg',
  },
  {
    id: 'stazione-santa-lucia',
    name: {
      it: 'Stazione Santa Lucia',
      en: 'Santa Lucia Station',
    },
    shortDescription: {
      it: 'La principale stazione ferroviaria della città lagunare, a due passi dall\'albergo.',
      en: 'The main railway station of the lagoon city, a short walk from the hotel.',
    },
    fullText: {
      it: 'La stazione di Venezia Santa Lucia è la principale stazione ferroviaria della città lagunare e una delle più grandi e frequentate d\'Italia. Sita nel sestiere di Cannaregio, in fregio al Canal Grande, prende nome dalla chiesa di Santa Lucia, demolita per far posto alla stazione. Dalla stazione, che ha struttura di testa, ha origine un tronco ferroviario a quattro binari che giunge alla stazione di Mestre, dove si dirama nelle linee per Milano, Trento, Trieste e Udine.',
      en: 'Venezia Santa Lucia is Venice\'s main railway station and one of Italy\'s largest and busiest. Located in the Cannaregio district along the Grand Canal, it is named after the church of Santa Lucia, which was demolished to make room for the station. From this terminus, a four-track railway line reaches Mestre, where it branches toward Milan, Trento, Trieste and Udine.',
    },
    image: '/media/images/attrazione-stazione-santa-lucia.jpg',
  },
  {
    id: 'ponte-rialto',
    name: {
      it: 'Ponte Rialto',
      en: 'Rialto Bridge',
    },
    shortDescription: {
      it: 'Il più antico dei quattro ponti che attraversano il Canal Grande.',
      en: 'The oldest of the four bridges crossing the Grand Canal.',
    },
    fullText: {
      it: 'Tra i quattro ponti che valicano il Canal Grande, il Ponte di Rialto è il più antico. In origine il canale veniva superato da una passerella di imbarcazioni; poi Nicolò Barattiero eresse una struttura di legno nella seconda metà del XII secolo, chiamata ponte della Moneta per l\'antica zecca. Attorno al 1250 fu sostituito da un ponte in legno mobile, poi chiamato Ponte di Rialto per il vicino mercato. Dopo vari crolli, nel 1588 il doge Pasquale Cicogna bandì un concorso vinto da Antonio da Ponte, il cui progetto a singola arcata fu completato nel 1591.',
      en: 'Of the four bridges crossing the Grand Canal, the Rialto Bridge is the oldest. The canal was originally crossed by a boat bridge; then Nicolò Barattiero built a wooden structure in the second half of the 12th century, called Ponte della Moneta after the nearby mint. Around 1250 it was replaced by a movable wooden bridge, later named Ponte di Rialto after the nearby market. After several collapses, in 1588 Doge Pasquale Cicogna held a competition won by Antonio da Ponte, whose single-arch design was completed in 1591.',
    },
    image: '/media/images/attrazione-ponte-rialto.jpg',
  },
  {
    id: 'ghetto-ebraico',
    name: {
      it: 'Il ghetto ebraico',
      en: 'The Jewish Ghetto',
    },
    shortDescription: {
      it: 'Il quartiere storico di Cannaregio, cuore della comunità ebraica di Venezia.',
      en: 'The historic Cannaregio district, heart of Venice\'s Jewish community.',
    },
    fullText: {
      it: 'Il Ghetto era il quartiere di Venezia dove gli ebrei erano obbligati a risiedere durante il periodo della Repubblica di Venezia, a partire dal 1516. Si trova nel sestiere di Cannaregio, è rimasto il fulcro della comunità ebraica di Venezia ed è sede di sinagoghe e di altre istituzioni religiose. In epoca medievale era la zona delle pubbliche fonderie e solo dal 1516 fu destinato a residenza obbligatoria per gli ebrei. Da qui derivò il nome comune "ghetto" per indicare un quartiere ebraico e, più in generale, un rione in cui si concentrano minoranze socialmente escluse.',
      en: 'The Ghetto was the quarter of Venice where Jews were required to live during the Republic of Venice, starting in 1516. Located in the Cannaregio district, it has remained the heart of Venice\'s Jewish community and is home to synagogues and other religious institutions. In medieval times it was the area of the public foundries; only from 1516 was it made compulsory residence for Jews. Hence the common word "ghetto" came to mean a Jewish quarter and, more broadly, an area where socially excluded minorities are concentrated.',
    },
    image: '/media/images/attrazione-ghetto-ebraico.jpg',
  },
  {
    id: 'campo-san-geremia',
    name: {
      it: 'Campo San Geremia',
      en: 'Campo San Geremia',
    },
    shortDescription: {
      it: 'La piazza dove si trova l\'albergo, tra Ponte delle Guglie e la stazione.',
      en: 'The square where the hotel is located, between Ponte delle Guglie and the station.',
    },
    fullText: {
      it: 'Campo San Geremia è un campo di Venezia situato nel sestiere di Cannaregio, poco distante dal Ponte delle Guglie e dalla stazione ferroviaria. Sul campo si affacciano l\'ingresso di Palazzo Labia, sede regionale della RAI, e la Chiesa di San Geremia. Anticamente era sede della Corrida.',
      en: 'Campo San Geremia is a square in Venice\'s Cannaregio district, not far from the Ponte delle Guglie and the railway station. Palazzo Labia — regional headquarters of RAI — and the Church of San Geremia face onto the square. In ancient times it was the site of the Corrida.',
    },
    image: '/media/images/attrazione-campo-san-geremia.jpg',
  },
  {
    id: 'palazzo-ducale',
    name: {
      it: 'Palazzo Ducale',
      en: 'Doge\'s Palace',
    },
    shortDescription: {
      it: 'Simbolo di Venezia e capolavoro del gotico veneziano in Piazza San Marco.',
      en: 'A symbol of Venice and a masterpiece of Venetian Gothic in Piazza San Marco.',
    },
    fullText: {
      it: 'Palazzo Ducale è uno dei simboli di Venezia e capolavoro del gotico veneziano. Sorge nell\'area monumentale di Piazza San Marco, tra la Piazzetta e il molo di Palazzo Ducale, accanto alla Basilica di San Marco. L\'edificio fonde influenze bizantine e orientali, testimoniando gli intensi scambi commerciali e culturali della città. La sua struttura si basa su un paradosso visivo: la pesante massa principale sembra sorretta da sottili colonnate riccamente intagliate. All\'interno conserva un\'importante collezione artistica con opere di Jacopo e Domenico Tintoretto, Tiziano, Veronese e Paolo Veronese. Storicamente sede del doge e delle magistrature veneziane, fu fondato dopo l\'812, più volte danneggiato da incendi e ricostruito. Oggi ospita il Museo civico di Palazzo Ducale, parte della Fondazione Musei Civici di Venezia (MUVE).',
      en: 'The Doge\'s Palace is one of the symbols of Venice and a masterpiece of Venetian Gothic. It stands in the monumental area of Piazza San Marco, between the Piazzetta and the Palazzo Ducale wharf, next to St. Mark\'s Basilica. The building blends Byzantine and Eastern influences, reflecting the city\'s intense commercial and cultural exchanges. Its structure relies on a striking visual paradox: the heavy main mass seems supported by slender, intricately carved colonnades. Inside it preserves an important art collection with works by Jacopo and Domenico Tintoretto, Titian, Veronese and Paolo Veronese. Historically the seat of the doge and Venetian magistracies, it was founded after 812, damaged by repeated fires and rebuilt several times. Today it houses the Museo Civico di Palazzo Ducale, part of the Fondazione Musei Civici di Venezia (MUVE).',
    },
    image: '/media/images/attrazione-palazzo-ducale.jpg',
  },
  {
    id: 'ponte-dei-sospiri',
    name: {
      it: 'Ponte dei sospiri',
      en: 'Bridge of Sighs',
    },
    shortDescription: {
      it: 'Il celebre ponte barocco che collega Palazzo Ducale alle Prigioni Nuove.',
      en: 'The famous Baroque bridge connecting the Doge\'s Palace to the New Prisons.',
    },
    fullText: {
      it: 'Il Ponte dei Sospiri è una struttura barocca in pietra d\'Istria costruita all\'inizio del XVII secolo su progetto di Antonio Contin, figlio di Bernardino Contin e nipote di Antonio Da Ponte, costruttore del Ponte di Rialto. Commissionato dal doge Marino Grimani, il cui stemma è scolpito sul ponte, si trova vicino a Piazza San Marco e scavalca il Rio di Palazzo collegando il Palazzo Ducale alle Prigioni Nuove. In passato i prigionieri lo percorrevano per raggiungere gli uffici degli Inquisitori di Stato. Il nome deriva dalla tradizione secondo cui i condannati, attraversandolo, sospiravano alla vista dell\'esterno durante l\'ultimo tratto verso il giudizio. Il nome "Ponte dei Sospiri" è documentato già dalla fine del XVIII secolo.',
      en: 'The Bridge of Sighs is a Baroque structure in Istrian stone built in the early 17th century to a design by Antonio Contin, son of Bernardino Contin and grandson of Antonio Da Ponte, builder of the Rialto Bridge. Commissioned by Doge Marino Grimani, whose coat of arms is carved on it, it stands near Piazza San Marco and spans the Rio di Palazzo, connecting the Doge\'s Palace to the New Prisons. In the past prisoners crossed it to reach the offices of the State Inquisitors. Its name comes from the tradition that condemned men, crossing it, would sigh at their last glimpse of the outside world on their way to judgment. The name "Ponte dei Sospiri" was already documented by the late 18th century.',
    },
    image: '/media/images/attrazione-ponte-dei-sospiri.jpg',
  },
]
