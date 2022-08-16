const fallBackIcon = "/product/assets/success-button.svg";

const primaryButtonSuccessTemplate = document.createElement('template');
primaryButtonSuccessTemplate.innerHTML = `
<style>
  @import "https://unpkg.com/open-props/open-props.min.css";
  button {
    font-family: 'abel';
    font-size: var(--size-5);
    background: var(--color-8);
    width: fit-content;
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    padding: var(--size-fluid-2);
    border-radius: var(--radius-3);
    border: none;
  }

  button:hover {
    background: var(--gradient-2);
    color: var(--gray-0);
  }

  button > img {
    max-inline-size: 100%;
    block-size: auto;
    aspect-ratio: 2/1;
    object-fit: cover;
    object-position: top center;
  }
</style>
<button class="nuiteq-button">
  <img alt="button-success" />
  <p></p>
</button>`;


class NUITEQProductButtonSuccess extends HTMLElement {
 constructor(){
     super();
     this.attachShadow({ mode: 'open'});
     this.shadowRoot.appendChild(primaryButtonSuccessTemplate.content.cloneNode(true));
     this.shadowRoot.querySelector('p').innerText = this.getAttribute('noun');
     this.shadowRoot.querySelector('img').src = this.getAttribute('image') || fallBackIcon;
 }

 connectedCallback(){
   this.p = this.getAttribute("noun")
   this.render();
 }

 render(){
   this.p;
 }
}

// Define the new web component
if ('customElements' in window) {
	customElements.define('nuiteq-product-button-success', NUITEQProductButtonSuccess);
}
