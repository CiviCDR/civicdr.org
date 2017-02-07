var mount = require('choo/mount')
var html = require('choo/html')
var css = require('sheetify')
var choo = require('choo')
var path = require('path')
var fs = require('fs')

;css('tachyons')
var style = css('./index.css')

var app = choo()

function mainView (state, prev, send) {
  addFont()

  return html`
    <body class='${style}'>
      ${intro()}
      ${about()}
      ${getInTouch()}
    </body>
  `
}

function intro () {
  var text = fs.readFileSync(path.join(__dirname, '/assets/intro.txt'), 'utf8')

  return html`
    <section class="pl5 pr5 pb5 pt2 bg-salmon">
      ${contact('white', '#contact', 'contact')}
      ${border('white')}
      <article class="f-5 tl mw8 lh-title white">${text}</article>
    </section>
  `
}

function about () {
  var about = fs.readFileSync(path.join(__dirname, '/assets/about.txt'), 'utf8')
  var aboutEmergency = fs.readFileSync(path.join(__dirname, '/assets/about-emergency.txt'), 'utf8')

  return html`
    <section class="pa5">
      ${border('salmon')}
      <article class="tl mw8 lh-copy">
        <h2 class="ttu fw7"> what we do </h2>
        <p class="f3">${about}</p>
        <br>
        <p class="f3">${aboutEmergency}</p>
      </article>
    </section>
  `
}

function getInTouch () {
  return html`
    <section class="pa5 bg-dark-gray" id="contact">
      <article>
        ${formDescription()}
        ${form()}
      </article>
    </section>
  `
}

function formDescription () {
  var organizations = fs.readFileSync(path.join(__dirname, '/assets/organizations.txt'), 'utf8')
  var partner = fs.readFileSync(path.join(__dirname, '/assets/partner.txt'), 'utf8')
  return html`
    <div class="tl lh-copy fn fl-ns w-50-ns">
      ${border('salmon')}
      <h2 class="ttu fw7 white"> we can help </h2>
      <p class="f3 fw7 white">${organizations}</p>
      <br>
      <p class="f3 white">${partner}</p>
      <br>
      <div>
        <span class="salmon di">&#8594;</span>
        ${contact('salmon', '', 'Access Now Digital Security Helpline')} 
      </div>
      <div>
        <span class="salmon di">&#8594;</span>
        ${contact('salmon', '', 'Security Without Borders')} 
      </div>
    </article>
  `
}

function form () {
  return html`
    <form class="fn fl-ns w-50-ns">
        <input class="input-reset" type="text" placeholder="Your organisation name*">
    </form>
  `
}

function border (colour) {
  return html`
    <div class="bw3 bt mw4 pb4 mt5 ${colour}"></div>
  `
}

function contact (color, href, text) {
  return html`
    <a class="fr ttu ${color} no-underline fw7" href=${href}>${text}</a>
  `
}

function addFont () {
  var link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css?family=Open+Sans:400,700'
  link.rel = 'stylesheet'
  var head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

app.router(['/', mainView])
mount('body', app.start())
