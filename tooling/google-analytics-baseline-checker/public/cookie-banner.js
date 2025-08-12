const template = document.createElement('template');
template.innerHTML = `
<style>
* { margin: 0}
aside {
  background: #fff;
  border: 0;
  border-top: 1px solid #eee;
  box-shadow: 0 0 1em #0001;
  font-size: 0.9em;
  gap: 1em;
  height: auto;
  inset: 0;
  padding: 1em;
  position: fixed;
  text-wrap-style: pretty;
  top: unset;
  translate: 0px 100%;
  transition: translate .2s ease, display .2s allow-discrete;
  width: auto;
  z-index: 1000;
}
aside.is-open {
  display: grid;
  translate: 0px 0px;
}
@media (min-width: 540px) {
  aside {
    grid-template-columns: 1fr max-content;
    align-items: center;
  }
}
button {
  background: #eee;
  border: none;
  cursor: pointer;
  font: inherit;
  padding: .5em 1.5em;
  border-radius: .4em;
  width: 100%;
}
button:hover {
  background: #ddd;
}
</style>
<aside class="is-open">
  <p>
    Chrome.dev uses cookies from Google to deliver and
    enhance the quality of its services and to analyze traffic.
    <a href="https://policies.google.com/technologies/cookies">Learn more.</a>
  </p>
  <button>Ok, Got it.</button>
</aside>`;

class CookieBanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
    const banner = this.shadowRoot.querySelector('aside');
    const button = this.shadowRoot.querySelector('button');
    button.addEventListener('click', (event) => {
      banner.classList.remove('is-open');
      banner.ontransitionend = () => this.remove();
      localStorage.setItem('cdd-cookie-consent', '1');
    });
  }
}

if (!localStorage.getItem('cdd-cookie-consent')) {
  customElements.define('cookie-banner', CookieBanner);
}
