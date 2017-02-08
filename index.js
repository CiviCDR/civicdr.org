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
      ${origins()}
      ${footer()}
    </body>
  `
}

function intro () {
  var text = fs.readFileSync(path.join(__dirname, '/assets/intro.txt'), 'utf8')

  return html`
    <section class="pl5 pr5 pb5 pt2 bg-salmon" id="intro">
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
        <p class="f3">${aboutEmergency}</p>
      </article>
    </section>
  `
}

function getInTouch () {
  return html`
    <section class="pa5 bg-dark-gray" id="contact">
      ${border('salmon')}
      <article class="flex justify-between mw8">
        ${formDescription()}
        ${form()}
      </article>
    </section>
  `
}

function origins () {
  var origins = fs.readFileSync(path.join(__dirname, '/assets/origins.txt'), 'utf8')

  return html`
    <section class="pa5">
      ${border('salmon')}
      <article class="tl mw8 lh-copy">
        <h2 class="ttu fw7"> what we do </h2>
        <p class="f3">${origins}</p>
      </article>
    </section>
  `
}

function footer () {
  return html`
    <section class="bg-salmon pa3">
      <article class="center w-50 tc">
        <a class="ttu no-underline white" href="#intro">back to top</a>
      </article>
    </section>
  `
}

function formDescription () {
  var organizations = fs.readFileSync(path.join(__dirname, '/assets/organizations.txt'), 'utf8')
  var partner = fs.readFileSync(path.join(__dirname, '/assets/partner.txt'), 'utf8')

  return html`
    <div class="tl lh-copy w-50-ns">
      <h2 class="ttu fw7 white"> we can help </h2>
      <p class="f3 fw7 white">${organizations}</p>
      <p class="f3 white">${partner}</p>
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
    <form class="w-50-ns">
			<input class="input-reset w-100 pt3 pb4 pr3 pl3 ba b--black mb3" type="text" placeholder="Your organisation name*">
			<input class="input-reset w-100 pt3 pb6 pr3 pl3 ba b--black" type="text" placeholder="Briefly describe your problem*">
			<div class="bg-white mb3">
				<p class="pt3 pl3 pr3">Choose the categories of attack you are facing*</p>
				<fieldset id="attack-type" class="bw0 flex justify-start">
					<div class="pr6-l pr4-m">
						${checkbox('attack one', 'attack1')}
						${checkbox('attack two', 'attack2')}
						${checkbox('attack three', 'attack3')}
					</div>
					<div>
						${checkbox('attack four', 'attack4')}
						${checkbox('attack five', 'attack5')}
						${checkbox('attack six', 'attack6')}
					</div>
				</fieldset>
			</div>
			<input class="input-reset w-100 pt3 pb4 pr3 pl3 ba b--black-20" type="text" placeholder="Contact email address*">
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

function checkbox (text, name) {
	return html`
		<div>
			<input type="checkbox" id=${name} value=${name}></input>
			<label for=${name} class="lh-copy">${text}</label>
		</div>
	`
}

function addFont () {
  var link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css?family=Roboto:400,700'
  link.rel = 'stylesheet'
  var head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

app.router(['/', mainView])
mount('body', app.start())
