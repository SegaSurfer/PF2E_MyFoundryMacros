/*
  ########################################################################################################################################################################################################
  # Macro Name: Create a Book - German version
  #
  # Author: SegaSurfer
  #
  # Description: 
  #   This macro is a more or less dirty! solution to generate comprehensive books for the PF2e-System (tailored for the use with Forge-VTT).
  #   It will generate a random book based on the lists below.
  #   Every book is generated in german and the texts are mainly a translation from https://www.dndspeak.com/random-book-generator/, as well as parts of the generation logic, so all probs to them.
  #
  #   Like my other macro, it's not even close to clean written code and I ignored a lot of best practices (please don't look at the var cases or types).
  #   It's ugly, it's not really performant, but it does it's job quite good.
  #
  #   IMPORTANT NOTE: You have to have an actor selected before you add a book to the inventory or it will horribly crash... 
  #
  #   And as always: I created this abomination, it's my creation and I'm proud of it... However, I hope my players will still like it ;) 
  ########################################################################################################################################################################################################
*/
  


var bookLanguageArray = {
    "Gemeinsprache": 16,
    "Gnomisch": 6,
    "Zwergisch": 6,
    "Elfisch": 6,
    "Halblingisch" : 6,
    "Drakonisch" : 2,
    "Goblinisch" : 2,
    "Jotun" : 2,
    "Orkisch" : 2,
    "Sylvanisch" : 2,
    "Unterländisch" : 2,
    "Abyssisch" : 1,
    "Aklo" : 1,
    "Aquan" : 1,
    "Auran" : 1,
    "Celestisch" : 1,
    "Gnollisch" : 1,
    "Ignan" : 1,
    "Infernal" : 1,
    "Nekril" : 1,
    "Terran" : 1,
    "Schattensprache" : 1,
    "Hieroglyphen (Piktogramme und Bilder)" : 1,
    "einer uralten vergessen Sprache" : 1,
    "magischen Schriftzeichen (erfordert magische Entzifferung)" : 1,
    "einem scheinbaren Kauderwelsch" : 1,
  }
  
  var bookFeatures = [
      "hat einen sehr dünnen Einband",
      "hat einen sehr dicken Einband",
      "hat ein ausuferndes Vorwort oder ist jemandem gewidmet",
      "wurde in Tierhaut eingebunden. Ein einigen Stellen ist noch Fell zu sehen",
      "ist ausgehöhlert und ein kleiner Gegenstand fällt beim öffnen heraus",
      "beginnt mit einem Gebet zu einer unbekannten kleineren Gottheit",
      "hat einen Einband aus steinernden Platten, welche mit Metallringen zusammengehalten werden",
      "ist in altem Fettpapier eingebunden",
      "beginnt mit einem Selbstproträt des Autors",
      "scheint noch unfertig zu sein, es hört nach einigen Kapiteln abrupt auf",
      "enthält sehr hochwertige Kunstdruckerei",
      "ist einer von insgesamt 10 Bänden",
      "wurde in Leder eingebunden und hat kleine Glasedelsteine eingelassen",
      "hat eine schreckliche Rechtschreibung und viele Grammatikfehler",
      "wirkt sehr autoritär geschrieben",
      "ist eindeutig nicht in der Muttersprache des Autors verfasst",
      "ist in einer sehr einfachen Sprache verfasst",
      "wurde mit kunstvoll gestanztem Leder ummantelt",
      "hat eine bunt verzierte erste Seite, ist aber sonst farblos",
      "wurde mit kalligraphischen Verzierungen versehen",
      "hat Metallscharniere und ein Schloss",
    "hat Metallscharniere und ein Schloss, ist aber abgeschlossen",
      "wurde in Holz eingebunden und wird mit Lederriemen zusammengehalten",
      "riecht fürchterlich",
      "hat etwas zwischen zwei Seiten ...",
  ]
  
  var artikel = {"m": "Der", "w": "Die", "s": "Das", "x": "Die"};
  var biographyTitel1 = [
    "bewunderungswürdige", 
    "blutverdunkelte",
    "blutige", 
    "gefeierte",
    "klassische",
    "vollständige",
    "umfassende",
    "empirische",
    "treue",
    "tödliche",
    "endgültige",
    "beste",
    "galante",
    "vergoldete",
    "herrliche",
    "große",
    "ketzerische",
    "ehrliche",
    "unglücklichen",
    "erleuchtende",
    "unglaubliche",
    "lobenswerte",
    "missverstandene",
    "edle",
    "perfekte",
    "bewährte",
    "offenbarte",
    "feine",
    "herrliche",
    "verräterische",
    "wahrhaftige",
    "eindeutige",
    "ausgegrabene",
    "bewundernswerte",
    "gefeierte",
    "finale",
    "feinste",
    "galant",
    "großartige",
    "Falsch verstandene",
    "edle",
    "prächtige",
    "verlockende",
    ]
  var biographyTitel2 = {
    "Errungenschaften" : "x",
    "Konten" : "x",
    "Erfolge" : "x",
    "Ehrgeiz" : "m",
    "Annalen" : "x",
    "Archive" : "x",
    "Archiv" : "s",
    "Aspirationen" : "x",
    "Chroniken" : "x",
    "Geständnisse" : "x",
    "Rätsel" : "x",
    "Taten": "x",
    "Überlegungen" : "x",
    "Wünsche" : "x",
    "Bemühungen": "x",
    "Anfragen" : "x",
    "Aufsätze": "x",
    "Existenzen" : "x",
    "großen Taten" : "x",
    "Kunststücke" : "x",
    "Befunde (an)": "x",
    "Geschichte" : "w",
    "Arbeiten" : "x",
    "Leben" :"s",
    "Anmerkungen" :"x",
    "Prophezeiungen" : "x",
    "Aufzeichnungen" :"x",
    "Offenbarungen" :"x",
    "Lernen" :"s",
    "Erzählungen" : "x",
    "Zeugnisse" :"x",
    "Transkripte" : "x",
    "Abhandlung (über)": "w",
    "Triumphe" :"x",
    "Visionen" : "x",
    "Berufung" : "w",
  }
  var biographyTitel3 = [
    "des Königs",
    "des Kaisers",
    "des Handwerkers",
    "des Kapitäns",
    "des Meisters",
    "des Verbrechenslords",
    "des Demagogen",
    "des Duellanten",
    "des Ingenieurs",
    "des Exorzisten",
    "des Entdeckers",
    "des Mönchs",
    "des Gildenmeisters",
    "des Wegelagerers",
    "des Ritters",
    "des Kaufmanns",
    "des Minnesängers",
    "der Edlen",
    "des Gesetzlosen-Häuptlings",
    "des Arztes",
    "des Priesters",
    "des Gelehrten",
    "des Seekapitäns",
    "des Veteranen",
    "des Hexenjägers",
    "des Zauberers",
    "des Barden",
    "des Barbaren",
    "des Paladins",
    "des Schurken",
    "des Hexenmeisters",
    "des Magiers",
    "des Kämpfers",
    "des Kriegers",
    "des Klerikers",
    "des Druiden",
  ]
  
  var biographyTitel4 = [
    "Zweite Auflage",
    "Dritte Auflage",
    "Das wahre Erbe",
    "Jetzt bearbeitet und erweitert",
    "Bisher unveröffentlicht",
    "Der Gesamtband",
    "Aufgenommen nach dem Tod",
    "Veröffentlicht im Interesse aller",
    "Wahre und ehrliche Aussagen",
    "Ein verwirktes Schicksal",
    "Ein gefährlicher Geist",
    "Endete im Feuer",
  ]
  
  var bestiaryTitel1 = [
    "Abscheuliche",
    "Anfragen über die",
    "Aufsätze über die",
    "Fakten über die",
    "Erkenntnisse über die",
    "Schreckliche",
    "Ideen über die",
    "Vorträge über die",
    "Unterricht über die",
    "Abstoßende",
    "Meinungen über die",
    "Berichte über die",
    "Seminare über die",
    "Studie über die",
    "Befragung der",
    "Theorien über die",
    "Dissertation über die",
    "Abhandlung über die",
  ]
  
  var bestiaryTitel2 = [
    "Tiere",
    "Biester",
    "Wesen",
    "Kinder",
    "Kreaturen",
    "Bewohner",
    "Herren",
    "Meister",
    "Gedanken",
    "Eingeborenen",
    "Diener",
    "Söhne",
    "Töchter",
    "Seelen",
    "Spirituosen",
    "Mieter",
  ]
  
  var bestiaryTitel3 = [
    "des Zahns",
    "des Bauernhofs",
    "der Sümpfe",
    "des Waldes",
    "des Schwarms",
    "des Himmels",
    "des Bienenstocks",
    "des Hungers",
    "des Mythos",
    "des Grabes",
    "der Wildheit",
    "des Blutes",
    "des Chaos",
  ]
  
  var bestiaryTitel4 = [
    "",
    ": Die Lehre der Bestien",
    ": Ruf der Wildnis",
    ": Die gelehrten Kolloquien der Welt",
    ": Wunderbar wild",
    ": Herrliche Geschöpfe",
    ": Eine Studie über schöne und schreckliche Kreaturen",
    ": Eine höchst bemerkenswerte Hypothese",
    ": Eine Naturphilosophie",
    ": Ein Selbsthilfebuch",
    ": Was tun wenn es zu spät ist?",
  ]
  
  
  var cookingTitel1 = [
    "Appetitliche",
    "Übliche",
    "Köstliche",
    "Herrliche",
    "Verlockende",
    "Fabelhafte",
    "Favorisierte",
    "Vergessene",
    "Innovative",
    "Wunderbare",
    "Übersehene",
    "Kostbare",
    "Schnelle",
    "Leckere",
    "Prächtige",
    "Verlockende",
    "Ehrenwürdige",
    "Traditionelle",
    ]
  
  var cookingTitel2 = [
    "Biere",
    "Brote und Kekse",
    "Mahlzeiten",
    "Delikatessen",
    "Nachspeisen",
    "Lebensmittel",
    "Küche",
    "Fleischsorten",
    "Menüs",
    "Kuchen",
    "Würste",
    "Suppen",
    "Eintöpfe",
    "Leckereien",
    "Weine",
    ]
  
  var cookingTitel3 = [
  ": Die Wahl des Volkes",
  ": Die vergessene Kost",
  ": Die Wahl der Zwerge",
  ": Die Wahl der Elfen",
  ": Die Wahl des Halblings",
  ": Die menschliche Wahl",
  ": Auswahl aus der Goblinküche",
  ": Die Wahl der Orks",
  ": Der Küchenführer",
  ": Ein Füllhorn von Genüssen",
  ": Zeitgenössische Küche",
  ": Ein unverzichtbarer Leitfaden für die Küche",
  ": Geheimnisse des Herdes gelüftet",
  ": Renommierte Töpfe und Platten",
  ": Eine verführerische Auswahl",
  ": 4 köstliche Rezepte",
  ": Ein Selbsthilfebuch",
  ": Die Küche des Meeres",
  ": Die Küche der Wüste",
  ": Die Küche des Sumpfes",
  ": Bergküche",
  ": Lebensmittel aus dem Meer",
  ": Feste am Fluss",
  ": Waldleckereien",
  " aus der Küche von Chefkoch Gumbo",
  ]
  
  
  var fictionTitel1 = [
    {"w": "Schwarze " ,"s": "Schwarzes " , "m": "Schwarzer "},
    {"w": "Die Farbe der " ,"s": "Die Farbe des ", "m": "Die Farbe des "},
    {"w": "Absterben der " ,"s": "Absterben des " , "m": "Absterben des "},
    {"w": "Herrliche " ,"s": "Herrliches " , "m": "Herrlicher "},
    {"w": "Goldene " ,"s": "Goldenes " , "m": "Goldener "},
    {"w": "Letzte " ,"s": "Letztes " , "m": "Letzter "},
    {"w": "Lobenswerte " ,"s": "Lobenswertes " , "m": "Lobenswerter "},
    {"w": "Ominöse " ,"s": "Ominöses " , "m": "Ominöser "},
    {"w": "Hartnäckige " ,"s": "Hartnäckiges " , "m": "Hartnäckiger "},
    {"w": "Rote " ,"s": "Rotes " , "m": "Roter "},
    {"w": "Stille " ,"s": "Stilles " , "m": "Stiller "},
    {"w": "Sanfte " ,"s": "Sanftes " , "m": "Sanfter "},
    {"w": "Prächtige " ,"s": "Prächtiges " , "m": "Prächtiger "},
    {"w": "Weiße " ,"s": "Weißes " , "m": "Weißer "},
    {"w": "Wunderbare " ,"s": "Wunderbares " , "m": "Wunderbarer "},
    {"w": "Eine " ,"s": "Ein " , "m": "Ein "},
    {"w": "Elfen-" ,"s": "Elfen-" , "m": "Elfen-"},
    {"w": "Zwergen-" ,"s": "Zwergen-" , "m": "Zwergen-"},
    {"w": "Kobold-" ,"s": "Kobold-" , "m": "Kobold-"},
    {"w": "Biester-" ,"s": "Biester-" , "m": "Biester-"},
    {"w": "Monster-" ,"s": "Monster-" , "m": "Monster-"},
    {"w": "Männer-" ,"s": "Männer-" , "m": "Männer-"},
    {"w": "Die Barden-" ,"s": "Das Barden-" , "m": "Der Barden-"},
    {"w": "Die Ritter-" ,"s": "Das Ritter-" , "m": "Der Ritter-"},
    {"w": "Die Zauberer-" ,"s": "Das Zauberer-" , "m": "Der Zauberer-"},
    {"w": "Die Barbaren-" ,"s": "Das Barbaren-" , "m": "Der Barbaren-"},
    {"w": "Die Schurken-" ,"s": "Das Schurken-" , "m": "Der Schurken-"},
    {"w": "Aldirs " ,"s": "Aldirs " , "m": "Aldirs "},
    {"w": "Die Albtraum-" ,"s": "Das Albtraum-" , "m": "Der Albtraum-"},
    {"w": "Die Traum-" ,"s": "Das Traum-" , "m": "Der Traum-"},
    {"w": "Lied der " ,"s": "Lied des " , "m": "Lied des "},
  ]
  
  
  var fictionTitel2 = {
    "Herbst" : "m",
    "Erwachen" : "s",
    "Krone": "w",
    "Dämmerung": "w",
    "Abend" : "m",
    "Blume": "w",
    "Hand": "w",
    "Herz": "s",
    "Legende": "w",
    "Licht" : "s",
    "Erinnerung": "w",
    "Morgen" : "m",
    "Preis" : "m",
    "Saga" : "w",
    "Schatten" :"m",
    "Frühling": "m",
    "Geschichte" : "w",
    "Sommer": "m",
    "Geschichte": "w",
    "Träne": "w",
    "Zeit": "w",
    "Wasser" : "s",
    "Wind" :"m",
    "Winter": "m",
  }
  
  
  var fictionTitel3 = [
    "Schmuddelige 'Liebesgeschichten' - grenzwertig pornographisch",
    "Lehrende Moralgeschichten für junge Liebende",
    "Traditionelle Fabel oder Märchen",
    "Geister- oder Horrorgeschichte",
    "Klassischer Roman",
    "Erster Teil einer epischen Liebesgeschichte",
    "Kampf einer aufstrebenden Kaufmannsfamilie",
    "Eine seit Generationen bestehende Familie",
    "Eine traurige Geschichte aus dem Leben eines mittellosen Mädchens",
    "Konformistische Geschichte eines rechtschaffenen Barons und seiner Herrschaft",
    "Ein glamouröser Ball, an den sich zehn verschiedene Personen erinnern",
    "Erinnerung an eine Seuche, die eine Kleinstadt heimgesucht hat",
    "Düsteres Märchen einer Frau, die als Hexe verbrannt wurde",
    "Unerschrockene Würdigung des Königs",
    "Sammlung von Liebesgedichten",
    "Ein komödiantisches Bühnenstück",
    "Ein tragisches Bühnenstück",
    "Ein dramatisches Bühnenstück",
    "Ein Liederbuch mit Schlafliedern und Kinderliedern",
    "Ein Liederbuch traditioneller Melodien",
    "Ein Liederbuch religiöser Hymnen",
    "Ein Buch über Malerei",
    "Ein Buch über Kalligrafie",
    "Ein Buch über Töpferei und Glasbläserei",
    "Eine humorvolle Nacherzählung eines klassischen Volksmärchens",
    "Ein sehr trashiger Liebesroman",      
  ]
  
  var guideTitel1 = [
    "Atemberaubende",
    "Erstaunliche",
    "Geschlagene",
    "Klassische",
    "Nachdenkliche",
    "Gefährliche",
    "Entfernte",
    "Staubige",
    "Anregende",
    "Schöne",
    "Unvergessliche",
    "Meine",
    "Geheimnisvolle",
    "Edle",
    "Bemerkenswerte",
    "Gefährliche",
    "Seltsame",
    "Verräterische",
    "Unbekannte",
    "Wilde",
    ]
  
    var guideTitel2 = {
      "Abenteuer aus": "D",
      "Annalen aus": "D",
      "Chroniken": "G",
      "Kreuzungen": "G",
      "Domänen": "G",
      "Fußwege": "G",
      "Fußabdrücke": "G",
      "Gasthäuser": "G",
      "Wirtshäuser": "G",
      "Zeitschriften aus": "D",
      "Einreise in": "A",
      "Länder":"G",
      "Notizen": "G",
      "Wege": "G",
      "Straßen": "G",
      "Schritte in": "A",
      "Sonnenaufgänge": "G",
      "Sonnenuntergänge": "G",
      "Spuren": "G",
      "Reisen in": "A",
    }
      
      var guideTitel3 = [
      ": Ein Reiseführer",
      ": Ein Leben auf der Straße erinnert",
      ": Ein Rundgang in freier Wildbahn",
      ": Eine Reise in Erinnerung",
      ": Gassen und Aquädukte",
      ": Die wahren und ehrlichen Konten",
      ": Burgen und Sackgassen",
      ": Land des Segens und der Fülle",
      ": Kreuzung des Kuriers",
      ": Auf den Spuren unserer hochverehrten Väter",
      ": Einbrüche ins Outback",
      ": Tagebücher einer Reise",
      ": Herrenhäuser und Herrenhäuser",
      ": Unterwegs",
      ": Gefährliche Pfade eines Imperiums in Flammen",
      ": Perspektiven auf den Pfaden der Verdammten",
      ": Flüsse und Rendezvous",
      ": Gerüchte und Berichte",
      ": Geschichten eines Wanderer",
      ": Der Weg zur Erlösung enthüllt",
      ": Hin und wieder zurück",
      ": Unruhige Pfade eines höchst schrecklichen Trakts",
      ": Geschichte der Gefahren",
      "",
      ]
  
  
  var guideTitel4 = [
    {"G" : "des Ödlandes", "D" : "dem Ödland", "A" : "das Ödland"},
    {"G" : "der Grauen Berge", "D" : "den Grauen Bergen", "A" : "die Grauen Berge"},
    {"G" : "der schwarzen Berge", "D" : "den schwarzen Bergen", "A" : "die schwarzen Berge"},
    {"G" : "der Weißen Berge", "D" : "den Weißen Bergen", "A" : "die Weißen Berge"},
    {"G" : "des großen Waldes", "D" : "dem großen Wald", "A" : "der große Wald"},
    {"G" : "des großen Ozeans", "D" : "dem großen Ozean", "A" : "der große Ozean"},
    {"G" : "der großen Wüste", "D" : "der großen Wüste", "A" : "die große Wüste"},
    {"G" : "des Archipels", "D" : "dem Archipel", "A" : "das Archipel"},
    {"G" : "der Schlucht", "D" : "der Schlucht", "A" : "die Schlucht"},
    {"G" : "der Höhle", "D" : "der Höhle", "A" : "die Höhle"},
    {"G" : "der Küste", "D" : "der Küste", "A" : "die Küste"},
    {"G" : "der Minen", "D" : "den Minen", "A" : "die Minen"},
    {"G" : "des Labyrinths", "D" : "dem Labyrinth", "A" : "das Labyrinth"},
    {"G" : "der Ebenen", "D" : "den Ebenen", "A" : "die Ebenen"},
    {"G" : "der Becken", "D" : "den Becken", "A" : "die Becken"},
    {"G" : "des Riffs", "D" : "dem Riff", "A" : "das Riff"},
    {"G" : "des Verlieses", "D" : "dem Verlies", "A" : "das Verlies"},
    {"G" : "des Flusses", "D" : "dem Fluss", "A" : "der Fluss"},
    {"G" : "der Straße", "D" : "der Straße", "A" : "die Straße"},
    {"G" : "des Meeres", "D" : "dem Meer", "A" : "das Meer"},
    {"G" : "des Friedhofes", "D" : "dem Friedhof", "A" : "der Friedhof"},
    {"G" : "des Hains", "D" : "dem Hain", "A" : "der Hain"},
    {"G" : "des Hafens", "D" : "dem Hafen", "A" : "der Hafen"},
    {"G" : "der Hügel", "D" : "den Hügeln", "A" : "die Hügel"},
    {"G" : "des Dschungels", "D" : "dem Dschungel", "A" : "der Dschungel"},
    {"G" : "der Stadt", "D" : "der Stadt", "A" : "die Stadt"},
    {"G" : "des Dorfes", "D" : "dem Dorf", "A" : "der Dorf"},
  ]
  
  var religiousBook1 = [
      "",
      "Die",
      "Eine Studie über die",
      "Absolute",
      "Glühende",
      "Gesegnete",
      "Kategorische",
      "Gesammelte",
      "Umfassende",
      "Abschließende",
      "Konstante",
      "Wesentliche",
      "Etablierte",
      "Extreme",
      "Treue",
      "Inbrünstige",
      "Versammelte",
      "Goldene",
      "Geheiligte",
      "Heilige",
      "Demütigende",
      "Orthodoxe",
      "Fromme",
      "Potente",
      "Primäre",
      "Hauptsächliche",
      "Verehrte",
      "Gerechte",
      "Strenge",
      "Unantastbare",
      "Scheinheilig",
      "Skrupellose",
      "Summierte",
      "Superlative",
      "Überragende",
      "Gedanken über die",
      "Altehrwürdige",
      "Abhandlung über die",
      "Wahre",
      "Ultimative",
      "Bedingungslose",
      "Tugendhafte",
  ]
  
  var religiousBook2 = [
      "Adressen",
      "Artikel",
      "Gebote",
      "Befehle",
      "Bedingungen",
      "Widersprüche",
      "Kurse",
      "Dekrete",
      "Erwägungen",
      "Forderungen",
      "Demonstrationen",
      "Diktate",
      "Anweisungen",
      "Richtlinien",
      "Diskurse",
      "Elemente",
      "Irrtümer",
      "Erfordernisse",
      "Darlegungen",
      "Grundlagen",
      "Imperative",
      "Ungereimtheiten",
      "Anweisungen",
      "Vorlesungen",
      "Mandate",
      "Wunder",
      "Geheimnisse",
      "Papiere",
      "Pfade",
      "Predigten",
      "Verfahren",
      "Beweise",
      "Prophezeiungen",
      "Fragen",
      "Ersuchungen",
      "Anforderungen",
      "Enthüllungen",
      "Rudimente",
      "Erlösungen",
      "Predigten",
      "Vorschriften",
      "Tafel",
      "Belehrungen",
      "Zeugnisse",
      "Abschriften",
      "Abhandlungen",
      "Wahrheiten",
      "Visionen",
  ]
  
  var religiousBook3 = [
      "über Götter (Religion im Allgemeinen)",
      "von Abadar",
      "von Asmodeus",
      "von Calistria",
      "von Cayden Cailean",
      "von Desna",
      "von Erastil",
      "von Gorum",
      "von Gozreh",
      "von Iomedae",
      "von Irori",
      "von Lamashtu",
      "von Nethys",
      "von Norgober",
      "von Pharasma",
      "von Rovagug",
      "von Sarenrae",
      "von Shelyn",
      "von Torag",
      "von Urgathoa",
      "von Zon-Kuthon",
      "aus Osiris (Uralte Osirische Götter)",
      "der Erzteufel",
      "der Dämonenherrscher",
      "der Zwerge (Zwergenreligionen und -pantheon)",
        "der Ältesten",
      "der Elfen (Elfenreligionen und -pantheon)",
      "der Elementarherrscher",
      "der Apokalyptischen Reiter",
      "der äußeren Götter und der großen Alten",
  ]
  
  var skillBook1 = [
      "",
      "Kumulierte",
      "Bewundernswerte",
      "Gesammelte",
      "Verheißungsvolle",
      "Gefeierte",
      "Kompilierte",
      "Vollständige",
      "Umfassende",
      "Obligatorische",
      "Elementare",
      "Empirische",
      "Wesentliche",
      "Geschätzte",
      "Ausgesetzte",
      "Treue",
      "Endgültige",
      "Feinste",
      "Erste",
      "Grundlegende",
      "Galante",
      "Versammelte",
      "Vergoldete",
      "Glorreiche",
      "Goldene",
      "Großartige",
      "Ehrliche",
      "Erleuchtende",
      "Unverzichtbare",
      "Lobenswerte",
      "Vornehme",
      "Obligatorische",
      "Vollkommene",
      "Primäre",
      "Hauptsächliche",
      "Erforderliche",
      "Respektierte",
      "Offenbarte",
      "Verehrte",
      "Rudimentäre",
      "Prächtige",
      "Verlockende",
      "Wahrheitsgemäße",
      "Unzweideutige",
      "Aufgedeckte",
      "Ausgegrabene",
      "Wertvolle",
  ]
  var skillBook2 = [
      "Kolloquien:",
      "Argumente:",
      "Konzeptionen:",
      "Demonstrationen:",
      "Diskurse:",
      "Dissertationen:",
      "Erläuterungen:",
      "Untersuchungen:",
      "Aufsätze:",
      "Untersuchungen:",
      "Exposé:",
      "Darstellungen:",
      "Erkenntnisse:",
      "Voraussichten:",
      "Hypothesen:",
      "Kenntnisse:",
      "Einsichten:",
      "Gesetze:",
      "Abhandlungen:",
      "Anmerkungen:",
      "Beobachtungen:",
      "Wahrnehmungen:",
      "Perspektiven:",
      "Verfahren:",
      "Eigenschaften:",
      "Vorschläge:",
      "Enthüllungen:",
      "Grundzüge:",
      "Studien:",
      "Anregungen:",
      "Belehrungen:",
      "Zeugnisse:",
      "Theoreme:",
      "Theorien:",
      "Thesen:",
      "Abhandlungen:",
      "Verständnisse:",
      "Weisheiten:",
      "Visionen:",
      "Arbeiten:",
      "Lehren:",
      "Vorlesungen:",
      "Lektionen:",
      "Forschungen:",
      "Aufzeichnungen:",
      "Gelehrsamkeiten:",
      "Etikette:",
  ]
  
  var skillBook3 = [
      "die zeitgenössische Kultur der Zwerge",
      "die Geschichte der Zwerge",
      "die zeitgenössische Kultur der Halblinge",
      "die Geschichte der Halblinge",
      "die zeitgenössische Kultur der Elben",
      "die Geschichte der Elfen",
      "die jüngste Geschichte der Welt",
      "die alte Geschichte der Welt",
      "die Geschichte der Kulte",
      "das druidische Lexikon",
      "das Drakonische Lexikon",
      "das Zwergen-Lexikon",
      "das Elfen-Lexikon",
      "das Riesen-Lexikon",
      "das Gnomische Lexikon",
      "das Goblin-Lexikon",
      "das Halblings-Lexikon",
      "das Sylvanische Lexikon",
      "das Unterbewohner-Lexikon",
      "das Abyssal-Lexikon",
      "das Aquan-Lexikon",
      "das Auran-Lexikon",
      "das himmlische Lexikon",
      "das Ignan-Lexikon",
      "das Höllen-Lexikon",
      "das Terranische Lexikon",
      "das Aboleth-Lexikon",
      "das Yuan-Ti-Lexikon",
      "das Orcische Lexikon",
      "Lexica Arkana",
      "Arkrobatische Meisterleistungen",
      "Die kleine Handwerksfibel",
      "Klettern wie ein Profi",
      "Die Fibel der medizinischen Eingriffe",
      "Kryptografie für Anfänger",
      "Knigge am Adelshof",
      "Fallen und Gerätschaften",
      "Verkleidungen",
      "Entfesselungskünste",
      "Die besten Fälschung in der Geschichte",
      "Sammeln von Informationen",
      "Umgang mit Tieren",
      "Einschüchtern wie ein Hobgoblin",
      "Lautlos bewegen",
      "Schlösser öffnen",
      "Trainieren eines Pferdes",
      "Motive erspüren",
      "Überlebensratgeber",
      "Magische Geräte benutzen",
      "Seil benutzen",
      "Eine Abhandlung über [Monster einfügen]",
  ]
  
  var forbidden1 = [
      {"w": "Schwarze " ,"s": "Schwarzes " , "m": "Schwarzer "},
      {"w": "Die " ,"s": "Das " , "m": "Der "},
      {"w": "Absolute " ,"s": "Absolutes " , "m": "Absoluter "},
      {"w": "Verbotene " ,"s": "Verbotenes " , "m": "Verbotener "},
      {"w": "Karminrote " ,"s": "Karminrotes " , "m": "Karminroter "},
      {"w": "Dunkle " ,"s": "Dunkles " , "m": "Dunkler "},
      {"w": "Wesentliche " ,"s": "Wesentliches " , "m": "Wesentlicher "},
      {"w": "Endgültige " ,"s": "Endgültiges " , "m": "Endgültiger "},
      {"w": "Verbotene " ,"s": "Verbotenes " , "m": "Verbotener "},
      {"w": "Vergoldete " ,"s": "Vergoldetes " , "m": "Vergoldeter "},
      {"w": "Goldene " ,"s": "Goldenes " , "m": "Goldener "},
      {"w": "Graue " ,"s": "Graues " , "m": "Grauer "},
      {"w": "Leuchtende " ,"s": "Leuchtendes " , "m": "Leuchtender "},
      {"w": "Magische " ,"s": "Magisches " , "m": "Magischer "},
      {"w": "Meines Lehnsherrn " ,"s": "Meines Lehnsherrn " , "m": "Meines Lehnsherrn "},
      {"w": "Meines Herrn " ,"s": "Meines Herrn " , "m": "Meines Herrn "},
      {"w": "Ominöse " ,"s": "Ominöses " , "m": "Ominöser "},
      {"w": "Ursprüngliche " ,"s": "Ursprüngliches " , "m": "Ursprünglicher "},
      {"w": "Lilane " ,"s": "Lilanes " , "m": "Lilaner "},
      {"w": "Rote " ,"s": "Rotes " , "m": "Roter "},
      {"w": "Glänzende " ,"s": "Glänzendes " , "m": "Glänzender "},
      {"w": "Ultimative " ,"s": "Ultimatives " , "m": "Ultimativer "},
      {"w": "Weiße " ,"s": "Weißes " , "m": "Weißer "},
      {"w": "Gelbe " ,"s": "Gelbes " , "m": "Gelber "},
      {"w": "Verdunkelte " ,"s": "Verdunkeltes " , "m": "Verdunkelter "},
      {"w": "Hohle " ,"s": "Hohles " , "m": "Hohler "},
  ]
  var forbidden2 = {
      "Aethyr":"m",
      "Chroniken":"w",
      "Beichte":"w",
      "Verdammnis":"w",
      "Fluch":"m",
      "Seuche":"w",
      "Ewigkeit":"w",
      "Morgendämmerung":"w",
      "Traum":"m",
      "Fang":"m",
      "Herz":"s",
      "Horn":"s",
      "Licht":"s",
      "Mahlstrom":"m",
      "Mond":"m",
      "Geheimnisse":"w",
      "Omen":"s",
      "Leidenschaft":"w",
      "Prinzipien":"w",
      "Schatten":"m",
      "Schlange":"w",
      "Blut":"s",
      "Seelen":"w",
      "Sonne":"w",
      "Vorherrschaft":"w",
      "Flut":"w",
      "Zeit":"w",
      "Ultimatum":"s",
      "Wind":"m",
      "Worte":"w",
  }
  
  var forbidden3 = [
      "Dämonologie",
      "Nekromantie",
      "verderbliche Mächte",
      "das Chaos",
      "Arkanen Magie",
      "die Lügen der Götter",
      "die Lehre der Bestien",
      "den Tod",
      "die Macht des Schattens",
      "die Macht des Chaos",
      "die Macht der Nekromantie",
      "Froschdämonen",
      "Vampire",
      "Ghoul-Könige",
      "die Grabräuberei",
      "die Unaussprechliche Verdammnis",
  ]
  
  var forbiddenFeatures = [
    "ist in Menschenhaut gebunden",
      "ist gebunden in Teufelshaut, zusammengehalten mit silbernen Nägeln",
      "ist gebunden in Kuhleder",
      "ist gebunden in Schweinehaut",
      "ist gebunden in Reptilienleder",
      "ist mit Metallplatten gebunden",
      "ist gebunden mit Ork-Haut",
      "ist gebunden mit Dämonenhaut",
      "ist gebunden in Elfenhaut",
      "ist gebunden in Zwergenhaut",
      "ist gebunden in Drachenhaut",
      "ist mit leuchtenden, verschlungenen Mustern bedeckt",
      "ist mit einem menschlichen Gesicht auf dem Einband geprägt",
      "hat ein eingearbeitetes Monstergesicht auf dem Einband",
      "ist bedeckt mit beweglichen menschlichen Augäpfeln",
      "schwebt ein paar Zentimeter über dem Tisch",
      "ist mit Dämonenblut bespritzt",
      "ist an den Rändern der Seiten verbrannt",
      "ist mit einer Metallklammer verschlossen",
      "ist mit einer Metallklammer verschlossen und mit einer Giftnadel ausgestattet",
      "ist mit vergifteter Tinte geschrieben",
      "wird den Leser in leichten Wahnsinn treiben, wenn er es liest",
      "wird den Leser in großen Wahnsinn treiben, wenn er es liest",
      "ist mit explosiven Runen gefüllt",
      "verleiht dem Besitzer eine irrationale Liebe zu dem Buch",
      "ist verflucht",
      "enthält einen magischen Wächter",
      "fängt an, wie eine Fledermaus durch den Raum zu flattern, wenn es geöffnet wird",
      "öffnet ein kleines Portal an der nächstgelegenen Wand, wenn es geöffnet wird",
      "hat einen unsichtbaren Kobold, der in den Seiten lebt",
      "hat gekritzelte Botschaften auf dem Einband, um zukünftige Leser zu warnen",
      "projiziert Stimmen, die den Leser zu rufen scheinen",
      "enthält Forschungen für einen zufälligen Zauberspruch",
      "enthält den Standort eines verlorenen Relikts",
      "enthält den wahren Namen eines planaren Wesens",
      "enthält den Ort eines Verlieses",
      "enthält das Rezept für ein Gift",
      "enthält das Rezept für einen Zaubertrank",
      "enthält eine Todesprophezeiung für den Leser",
  ]
  
  var bookInteresting = [
  
  
  ]
  
  // here starts actual code
  
  function bookAgeGen(){
      let bookAgePercentage = Math.floor(Math.random() * 101);
      if(bookAgePercentage <11){
          bookAge = "vor kurzem geschriebene";
          bookValue -= 5;
        }
        else if(bookAgePercentage < 60){
          bookAge = "nicht sehr alte";
          bookValue += 0;
        }
        else if(bookAgePercentage < 95){
          bookAge = "in die Jahre gekommene";
          bookValue += 10;
        }
        else if(bookAgePercentage < 99){
          bookAge = "sehr alte";
          bookValue += 25;
        }
        else if(bookAgePercentage < 100){
          bookAge = "antike";
          bookValue += 50;
        }
        return bookAge;
  }
  
  //Book Quality
  function bookQualityGen(){
    var bookQualityPercentage = Math.floor(Math.random() * 99);
    if(bookQualityPercentage < 4){
      bookQuality = "ist in einem nahezu perfektem Zustand.";
      bookValue += 50;
    }
    else if(bookQualityPercentage < 51){
      bookQuality = "ist in guter Qualität. Es wurde mehrfach durchgeblättert, ist aber sonst in einem guten Zustand.";
      bookValue += 26;
    }
    else if(bookQualityPercentage < 81){
      bookQuality = "ist von zweifelhafter Qualität. Es ist an einigen Stellen ziemlich stark eingerissen oder fleckig. Einige Seiten fehlen.";
      bookValue += 13;
    }
    else if(bookQualityPercentage < 100){
      bookQuality = "ist zerrissen, fleckig oder verkohlt, der größte Teil ist bis zur Unlesbarkeit entstellt.";
      bookValue += 1;
    }
    return bookQuality;
  }
  
  function RandomProbabilityGen(input){
      var array = []; // Just Checking...
      for(var item in input) {
          if ( input.hasOwnProperty(item) ) { // Safety
              for( var i=0; i<input[item]; i++ ) {
                  array.push(item);
              }
          }
      }
      // Probability Fun
      return array[Math.floor(Math.random() * array.length)];
  }
  
  function bookTitelGen(bookType){
  
    var titelString ="";
  
    if (bookType == 1){
      var keys = Object.keys(biographyTitel2);
      var len = keys.length;
      var rnd = Math.floor(Math.random() * len);
      var key = keys[rnd];
  
      Titel1 = biographyTitel1;
      Titel2 = biographyTitel2;
      Titel3 = biographyTitel3;
      Titel4 = biographyTitel4;
      bookMeaning = "Dieses Buch ist ein Bericht über das Leben eines anderen."
      bookValue += 14;
      if (Titel2[keys[rnd]] == "x"){
        titelString = artikel[Titel2[keys[rnd]]] +" "+ Titel1[Math.floor(Math.random() * Titel1.length)] +"n " + key + " " + Titel3[Math.floor(Math.random() * Titel3.length)] + ": " + Titel4[Math.floor(Math.random() * Titel4.length)]+ "";
      }
      else {
        titelString = artikel[Titel2[keys[rnd]]] +" "+ Titel1[Math.floor(Math.random() * Titel1.length)] +" " + key + " " + Titel3[Math.floor(Math.random() * Titel3.length)] + ": " + Titel4[Math.floor(Math.random() * Titel4.length)]+ "";
      }
    }
    else if (bookType == 2){
      Titel1 = bestiaryTitel1;
      Titel2 = bestiaryTitel2;
      Titel3 = bestiaryTitel3;
      Titel4 = bestiaryTitel4;
      bookMeaning = "Dieses Buch gibt Ratschläge und Taktiken gegen eine bestimmte Art von Kreatur."
      bookValue += 56;
      titelString = Titel1[Math.floor(Math.random() * Titel1.length)] +" " + Titel2[Math.floor(Math.random() * Titel2.length)] + " " + Titel3[Math.floor(Math.random() * Titel3.length)] + Titel4[Math.floor(Math.random() * Titel4.length)] + "";
    }
    else if (bookType == 3){
      bookMeaning = "Dieses Buch ist ein wenig auffälliger als die meisten anderen weltlichen Bücher."
      titelString = interestingTitel[Math.floor(Math.random() * interestingTitel.length)] + "";
    }
    else if (bookType == 4){
      Titel1 = cookingTitel1;
      Titel2 = cookingTitel2;
      Titel3 = cookingTitel3;
      bookValue += 13;
      bookMeaning = "In diesem Buch lernt man, wie man Gerichte aus einer bestimmten Region oder Kultur kocht und zubereitet.";
      titelString = Titel1[Math.floor(Math.random() * Titel1.length)] +" " + Titel2[Math.floor(Math.random() * Titel2.length)] + Titel3[Math.floor(Math.random() * Titel3.length)]+ "";
    }
    else if (bookType == 5){
      var keys = Object.keys(fictionTitel2);
      var len = keys.length;
      var rnd = Math.floor(Math.random() * len);
      var key = keys[rnd];
      bookValue += 23;
      
      Titel1 = fictionTitel1;
      Titel2 = fictionTitel2;
      Titel3 = fictionTitel3;
      randomTitel1 = Titel1[Math.floor(Math.random() * Titel1.length)]
      bookMeaning = "Es scheint sich um ein fiktionales Werk zu handeln.";
      titelString = randomTitel1[Titel2[keys[rnd]]] + key + " ("+Titel3[Math.floor(Math.random() * Titel3.length)]+")"+ "";
    }
    else if (bookType == 6){
      bookMeaning = "Dieses Buch soll einen Einblick in eine bestimmte Region oder Landform und die Gefahren geben, die sie enthalten kann.";
      var keys = Object.keys(guideTitel2);
      var len = keys.length;
      var rnd = Math.floor(Math.random() * len);
      var key = keys[rnd];
      bookValue += 46;
      Titel1 = guideTitel1;
      Titel2 = guideTitel2;
      Titel3 = guideTitel3;
      //Titel2[keys[rnd]]
      LocationTitel = guideTitel4[Math.floor(Math.random() * guideTitel4.length)]
      
      titelString=Titel1[Math.floor(Math.random() * Titel1.length)] +" " + key +" "+LocationTitel[Titel2[keys[rnd]]]+ Titel3[Math.floor(Math.random() * Titel3.length)] + "";
    }
    else if (bookType == 7){
      bookMeaning = "Bei diesem Buch handelt es sich um eine schriftliche Sammlung von Lehren einer bestimmten religiösen Organisation.";
      bookValue += 5;
      religious1 = Math.floor(Math.random() * religiousBook1.length);
      religious2 = Math.floor(Math.random() * religiousBook2.length);
      religious3 = Math.floor(Math.random() * religiousBook3.length);
      titelString = religiousBook1[religious1] + " " + religiousBook2[religious2] + " " + religiousBook3[religious3] + ""; 
    }
    else if (bookType == 8){
      bookMeaning = "Dieses Buch ist dazu gedacht, einer Person eine bestimmte Fähigkeit beizubringen. Es funktioniert im wesentlichen wie ein <a href='https://2e.aonprd.com/Equipment.aspx?ID=64'> [Scholarly Journal] </a>.";
      bookValue = 600;
      skill1 = Math.floor(Math.random() * skillBook1.length);
      skill2 = Math.floor(Math.random() * skillBook2.length);
      skill3 = Math.floor(Math.random() * skillBook3.length);
      titelString = skillBook1[skill1] + " " + skillBook2[skill2] + " " + skillBook3[skill3] + "";
    }
    else if (bookType == 9){
      bookMeaning = "Dieses Buch ist höchstwahrscheinlich in den meisten Regionen verboten, da es böse Magie oder Wissen enthalten kann. Seien Sie vorsichtig, wenn Sie mit diesem Buch umgehen. Dieses Buch enthält scheinbar verbotenes Wissen über "+Titel3[Math.floor(Math.random() * Titel3.length)]+".";
      bookValue += 66;
      var keys = Object.keys(forbidden2);
      var len = keys.length;
      var rnd = Math.floor(Math.random() * len);
      var key = keys[rnd];
      
      
      Titel1 = forbidden1;
      Titel2 = forbidden2;
      Titel3 = forbidden3;
      randomTitel1 = Titel1[Math.floor(Math.random() * Titel1.length)]
    
      titelString = randomTitel1[Titel2[keys[rnd]]] + key + ".";
    }
    return titelString;
  }
  
  function createBook(){
    // just clear all variables before creating (just in case)  
    bookValue = 0;
    bookType ="";
    bookTitle = "";
    bookAge = "";
    bookDescription = "";
    bookPages = 0;
  
    // Do actual stuff
    bookAge = bookAgeGen();
    bookQuality = bookQualityGen();
    bookLanguage = RandomProbabilityGen(bookLanguageArray);
    bookPages = Math.floor(Math.random() * 1000);
    randombookFeature = Math.floor(Math.random() * (bookFeatures.length));
    bookFeature = bookFeatures[randombookFeature];
    bookType = RandomProbabilityGen(bookTypeArray);
    if(bookType == 9){
      bookFeature = forbiddenFeatures[Math.floor(Math.random() * (forbiddenFeatures.length))];
    }
    bookTitel = bookTitelGen(bookType);
  
    bookText = "Dieses " + bookAge + " Buch " + bookQuality + " Es ist in " + bookLanguage + " verfasst und enhält " + bookPages + " Seiten."
    bookText += " Es " + bookFeature + " und auf dem Einband steht: <b>'" + bookTitel + "'</b>";
    
    goldValue = Math.floor(bookValue/100)
    silverValue = Math.floor(bookValue/10) - (goldValue*10)
    copperValue = bookValue - (silverValue*10) - (goldValue*100)
    bookValueasText = "Du schätzt es auf einen ungefähren Wert von: "+ String(goldValue) +" GM, " + String(silverValue) + " SM, "+String(copperValue)+ " KM"
    
    return "<br>" + bookText + "<br><br>" + bookMeaning + "<br><br>" + bookValueasText + "<br><br>"
  }
  
  function createUI(){
    applyChanges = false
    new Dialog({
      title:"Here is your book:",
      content: createBook(),
      buttons: {
          no: {
            icon: "<i class='fas fa-times'></i>",
            label: `Thank you good bye (Dismiss the result)`
          },
          yes: {
            icon: "<i class='fas fa-times'></i>",
                  label: `Add to selected Actor`,
                  callback: () => applyChanges = true
          }
        },
      default: "no",
      close: html => {
        if (applyChanges) {
          if (!actor) {
            ui.notifications.warn("You must have an actor selected.");
            return;
          }
          actor.addToInventory(
            {
              "img": bookImages[Math.floor(Math.random() * bookImages.length)],
              "name": bookTitel,
              "system": {
                "description": {
                  "value": "<p>" + bookText + "</p>" + "<p>" + bookMeaning + "</p>"
                },
                "source": {
                  "value": "SegaSurfers - Create a Book Macro"
                },
                "traits": {
                  "value": [],
                  "rarity": "common",
                  "custom": "",
                  "otherTags": []
                },
                "rules": [],
                "slug": "illustrated-book",
                "schema": {
                  "version": 0.804,
                  "lastMigration": null
                },
                "quantity": 1,
                "baseItem": null,
                "hp": {
                  "brokenThreshold": 0,
                  "value": 0,
                  "max": 0
                },
                "hardness": 0,
                "weight": {
                  "value": "-"
                },
                "equippedBulk": {
                  "value": ""
                },
                "price": {
                  "value": {
                    "cp": copperValue,
                    "sp": silverValue,
                    "gp": goldValue
                  }
                },
                "equipped": {
                  "carryType": "worn",
                  "handsHeld": 0
                },
                "stackGroup": null,
                "negateBulk": {
                  "value": "0"
                },
                "containerId": null,
                "preciousMaterial": {
                  "value": ""
                },
                "preciousMaterialGrade": {
                  "value": ""
                },
                "size": "med",
                "identification": {
                  "status": "unidentified",
                  "unidentified": {
                    "name": bookTitel,
                    "img": "systems/pf2e/icons/unidentified_item_icons/adventuring_gear.webp",
                    "data": {
                      "description": {
                        "value": ""
                      }
                    }
                  },
                  "misidentified": {}
                },
                "usage": {
                  "value": ""
                },
                "level": {
                  "value": 0
                }
              },
              "type": "treasure",
              "flags": {
                "core": {
                  "sourceId": "Compendium.pf2e.equipment-srd.G5WuYX1ghrZcJ1J1"
                }
              },
              "effects": [],
              "folder": null,
              "sort": 0,
            })
        }
    }}).render(true)
  }
  
  
  // Initialize Variables
  var bookValue = 0;
  var bookType ="";
  var bookTitle = "";
  var bookAge = "";
  var bookDescription = "";
  var bookPages = 0;
  var randombookFeature =0;
  var bookMeaning = "";
  
  
  bookTypeArray = {
    1:20,
    2:10,
    3:0, //TODO
    4:10,
    5:10,
    6:10,
    7:10,
    8:10,
    9:2,
  }
  
  // Forge-standard-image-array
  bookImages =[
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/adventuring-gear/scholarly-journal-compendium.webp",
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/adventuring-gear/advanced-book-of-translation.webp",
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/adventuring-gear/basic-crafters-book.webp",
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/adventuring-gear/formula-book.webp",
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/adventuring-gear/pathfinder-chronicle.webp",
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/adventuring-gear/religious-text.webp",
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/adventuring-gear/rubbing-set.webp",
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/adventuring-gear/scholarly-journal-compendium.webp",
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/adventuring-gear/scholarly-journal.webp",
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/adventuring-gear/spellbook.webp",
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/adventuring-gear/waterproof-journal.webp",
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/held-items/bestiary-of-metamorphosis.webp",
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/held-items/book-of-lingering-blaze.webp",
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/held-items/codex-of-unimpreded-sight.webp",
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/held-items/possibility-tome.webp",
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/held-items/storytellers-opus.webp",
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/held-items/thousand-blade-thesis.webp",
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/treasure/art-objects/greater-art-object/original-manuscript-from-a-world-famous-author.webp",
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/treasure/art-objects/major-art-object/previously-lost-volume-from-a-legendary-author.webp",
    "https://assets.forge-vtt.com/bazaar/systems/pf2e/assets/icons/equipment/treasure/art-objects/minor-art-object/illustrated-book.webp"
  ]
  
  createUI();