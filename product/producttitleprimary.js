console.log("poll title");
const productTitlePrimaryTemplate = document.createElement('template');
productTitlePrimaryTemplate.innerHTML = `
<style>
  @import "https://unpkg.com/open-props/open-props.min.css";
  .primary-title {
    font-family: 'abel';
    font-size: var(--size-5);
    background-image: var(--indigo-9);
    padding: var(--size-fluid-2);
  }
</style>
<h1>NUITEQ PRODUCT</h1>`;


class NUITEQProductTitle extends HTMLElement {
 constructor(){
   super();
   this.attachShadow({ mode: 'open'});
   this.shadowRoot.appendChild(productTitlePrimaryTemplate.content.cloneNode(true));
   this.shadowRoot.querySelector('h1').innerText = this.getAttribute('content');
 }

 connectedCallback(){
   this.h1 = this.getAttribute("content");
   console.log("this", this.h1);
   this.render();
 }

 render(){
   this.h1;
 }
}

// Define the new web component
if ('customElements' in window) {
	customElements.define('nuiteq-product-title', NUITEQProductTitle);
}

console.log("poll title end");
