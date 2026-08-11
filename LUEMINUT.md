# Will·e – etusivu (will-e.app)

Staattinen sivusto GitHub Pagesille. Ei build-vaihetta, ei riippuvuuksia.
Rakenne on sama kuin vividvocab.com:issa: hero → faktanauha → kuusi
vuorottelevaa ominaisuuslohkoa → vanhemmille → hinta → loppu-CTA → footer.

## Mitä tähän pakettiin kuuluu

```
index.html            suomenkielinen etusivu    -> KORVAA nykyisen
en/index.html         englanninkielinen etusivu -> UUSI kansio
tietosuoja.html       tietosuojaseloste (FI)    -> KORVAA nykyisen
kayttoehdot.html      käyttöehdot (FI)          -> KORVAA nykyisen
privacy.html          privacy policy (EN)       -> KORVAA nykyisen
terms.html            terms of service (EN)     -> KORVAA nykyisen
assets/style.css      koko sivuston tyylit      -> UUSI kansio
assets/site.js        App Store -napin tila
assets/icon.png       PLACEHOLDER (512×512)
assets/og-image.png   PLACEHOLDER (1200×630)
assets/shots/*.png    PLACEHOLDER, 7 kuvakaappausta
TEKSTIT.md            suomi–englanti-tekstitaulukko (ei mene sivustolle)
LUEMINUT.md           tämä tiedosto (ei mene sivustolle)
```

## Käyttöönotto repoon VillePerttilahti/wille-privacy

Koko sivusto käyttää nyt yhtä tyylitiedostoa, `assets/style.css`. Juuren
vanha `style.css` jää käyttämättömäksi — sen voi poistaa tai jättää
paikalleen, kumpikaan ei riko mitään.

**Älä koske:** `CNAME`, `README.md`.

**Korvattavat:** `index.html` ja neljä legal-sivua. GitHub säilyttää
jokaisen version, joten vanhaan pääsee aina takaisin Commits-välilehdeltä.

Selaimessa:

1. Repon etusivulla **Add file → Upload files**
2. Raahaa koko paketin sisältö kerralla (kansiot `assets` ja `en` sekä
   kaikki viisi HTML-tiedostoa)
3. Commit-viesti, esim. `Uusi ulkoasu koko sivustolle`
4. **Commit changes**

Terminaalista, jos repo on koneella:

```
cp -R assets en *.html /polku/wille-privacy/
cd /polku/wille-privacy
git add -A && git commit -m "Uusi ulkoasu koko sivustolle" && git push
```

## Legal-sivujen sisältö

Tekstiä ei ole muutettu. Vaihdettu on vain kuori: `<head>`, ylätunniste,
alatunniste ja tyylitiedosto. Sisältö on poimittu alkuperäisistä
tiedostoista merkki merkiltä ja tarkistettu koneellisesti sen jälkeen —
näkyvä teksti ja kaikki `<h2 id="...">`-ankkurit ovat identtiset.

Jos päivität lakitekstiä myöhemmin, muokkaa suoraan näitä tiedostoja.
Sisältö on `<div class="legal"><div class="wrap">` -lohkon sisällä;
kaiken sen ulkopuolisen voi jättää rauhaan.

Uutta ulkoasussa: lapsille suunnattu laatikko (`class="kids"`) on nyt
korostettu liukuvärireunuksella ja kultaisella otsikolla, taulukot on
aseteltu tummalle taustalle, ja sivuille on tulostustyyli — selaimen
Tulosta tuottaa mustan tekstin valkoisella, ei tummaa taustaa.

## Osoitteet ja linkit

Kaikki sivujen väliset linkit käyttävät `.html`-päätettä, koska
legal-sivut ovat litteitä tiedostoja repon juuressa:

| Sivu | Osoite |
|---|---|
| Etusivu (FI) | `/` |
| Etusivu (EN) | `/en/` |
| Tietosuojaseloste | `/tietosuoja.html` |
| Käyttöehdot | `/kayttoehdot.html` |
| Privacy policy | `/privacy.html` |
| Terms of service | `/terms.html` |

**Huomio:** vanhoissa legal-sivuissa kielenvaihtolinkit osoittivat
päätteettömiin osoitteisiin (`/terms`, `/tietosuoja`). Jos päätteetön
muoto ei toimi Pagesissa, ne ovat olleet rikki. Uusissa sivuissa on
päätteet, jotka toimivat kummassakin tapauksessa.

Jos siirrät legal-sivut joskus kansiorakenteeseen — `privacy/index.html`
niin kuin teit `liity`-sivun kanssa — päätteet pitää poistaa. Ne ovat
jokaisen tiedoston ylätunnisteessa ja alatunnisteessa, ja lisäksi
etusivun Vanhemmille-osion pikkuprintissä.

## Tekstien muuttaminen

Kolme tapaa, helpoimmasta järeimpään.

**Yksi sana tai lause** — GitHubissa: avaa tiedosto, klikkaa kynäkuvaketta
oikeasta yläkulmasta, muokkaa, **Commit changes**. Sivu päivittyy noin
minuutissa.

**Isompi kierros** — paina näppäintä `.` repon etusivulla. Selaimeen
aukeaa VS Code (github.dev). Siinä on haku ja korvaus, joka toimii yli
molempien kielitiedostojen kerralla. Muutokset commitoidaan vasemman
laidan haarakuvakkeesta. Ei kloonausta, ei asennuksia.

**Paikallisesti** — klonaa repo, muokkaa millä editorilla haluat, ja
esikatsele ennen pushia:

```
python3 -m http.server 8000
```

Sitten selaimeen `http://localhost:8000`.

Kaikki sivulla näkyvät tekstit ovat `TEKSTIT.md`-taulukossa suomi ja
englanti rinnakkain, jotta toinen kieli ei unohdu.

## Julkaisupäivänä — yksi rivi

`assets/site.js`, rivi 11:

```js
var APP_STORE_URL = "https://apps.apple.com/app/idXXXXXXXXXX";
```

Kun kenttä ei ole tyhjä, kaikki kolme nappia molemmilla sivuilla vaihtuvat
"Tulossa App Storeen" -tilasta oikeaksi latauslinkiksi, ja "Julkaisu
elokuussa 2026" -huomautukset piiloutuvat. Muuta ei tarvitse tehdä.

Applen ohjeistus edellyttää, että julkaistuun appiin linkataan Applen omalla
virallisella "Download on the App Store" -merkillä. Nykyinen pilleri on
odotustilan ratkaisu — vaihda merkkiin siinä vaiheessa kun linkki on oikea.

## Kuvakaappausten vaihtaminen

Korvaa tiedostot samoilla nimillä. Kuvasuhde on App Storen 6.7" -koko
(1290 × 2796), joten ASC:hen tehdyt kuvat käyvät suoraan sellaisenaan.

| Tiedosto | Näkymä |
|---|---|
| `assets/shots/hero.png` | Etusivu (heron iso kuva) |
| `assets/shots/camera.png` | Koealueen kuvaaminen |
| `assets/shots/swipe.png` | Totta vai tarua |
| `assets/shots/challenge.png` | Kaverihaaste |
| `assets/shots/journey.png` | Avaruusmatka |
| `assets/shots/exam.png` | Koelaskuri etusivulla |
| `assets/shots/applock.png` | App Lock |

Jos jokin näkymä puuttuu vielä (esim. JourneyView), jätä placeholder
paikalleen — sivu ei hajoa.

## Värijärjestelmä

Kolme sääntöä, kaikki muu seuraa niistä. Määritelty `assets/style.css`
kohdassa 1.

**1. Tausta on lähes musta, ei violetti.** `#0A0810`. Neon ei erotu
värillisestä pohjasta — tämä oli ensimmäisen version virhe.

**2. Reunus on liukuväri, sama kaikkialla.** Magenta `#BF26B3` → violetti
`#7D3BED` → sininen `#2663EB`. Kaikki kolme ovat apin omia sävyjä. Sama
reunus kuvissa, hintakortissa, loppukortissa ja odotustilan napissa.
Toteutus on `padding` + `background`, ei `border` — `border-image` ei taivu
pyöristettyihin kulmiin luotettavasti.

**3. Hehku on ERI VÄRI kuin reunus.** Kulta `#FFD700`. Tämä on koko efektin
ydin: jos hehku olisi samaa väriä kuin reunus, se sulaisi siihen. Referenssi
tekee saman pinkillä reunuksella ja vihreällä hehkulla.

Kulta on sivun neonväri: otsikoiden toinen rivi (`<em>`), pysäkkipisteet,
hinta ja kaikki kuvien takaa tuleva valo. Muualla sitä ei käytetä — hohtava
teksti lakkaa merkitsemästä mitään jos sitä on joka paikassa.

Voimakkuutta säädetään kahdesta muuttujasta: `--rim-glow` (reunuksen oma
hohde) ja `.glow-wrap::before` sekä `.shot`in kultakerrokset.

## Muut suunnitteluperiaatteet

- **Rakeisuus.** `.grain` on kiinteä SVG-kohinakerros 4,2 %:n peitolla. Se
  pehmentää tasaiset mustat pinnat ja saa neonreunat näyttämään valolta
  eikä vektorilta.
- **Kallistus.** Kuvat on käännetty 2,5° tekstiä kohti, hero 3°.
- **Tunnusviiva.** Lohkon yllä on 128 px liukuväriviiva tekstitunnuksen
  sijaan — sama ratkaisu kuin referenssillä.
- **Pysäkkiviiva.** Ominaisuuslohkojen välissä kulkeva katkoviiva
  pisteineen on sivun oma tunnusmerkki: sivu on matka, kuten apin
  avaruuskartta. Tätä referenssillä ei ole.
- `prefers-reduced-motion` huomioitu, näppäimistöfokus näkyvissä, ei
  vaakavieritystä 360 px:iin asti.

## Mitä sivulla EI ole

Käyttäjäarvosteluja. VividVocabilla niitä on kaksi lohkoa, mutta Will·ellä ei
ole vielä arvosteluja — keksityt olisivat sekä epärehellisiä että
App Store -arvostelun kannalta riski. Tilalla on Vanhemmille-osio.
Kun oikeita arvosteluja tulee, ne sopivat luontevasti hinta-osion yläpuolelle.
