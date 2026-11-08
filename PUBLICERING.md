# Förberedd publicering av ArtComputer

Ingen sammanslagning, push, inställningsändring eller publicering har
utförts. Förberedelserna hör till `redesign`.

## Utgångsläge

Vid kontrollen 2026-11-08 pekade `master`, `redesign` och GitHubs `master` på
`4fb185095d3e396a2b138dc532ddf9aede68ab07`. Webbplatsändringarna är ännu inte
committade vid denna inledande kontroll. Ingen divergens fanns då, men
kontrollen måste upprepas före merge.
GitHub bekräftar att Pages finns och att standardbranchen är `master`.
Den faktiska Pages-källan, domäninställningen, miljöreglerna och HTTPS-inställningen
kunde inte läsas via det oautentiserade API:t (404).

## Det som ska ingå i ändringscommiten

Endast följande sökvägar ska läggas till:

```text
.gitignore
.github/workflows/pages.yml
README.md
PUBLICERING.md
package.json
package-lock.json
eleventy.config.cjs
scripts/build.mjs
scripts/check-build.mjs
web/
old/
```

Dessutom ska flyttarna av gamla filer från roten och de tidigare katalogerna
ingå. De ursprungliga sökvägarna tas bort ur Git i samma commit som innehållet
läggs till i `old/`. Inga av de arkiverade filerna ingår i Pages-artifacten.

`web/` innehåller sidmallar, innehåll, CSS, kontaktuppgifter och kursens PDF.
Granska exakt filförteckning och diff före commit. Använd inte `git add .` eller
`git commit -a`: `.idea/workspace.xml` och den ospårade
`.idea/copilot.data.migration.agent.xml` ska lämnas utanför. Befintliga spårade
IDE-filer ligger kvar i repositoryt men publiceras inte.
`node_modules/` och `_site/` är ignorerade och ska inte committas.

## Bygge och publicerade filer

```sh
npm ci
npm run build
npm run check:build
```

Bygget rensar `_site/` före generering. Kontrollen granskar tillåtna sökvägar,
filtyper, interna HTML-länkar och resurser, CNAME samt frånvaro av symboliska
och hårda fillänkar. Workflowen stoppar före uppladdning om kontrollen misslyckas.

Det granskade bygget innehåller 21 filer, cirka 0,25 MiB, med 79 kontrollerade
interna referenser. `CNAME` innehåller exakt `artcomputer.se` och `.nojekyll`
finns med. Inga `.idea`, Git-filer, npm-paket, Markdown-källor, XCF-arbetsfiler
eller den tidigare CV-PDF:en finns i publiceringskatalogen.

Publiceringen innehåller:

- Startsida, kursen Projektledning, CV, kontakt och 404-sida.
- CSS, befintlig logotyp, företagets ikonbild och kursbeskrivningens PDF.
- Hela det befintliga ikonpaketet: favicon, apple-touch, Android-, Safari- och
  Windows-ikoner samt `manifest.json` och `browserconfig.xml`.

Klockan, Sudoku och övriga tidigare fristående sidor ingår inte i publiceringen.
Materialet ligger i `old/`. Deras gamla direktadresser upphör vid publicering.

Gamla HTML-filer och CV-material finns i `old/` som referensmaterial. De nya
sidorna genereras från `web/`; arkivet kopieras inte till publiceringen.

## Pages-workflow

`.github/workflows/pages.yml` körs endast via `workflow_dispatch` och endast
från `master`. Det finns ingen push-trigger. Byggjobbet använder Node 22,
`npm ci`, rent produktionsbygge och kontroll av resultatet. Endast `_site/`
laddas upp, inklusive `.nojekyll`.

Action-versionerna är `checkout@v6`, `setup-node@v7`, `configure-pages@v5`,
`upload-pages-artifact@v4` och `deploy-pages@v4`. Bygget har `contents: read`
och `pages: read`. Deploy-jobbet har `pages: write` och `id-token: write`,
väntar på bygget och använder miljön `github-pages`. Inga egna hemligheter
eller personliga åtkomsttoken behövs. Workflowen är granskad lokalt men har
inte körts på GitHub.

## Steg efter uttryckligt godkännande

1. Kontrollera den avgränsade ändringscommiten på `redesign`. Lämna `.idea`
   utanför. Om arbetet görs i en separat ren checkout kan lokala IDE-ändringar
   lämnas på plats utan stash eller återställning.
2. Kontrollera aktuell `origin/master` och granska diffen för den godkända
   commiten. Om master har ändrats behöver integrationen kontrolleras igen.
3. Under **Settings → Actions → General**, kontrollera att GitHub Actions och
   de officiella `actions/*`-åtgärderna är tillåtna. Ingen generell höjning av
   alla workflows till skrivbehörighet behövs; filen anger nödvändiga rättigheter.
4. Under **Settings → Pages → Build and deployment → Source**, välj
   **GitHub Actions innan någon push till master**. Det undviker att den gamla
   branchpubliceringen körs vid övergången. Starta inte en föreslagen
   starter-workflow och skapa ingen extra Jekyll-workflow.
5. Kontrollera **Custom domain: artcomputer.se** och behåll befintlig fungerande
   DNS. CNAME-filen bevaras men GitHub Actions använder domänen i inställningarna.
   Kontrollera **Enforce HTTPS** och DNS-/certifikatstatus.
6. Kontrollera **Settings → Environments → github-pages**: `master` ska vara
   tillåten publiceringsbranch. Eventuella befintliga granskarregler gäller även
   den manuella körningen.
7. För in den godkända commiten i `master` och pusha. Med nuvarande historik
   väntas en fast-forward vara möjlig. Utför detta först efter godkännande.
8. Under **Actions → Publicera GitHub Pages manuellt → Run workflow**, välj
   `master`. Detta är det steg som faktiskt startar den nya publiceringen.
9. Kontrollera lyckade build/deploy-jobb, https://artcomputer.se, kurssidan,
   PDF-nedladdningen, kontaktuppgifterna och ikonfilerna.

Steg 3–9 har inte utförts. Befintlig publik webbplats har inte ändrats.

## Källor för GitHub-inställningarna

- [Egna Pages-workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Publiceringskälla](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Anpassad domän](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
