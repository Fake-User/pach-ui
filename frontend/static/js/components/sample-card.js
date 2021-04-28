const templateSampleCard = document.createElement("template");
templateSampleCard.innerHTML = `
    <style>
        #sample-container{
            display: grid;
            grid-template-columns: 9vh max-content auto;
            width: 100%;
            height: 9vh;
            background-color: var(--form-fill);
            border-radius: 4.5vh;
            filter:drop-shadow(0.4vmin 0.4vmin 0.4vmin rgba(0, 0, 0 , 0.3));
            transition: 0.5s;
        }
            #sample-container:hover{
                filter: drop-shadow(0.8vmin 0.8vmin 0.8vmin rgba(0, 0, 0 , 0.6));
                color: var(--text-color);
                transition: 0s;
            }
            #sample-pack{
                background-image: url("");/* Create Default */
                background-size: cover;
                border-radius: 100%;
                border: 0.4vmin solid #fff;
                box-sizing: border-box;
                margin: 0.75vh;
            }
            #sample-text{
                margin-top: auto;
                margin-bottom: auto;
            }
                #sample-name{
                    color: var(--text-color);
                    font-family: var(--font-demi);
                    font-size: var(--font-size-m);
                }
                #pack-artist{
                    color: var(--text-color);
                    font-family: var(--font-round);
                    font-size: var(--font-size-s);
                }
                a{
                    text-decoration: none;
                }
            /* Replace With Dynamic Waveform */
            #sample-waveform{
                display: grid;
                text-align: center;
                box-sizing: border-box;
                background-color: #111;
                border-radius: 3.75vh;
                width: calc(100% - 1.25vh);
                height: 7.5vh;
                margin: auto;
                align-content: center;
                color: var(--form-color);
                font-family: var(--font-demi);
                font-size: var(--font-size-l);
            }
    </style>
    <div id="sample-grid">
        <div id="sample-container">
            <div data-route="/Pack" id="sample-pack"></div>
            <div id="sample-text">
                <span id="sample-name">Sample Name</span><br/>
                <span data-route="/Artist" id="pack-artist">Pack Name</span>
            </div>
            <div id="sample-waveform">~Waveform~</div>
        </div>
    </div>
`;

export default class SampleCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(templateSampleCard.content.cloneNode(true));
    };

    connectedCallback(){
        /* Routing */
        this.shadowRoot.getElementById("sample-pack").setAttribute("data-route", "/Pack/" + String(this.getAttribute("packName")));

        this.shadowRoot.getElementById("pack-artist").setAttribute("data-route", "/Artist/" + String(this.getAttribute("packArtist")));

        this.shadowRoot.addEventListener("click", e => {
            if (e.target.matches("[data-route]")) {
                this.dispatchEvent(new CustomEvent("route", {detail:
                    {url: e.target.getAttribute("data-route")},
                    bubbles: true,
                    composed: true
                }))
            }
        });

        /* Style */
        this.shadowRoot.getElementById("sample-pack").style.backgroundImage = this.getAttribute("packImage");

        this.shadowRoot.getElementById("sample-name").innerHTML = this.getAttribute("sampleName");

        this.shadowRoot.getElementById("pack-artist").innerHTML = this.getAttribute("packArtist");
    };
};

customElements.define("sample-card", SampleCard);
