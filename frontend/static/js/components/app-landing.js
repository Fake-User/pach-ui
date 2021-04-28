const templateAppLanding = document.createElement("template");
templateAppLanding.innerHTML = `
    <style>
        .shadow-bottom{
            background-image: linear-gradient(rgba(0, 0, 0, 0) calc(100% - 4vmin), rgba(0, 0, 0, 0.6));
        }
        .landing{
            width: 100vw;
            height: 91vh; /* Compensate for Header */
            display: grid;
            grid-template-columns: auto 40vmin auto;
            grid-template-rows: auto 40vmin auto
        }
            .landing-icon{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
                grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
                grid-gap: 1vmin;
            }
            .icon-fill{
                background-color: #fffa;
                border-radius: 1.5vmin;
                filter: drop-shadow(0.4vmin 0.4vmin 0.4vmin rgba(0, 0, 0 , 0.3));
                transition: background-color 2s;
            }
                .icon-fill:hover{
                    background-color: #fff;
                    filter: drop-shadow(0.8vmin 0.8vmin 0.8vmin rgba(0, 0, 0 , 0.6));
                    transition: background-color 0s;
                }
    </style>

    <div class="landing shadow-bottom"">
        <div></div><div></div><div></div>
        <div></div>
        <div class="landing-icon">
            <div class="icon-fill"></div><div class="icon-fill"></div><div class="icon-fill"></div><div class="icon-fill"></div><div class="icon-fill"></div>
            <div class="icon-fill"></div><div></div><div></div><div></div><div class="icon-fill"></div>
            <div class="icon-fill"></div><div></div><div class="icon-fill"></div><div></div><div class="icon-fill"></div>
            <div class="icon-fill"></div><div></div><div></div><div></div><div class="icon-fill"></div>
            <div class="icon-fill"></div><div></div><div class="icon-fill"></div><div class="icon-fill"></div><div class="icon-fill"></div>
        </div>
        <div></div>
        <div></div><div></div><div></div>
    </div>
`;

export default class AppLanding extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(templateAppLanding.content.cloneNode(true));
    };
};

customElements.define("app-landing", AppLanding);
