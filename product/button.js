const template = document.createElement('template');
template.innerHTML = `
<style>
  @import "https://unpkg.com/open-props/open-props.min.css";
  .nuiteq-button {
    font-family: 'abel';
    font-size: var(--size-5);
    background-image: var(--gradient-15);
    width: fit-content;
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    padding: var(--size-fluid-2);
    border-radius: var(--radius-3);
    border: none;
  }

  .nuiteq-button:hover {
    background: var(--gradient-2);
    color: var(--gray-0);
  }

  .nuiteq-button > p {
    margin: 0;
  }
</style>
<button class="nuiteq-button">
  <img alt="nuiteq-button" />
  <p></p>
</button>`;


class NUITEQButton extends HTMLElement{
 constructor(){
     super();
     this.attachShadow({ mode: 'open'});
     this.shadowRoot.appendChild(template.content.cloneNode(true));
     this.shadowRoot.querySelector('p').innerText = this.getAttribute('noun');
     this.shadowRoot.querySelector('img').src = this.getAttribute('image');
 }

 connectedCallback(){
   this.p = this.getAttribute("name")
   this.render();
 }

 render(){
   this.p;
 }
}

// Define the new web component
if ('customElements' in window) {
	customElements.define('nuiteq-button', NUITEQButton);
}
