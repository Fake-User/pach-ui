const templateArtistCard = document.createElement('template');
templateArtistCard.innerHTML = `
    <style>
        #artist-container{
            width: 100%;
            aspect-ratio: 1 / 1;
            display: grid;
            grid-template-rows: 7fr 3fr;
            background-image: url(""); /* Add Default */
            background-size: cover;
            border-radius: 10%;
            filter:drop-shadow(0.75vmin 0.75vmin 0.75vmin rgba(0, 0, 0 , 0.3));
            transition: 0.5s;
        }
            #artist-container:hover{
                filter: drop-shadow(1.5vmin 1.5vmin 1.5vmin rgba(0, 0, 0 , 0.6));
                transition: 0s;
            }
            #artist-cover{
                background-image: linear-gradient(rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 0.6));
                border-top-right-radius: 10% 30%; /* Required for Drop-Shadow Bug */
                border-top-left-radius: 10% 30%; /* Required for Drop-Shadow Bug */
                height: 100%;
            }
            #artist-info{
                display: grid;
                grid-template-rows: 1fr 2fr;
                align-items: center;
                justify-items: center;
                background-color: #111;
                border-bottom-right-radius: 10% 30%;
                border-bottom-left-radius: 10% 30%;
                color: var(--text-color);
            }
                #artist-links{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-wrap: nowrap;
                    justify-content: space-evenly;
                    border-bottom-right-radius: 10% 50%; /* Required for Drop-Shadow Bug */
                    border-bottom-left-radius: 10% 50%; /* Required for Drop-Shadow Bug */
                }
                    #artist-name{
                        grid-row: 1;
                        font-family: var(--font-demi);
                        font-size: var(--font-size-m);
                    }
                    .artist-link{
                        display: grid;
                        /* align-items: center; Looks Better Dissabled idk*/
                        justify-items: center;
                    }
                        .link-image{
                            height: 70%;
                        }
    </style>

    <div id="artist-container">
        <div id="artist-cover" data-route="/Artist"></div>
        <div id="artist-info">
            <div id="artist-name" data-route="/Artist">Artist Name</div>
            <div id="artist-links"></div>
        </div>
    </div>
`;

export default class ArtistCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(templateArtistCard.content.cloneNode(true));
    };

    connectedCallback(){
        /* Routing */
        this.shadowRoot.getElementById("artist-cover").setAttribute("data-route", "/Artist/" + String(this.getAttribute("artistName")));

        this.shadowRoot.getElementById("artist-name").setAttribute("data-route", "/Artist/" + String(this.getAttribute("artistName")));

        let links = JSON.parse(decodeURIComponent(this.getAttribute("artistLinks")))
        let output = "";
        links.forEach(function(link){
            output += `
                <a class="artist-link" href="${link.url}" target="_blanke">
                    <img class="link-image" src="${link.icon}">
                </a>
            `
        })
        this.shadowRoot.getElementById("artist-links").innerHTML = output;

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
        this.shadowRoot.getElementById("artist-container").style.width = this.getAttribute("artistWidth");

        this.shadowRoot.getElementById("artist-container").style.backgroundImage = this.getAttribute("artistImage");

        this.shadowRoot.getElementById("artist-name").innerHTML = this.getAttribute("artistName");
    };
};

customElements.define("artist-card", ArtistCard);
