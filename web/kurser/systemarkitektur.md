---
title: Systemarkitektur – egenskaper, avvägningar och beslut
description: En kurs i systemarkitektur för utvecklare, med fokus på kvalitetskrav, arkitekturella beslut, olika arkitekturvyer och utvärdering av systemets egenskaper.
category: Systemutveckling
summary: Kursen behandlar hur systemarkitektur utformas, beskrivs och utvärderas utifrån de egenskaper ett system behöver ha. Vi arbetar med kvalitetskrav, arkitekturella avvägningar och olika vyer av arkitekturen, med fokus på hur tekniska beslut påverkar systemets egenskaper.
---

## Om kursen

Systemarkitektur handlar om att utforma system som uppfyller både funktionella krav och krav på egenskaper som säkerhet, testbarhet, tillgänglighet, underhållbarhet, prestanda, användbarhet och skalbarhet.

Det finns ingen arkitektur som är bäst i alla situationer. Olika lösningar har olika styrkor och svagheter, och arkitekturella beslut innebär ofta avvägningar mellan motstridiga behov.

Kursen ger systemutvecklare verktyg för att resonera om sådana beslut, beskriva arkitekturer och utvärdera hur väl de stödjer systemets mål och verksamhetens behov.

## Kursinnehåll

### Systemets egenskaper

Vi utgår från sju centrala systemegenskaper, sammanfattade i STAMPUS:

- **Säkerhet** – att skydda systemet och dess information.
- **Testbarhet** – att kunna verifiera systemets funktion och beteende.
- **Tillgänglighet** – att systemet kan användas när det behövs.
- **Underhållbarhet** – att kunna förstå, förändra och vidareutveckla systemet.
- **Prestanda** – att systemet använder resurser effektivt och uppfyller krav på svarstider och kapacitet.
- **Användbarhet** – att systemet fungerar väl för sina användare.
- **Skalbarhet** – att kunna hantera förändringar i belastning och omfattning.

Vi diskuterar hur egenskaperna kan uttryckas som krav, hur de kan mätas och hur de påverkar varandra.

### Arkitekturella beslut och avvägningar

Vi undersöker hur olika arkitekturella lösningar påverkar systemets egenskaper.

Exempel på frågor som behandlas:

- Hur påverkar modularisering och beroenden systemets underhållbarhet och testbarhet?
- När är en distribuerad arkitektur motiverad?
- Hur påverkas säkerhet, tillgänglighet och prestanda av olika tekniska val?
- Hur kan vi identifiera och hantera målkonflikter mellan egenskaper?
- Hur motiverar vi arkitekturella beslut utifrån systemets behov?

### Att beskriva arkitekturen

En arkitektur behöver kunna förstås och diskuteras av andra än den som utformat den.

Vi använder Philippe Kruchtens 4+1-modell för att beskriva systemet ur olika perspektiv:

- **Logisk vy** – systemets struktur, ansvarsfördelning och samverkan mellan delar.
- **Processvy** – systemets beteende under körning, samtidighet och kommunikation.
- **Utvecklingsvy** – hur systemet är organiserat i moduler och kod.
- **Fysisk vy** – hur systemets delar placeras och körs i den tekniska miljön.
- **Scenarier** – konkreta användningsfall som binder samman och prövar de olika vyerna.

Vi arbetar med att välja relevanta vyer och beskriva dem med lämpliga diagram.

### Att utvärdera arkitekturen

De olika arkitekturvyerna ger också underlag för att analysera systemets egenskaper.

Vi undersöker exempelvis hur säkerhet påverkas av ansvarsfördelning och driftsättning, hur skalbarhet påverkas av samtidighet och distribution samt hur underhållbarhet påverkas av systemets modularisering.

Genom att kombinera arkitekturvyer med STAMPUS kan vi identifiera styrkor, svagheter och målkonflikter samt diskutera möjliga förbättringar.

Vi behandlar också skillnaden mellan bedömningar och mätbara resultat, och hur arkitekturella antaganden kan verifieras.

## Målgrupp

Kursen riktar sig till systemutvecklare som vill fördjupa sin förståelse för systemarkitektur och kunna delta aktivt i arkitekturella diskussioner och beslut.

## Arbetsformer

Kursen kombinerar teori, diskussioner och praktiska övningar.

Deltagarna får arbeta med att identifiera och prioritera systemegenskaper, beskriva arkitektur med olika vyer samt analysera och jämföra alternativa lösningar.

Tyngdpunkten ligger på att förstå konsekvenserna av arkitekturella beslut och kunna motivera dem utifrån systemets behov.