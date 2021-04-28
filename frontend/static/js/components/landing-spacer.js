const templateLandingSpacer = document.createElement("template");
templateLandingSpacer.innerHTML = `
    <style>
        #spacer{
            width: 100vw;
            height: 9vh;
        }
    </style>

    <div id="spacer"></div>
`;

export default class LandingSpacer extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(templateLandingSpacer.content.cloneNode(true));
    };
};

customElements.define("landing-spacer", LandingSpacer);
