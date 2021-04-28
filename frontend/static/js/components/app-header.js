const templateAppHeader = document.createElement("template");
templateAppHeader.innerHTML = `
    <style>
        #header{
            box-sizing: border-box;
            padding: 1.5vh;
            position: fixed;
            display: grid;
            grid-template-columns:  6vh auto auto minmax(auto, 60vh);
            grid-template-rows: 6vh;
            grid-gap: 1.5vh;
            height: 12vh;
            width: 100vw;
            background-image: linear-gradient(rgba(17, 17, 17, 1) 9vh, rgba(0, 0, 0, 0.6) 0, rgba(0, 0, 0, 0));
            z-index: 99;
        }
            #logo{
                width: 100%;
                height: auto;
            }
            #brand{
                align-self: center;
                text-decoration: none;
                color: var(--text-color);
                font-family: var(--font-demi);
                font-size: var(--font-size-xl);
            }
            #search{
                box-sizing: border-box;
                background-color: var(--form-fill);
                border: none;
                border-radius: 3vh;
                filter:drop-shadow(0.4vmin 0.4vmin 0.4vmin rgba(0, 0, 0 , 0.6));
                transition: 0.5s;
                width: 100%;
                height: 100%;
                color: var(--text-color);
                font-family: var(--font-demi);
                font-size: var(--font-size-l);
                text-align: right;
                padding-right: 2vh;
            }
                #search:focus{
                    Outline: none;
                }
                #search:hover{
                    filter: drop-shadow(0.8vmin 0.8vmin 0.8vmin rgba(0, 0, 0 , 0.6));
                    transition: 0s;
                }
                /* Fix Text Color Transition Time */
                #search::placeholder{
                    color: var(--form-color);
                    opacity: 1;
                }
                    #search:hover::placeholder{
                        color: var(--text-color);
                        opacity: 1;
                    }
    </style>

    <div id="header">
        <img id="logo" src="/static/images/tpb-logo.svg" data-route="/">
        <div data-route="/" id="brand">THE PACHBAY</div>
        <div><!--Dynamic Space--></div>
        <form action="#"><input id="search" type="text" placeholder="Search" name="search"></form>
    </div>
`;

export default class AppHeader extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(templateAppHeader.content.cloneNode(true));
    };
    connectedCallback(){
        this.shadowRoot.addEventListener("click", e => {
            if (e.target.matches("[data-route]")) {
                this.dispatchEvent(new CustomEvent("route", {detail:
                    {url: e.target.getAttribute("data-route")},
                    bubbles: true,
                    composed: true
                }))
            }
        })
    };
};

customElements.define("app-header", AppHeader);
