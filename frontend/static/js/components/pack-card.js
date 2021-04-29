const templatePackCard = document.createElement("template");
templatePackCard.innerHTML = `
    <style>
        #pack-container{
            max-width: 40vh;
            max-height: 40vh;
            margin: 0 auto;
            aspect-ratio: 1 / 1;
            display: grid;
            grid-template-rows: 7fr 3fr;
            background-image: url(""); /* Add Default */
            background-size: cover;
            border-radius: 10%;
            filter:drop-shadow(0.75vmin 0.75vmin 0.75vmin rgba(0, 0, 0 , 0.3));
            transition: 0.5s;
        }
            #pack-container:hover{
                filter: drop-shadow(1.5vmin 1.5vmin 1.5vmin rgba(0, 0, 0 , 0.6));
                transition: 0s;
            }
            #pack-cover{
                background-image: linear-gradient(rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 0.6));
                border-top-right-radius: 10% 30%; /* Required for Drop-Shadow Bug */
                border-top-left-radius: 10% 30%; /* Required for Drop-Shadow Bug */
                height: 100%;
            }
            #pack-info{
                display: grid;
                grid-template-columns: 3fr 7fr;
                background-color: #111;
                border-bottom-right-radius: 10% 30%;
                border-bottom-left-radius: 10% 30%;
            }
                #pack-artist{
                    background-image: url("");/* Creat Default */
                    background-size: cover;
                    border-radius: 100%;
                    border: 0.4vmin solid #fff;
                    margin: 15%;
                }
                #pack-text{
                    margin-top: auto;
                    margin-bottom: auto;
                }
                #pack-name{
                    color: var(--text-color);
                    font-family: var(--font-demi);
                    font-size: var(--font-size-m);
                }
                #artist-name{
                    color: var(--text-color);
                    font-family: var(--font-round);
                    font-size: var(--font-size-s);
                }
    </style>

    <div id="pack-container">
        <a data-route="/Pack" id="pack-cover"></a>
        <div id="pack-info">
            <div data-route="/Artist" id="pack-artist"></div>
            <div id="pack-text">
                <span data-route="/Pack" id="pack-name"></span><br/>
                <span data-route="/Artist" id="artist-name"></span>
            </div>
        </div>
    </div>
`;

export default class PackCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(templatePackCard.content.cloneNode(true));
    };

    connectedCallback(){
        /* Routing */
        this.shadowRoot.getElementById("pack-cover").setAttribute("data-route", "/Pack/" + String(this.getAttribute("packName")));

        this.shadowRoot.getElementById("pack-artist").setAttribute("data-route", "/Artist/" + String(this.getAttribute("artistName")));

        this.shadowRoot.getElementById("pack-name").setAttribute("data-route", "/Pack/" + String(this.getAttribute("packName")));

        this.shadowRoot.getElementById("artist-name").setAttribute("data-route", "/Artist/" + String(this.getAttribute("artistName")));

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
        this.shadowRoot.getElementById("pack-container").style.width = this.getAttribute("packWidth");

        this.shadowRoot.getElementById("pack-container").style.backgroundImage = this.getAttribute("packImage");

        this.shadowRoot.getElementById("pack-artist").style.backgroundImage = this.getAttribute("packArtist");

        this.shadowRoot.getElementById("pack-name").innerHTML = this.getAttribute("packName");

        this.shadowRoot.getElementById("artist-name").innerHTML = this.getAttribute("artistName");
    };
};

customElements.define("pack-card", PackCard);
