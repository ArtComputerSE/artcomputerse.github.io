# ArtComputer

Statisk kurskatalog för artcomputer.se. Innehåll och mallar finns i `web/`.
Det gamla materialet ligger i `old/` som referens; den nya webbplatsen
byggs till `_site/`. Redigera inte den genererade katalogen.

## Kör lokalt

Använd Node.js 22 LTS eller senare LTS-version. Kör i repositoryts rot:

```sh
npm ci
npm run dev
```

Öppna http://127.0.0.1:8080 (eller http://localhost:8080). Sidorna byggs om när du sparar.
Avsluta med Ctrl+C. För att enbart bygga statiska filer: `npm run build`.
Produktionsbygget tömmer först `_site/` för att undvika kvarlämnade filer.
Kör sedan `npm run check:build` för att kontrollera publicerade filer,
interna länkar, CNAME och frånvaro av arbetsfiler.

## Lägg till eller ändra en kurs

Varje kurs är en Markdown-fil i `web/kurser/`. Kopiera exempelvis
`projektledning.md` till `din-kurs.md` och ändra metadata och innehåll:

```md
---
title: Kursens namn
description: Kort beskrivning för sökmotorer.
category: Ämnesområde
summary: Kort text som visas i kurskatalogen.
---
## Om kursen

Kursens innehåll i Markdown.
```

Kursen visas automatiskt i katalogen i alfabetisk ordning och får adressen
`/kurser/din-kurs/`. Mall och märkning ärvs från `kurser.json`.
Använd helst små bokstäver, a–z och bindestreck i filnamn.

För en nedladdningsbar kursbeskrivning, lägg en PDF med samma filnamn bredvid kursfilen:
`web/kurser/projektledning.md` och `web/kurser/projektledning.pdf`.
Kurssidan visar då automatiskt **Ladda ner kursbeskrivning (PDF)**. Utan PDF visas ingen
nedladdningslänk. Ingen extra metadata behövs. PDF-filen kopieras till
`/kurser/projektledning.pdf` och ändringar upptäcks vid lokal förhandsvisning.

## Övrigt innehåll

- Startsida: `web/index.njk`
- CV: `web/cv.md`
- Kontakt: `web/kontakt.njk`
- Gemensamma kontaktuppgifter: `web/_data/site.json`
- Sidmallar: `web/_includes/`
- Utseende och mobilanpassning: `web/assets/site.css`

CV:t är ett svenskt urval ur det befintliga CV:t, inte en uppdatering av
anställningshistoriken. Den tidigare PDF-filen kopieras inte till den nya
webbplatsen eftersom den innehåller Agical-hänvisningar. Originalet ligger kvar
i `old/cv/`. Länken till artiklarna på Agical finns kvar i CV:t.
Telefon och LinkedIn är återanvända från det gamla CV:t.
E-postadressen är `per@artcomputer.se`, angiven i `web/_data/site.json`.
Den visas automatiskt på kontaktsidan.
Äldre fristående verktyg ligger i `old/` och publiceras inte. Aktuell logotyp,
favicon, apple-touch och övriga plattformsikoner behålls och kopieras till bygget.

## Teknikval

Eleventy genererar vanlig HTML från Markdown och Nunjucks-mallar.
Det behövs varken JavaScript i besökarens webbläsare, databas eller serverkod.
Handskriven HTML skulle kräva dubblerad navigation och manuellt underhåll av
kursöversikten. Astro kan också generera statiska Markdown-sidor, men dess
komponentmodell och möjlighet till interaktivitet behövs inte här.
Eleventy räcker för katalogen och har en enda direkt utvecklingsdependency.

Referenser: [Eleventy](https://www.11ty.dev/),
[Astros sidmodell](https://docs.astro.build/en/basics/astro-pages/).

## GitHub Pages – senare publicering

Ingen publicering har utförts i samband med ombyggnaden. Arbetet ligger på
`redesign`. `CNAME` är fortsatt `artcomputer.se` och kopieras till bygget.
Nuvarande Pages-inställning på GitHub har inte kunnat verifieras.

När versionen är granskad och ska publiceras:

1. Välj **GitHub Actions** som källa under repositoryts **Settings → Pages**
   innan någon push till `master`, så att gammal branchpublicering inte startar.
   Behåll den anpassade domänen `artcomputer.se` och befintlig DNS.
2. För in den godkända versionen i `master` och pusha den.
3. Kör **Publicera GitHub Pages manuellt** från `master` under **Actions**.

Workflow-filen körs endast manuellt och avvisar andra brancher än `master`.
Den bygger `_site/` och publicerar det som ett Pages-artifact. Ingen push
utlöser workflow-filen. Byggfiler behöver inte committas. Kontrollera domän
och HTTPS under Pages vid den framtida övergången.
CNAME finns med i bygget men styr inte domänen när GitHub Actions används;
domänen måste finnas i GitHubs Pages-inställning.
Se `PUBLICERING.md` för granskningsresultat och den förberedda övergången.

Den äldre Elm-klockan ingår inte i publiceringsbygget. Källfilerna ligger i
`old/` som historiskt material.
