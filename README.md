# Site de Casamento — Mary & Oli

Site estático (HTML, CSS e JavaScript puros, sem necessidade de build) para o casamento.

## Estrutura

```
index.html        Página principal
css/styles.css     Estilos
js/main.js         Contagem decrescente, menu, animações e formulário RSVP
images/            Coloquem aqui as vossas fotos
```

## Como personalizar

1. **Nomes**: procurem por "Mary" e "Oli" em `index.html` e substituam.
2. **Data e local**: em `index.html`, secção `#detalhes` e `#inicio` (hero). Em `js/main.js`, alterem a constante `WEDDING_DATE` no topo do ficheiro (formato `"AAAA-MM-DDTHH:MM:SS"`) para a contagem decrescente ficar correta.
3. **Fotos**: coloquem as imagens na pasta `images/` e substituam os blocos `.placeholder-media` em `index.html` (secções "Nossa História" e "Galeria") por `<img src="images/a-vossa-foto.jpg" alt="..." />`.
4. **IBAN / Lista de presentes**: alterem o valor em `#ibanValue` na secção `#presentes`.
5. **Cores**: no topo de `css/styles.css`, na secção `:root`, alterem `--color-gold`, `--color-bg`, etc.

## Confirmação de presença (RSVP)

O formulário funciona no browser, mas para receberem as respostas por email é preciso ligar a um serviço, já que este é um site estático sem servidor próprio:

1. Criem uma conta gratuita em [Formspree](https://formspree.io).
2. Criem um formulário e copiem o vosso endpoint (algo como `https://formspree.io/f/xxxxxxx`).
3. Em `js/main.js`, colem esse endpoint na constante `FORMSPREE_ENDPOINT`.

Sem esta configuração, o formulário apenas mostra uma mensagem de confirmação local (não é enviado para lado nenhum).

## Como publicar o site (grátis)

**Opção 1 — GitHub Pages:**
1. Façam push deste repositório para o GitHub.
2. Nas definições do repositório, vão a "Pages" e escolham a branch atual como origem.
3. O site fica disponível em `https://<utilizador>.github.io/<repositorio>/`.

**Opção 2 — Netlify / Vercel:**
Arrastem a pasta do projeto para [Netlify Drop](https://app.netlify.com/drop) ou liguem o repositório GitHub a um novo projeto Vercel/Netlify — ambos fazem deploy automático a cada `git push`.

## Testar localmente

Basta abrir `index.html` diretamente no browser, ou correr um servidor local:

```bash
python3 -m http.server 8000
```

e visitar `http://localhost:8000`.
