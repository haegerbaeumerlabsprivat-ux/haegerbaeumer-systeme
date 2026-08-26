# Website-Qualitätskriterien

Beim Erstellen/Weiterentwickeln dieser Webseite IMMER folgende Kriterien beachten.

## Grundprinzip

Schönes Design ist kein Selbstzweck. Jedes Element muss eine nachvollziehbare Aufgabe für den
Besucher UND für das Geschäft erfüllen.

**Zentrale Prüf-Frage für jeden Abschnitt:** „Hilft dieser Abschnitt dabei, den richtigen Besucher
einen Schritt näher zu einer qualifizierten Anfrage oder einem Termin zu bringen?“ Wenn nicht:
kürzen, umbauen oder streichen.

## Sprache & Versprechen — nicht überversprechen

- Die Webseite selbst **gewinnt keine Kunden** — sie **qualifiziert Anfragen** und leitet bei
  echtem Interesse weiter (Kontakt, Termin). Den eigentlichen Abschluss macht immer noch ein Mensch.
- Formulierungen entsprechend wählen: „Anfragen qualifizieren“, „Interesse einordnen“,
  „Termin ermöglichen“ statt „Kunden gewinnen“, „aktiv verkaufen“.
- Keine erfundenen Statistiken, keine fiktiven Kundenzitate/-logos, solange keine echten vorliegen.
  Lieber ehrliche Vertrauenspunkte (Prozess, Ansprechpartner, Datenschutz) als erfundener Social Proof.

## 1. Angebot & Zielgruppe

- Klares Angebot: Besucher verstehen sofort, was das Unternehmen anbietet.
- Klare Zielgruppe: Der richtige Besucher erkennt „Das ist für mich.“
- Starker, konkreter Nutzen statt allgemeiner Marketing-Floskeln.
- Starke Hero-Section: Die wichtigsten Informationen stehen direkt am Anfang, ohne Scrollen sichtbar.

## 2. Struktur & Seitenaufbau

- Logischer Aufbau: **Interesse (Hero) → Nutzen (Leistungen) → Vertrauen → Ablauf/Einwände (FAQ) → Handlung (CTA) → Footer**
- Der werbliche Haupt-CTA („Kostenloses Erstgespräch“ o. ä.) steht NICHT gleich im Hero, sondern erst
  als starker Abschluss am Seitenende, nachdem Vertrauen aufgebaut und Einwände beantwortet wurden.
  Der Hero darf einen sanfteren Einstiegs-Button haben (z. B. „Leistungen ansehen“).
- Above the fold: Hauptüberschrift, kurzer Nutzenversprechen-Satz, ein Einstiegs-Button.
- Nur EIN primärer CTA-Button-Typ, der sich farblich klar abhebt.

## 3. Vertrauen & Überzeugung

- Vertrauensaufbau: echte Bewertungen, Referenzen, Kundenlogos, Zertifizierungen, Ansprechpartner —
  **nur wenn tatsächlich vorhanden.** Sonst ehrliche Alternativen (Prozess-Transparenz, direkter
  Ansprechpartner, DSGVO-Konformität) statt erfundener Testimonials.
- Einwände vorwegnehmen (FAQ): typische Fragen/Bedenken vor der Kontaktaufnahme beantworten.
- Angebot verständlich erklären: Besucher weiß genau, was er bekommt und wie es abläuft.
- Keine Stockfotos, die generisch wirken — lieber einfache, klare Gestaltung.

## 4. Conversion & Terminbuchung

- Klarer Call-to-Action: nächster Schritt ist eindeutig (z. B. „Termin buchen“).
- Sinnvoll platzierte CTAs an passenden Stellen im Lesefluss, nicht nur ganz oben.
- Niedrige Hürde: Kontaktaufnahme/Terminbuchung einfach und unkompliziert.
- Konkreter Grund für den Termin: Besucher weiß, welchen Nutzen das Gespräch hat.
- Formularfelder minimal halten (Name, Kontakt, kurze Nachricht — nicht mehr als nötig), bei Bedarf
  gezielt qualifizierende Zusatzfragen, damit passende Leads entstehen.
- Klares Feedback nach dem Absenden (Erfolgsmeldung, keine stille Weiterleitung).
- Formular sendet per `fetch POST` an die n8n-Webhook-URL; Fehlerfall abfangen (Nutzer sieht Meldung,
  falls Versand fehlschlägt).

## 5. Technik – Performance

- Bilder komprimiert und im WebP-Format ausliefern.
- Kein unnötiges JavaScript oder große Libraries laden.
- Lazy Loading für Bilder unterhalb des ersten Screens.
- Ziel: Ladezeit unter 2 Sekunden (Core Web Vitals im Blick behalten).

## 6. Technik – Mobile & Responsive

- Mobile-first entwickeln, danach für Desktop erweitern.
- Buttons und Formularfelder auf dem Handy gut antippbar (min. 44×44 px).
- Text auf allen Bildschirmgrößen ohne Zoomen lesbar; fehlerfreie Darstellung auf verschiedenen
  Bildschirmgrößen.

## 7. SEO-Grundlagen

- Aussagekräftiger `<title>`-Tag und Meta-Description pro Seite.
- Eine einzige `<h1>`, danach saubere `<h2>`/`<h3>`-Struktur.
- Alt-Texte für alle Bilder.
- Semantisches HTML nutzen (`<header>`, `<main>`, `<section>`, `<footer>` statt nur `<div>`).

## 8. Rechtliches (Deutschland – Pflicht!)

- Impressum-Seite mit vollständigen Anbieterangaben verlinkt (Fußzeile, jede Seite erreichbar).
- Datenschutzerklärung verlinkt, die exakt beschreibt, was mit Formulardaten passiert.
- Cookie-Consent-Banner, falls Tracking-Tools (z. B. Google Analytics) genutzt werden.
- Formular darf Daten nur mit expliziter Einwilligung (Checkbox) speichern (DSGVO).

## 9. Barrierefreiheit (Accessibility)

- Ausreichender Farbkontrast zwischen Text und Hintergrund.
- Formularfelder mit echten `<label>`-Tags verknüpft.
- Seite auch per Tastatur bedienbar (sinnvolle Tab-Reihenfolge).

## 10. Messung & Optimierung

- Tracking und Messbarkeit einplanen: Besucher, CTA-Klicks, Anfragen, Terminbuchungen — aber nur mit
  sauberem Cookie-Consent, falls personenbezogen/Drittanbieter (siehe Punkt 8).
- Nach dem Livegang nicht „fertig bauen und vergessen“ — Website anhand echter Daten weiter optimieren.

## 11. Vor dem Live-Gang prüfen

- Funktioniert das Formular wirklich End-to-End (Test-Eintrag durchschicken)?
- Öffnet die Seite auf Handy UND Desktop korrekt?
- Sind Impressum/Datenschutz/AGB erreichbar?
- Sind alle Links funktionsfähig (keine toten Links)?
- Übertreibt kein Text die tatsächliche Leistung der Webseite (siehe „Sprache & Versprechen“)?
