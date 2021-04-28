const templateArtistGrid = document.createElement("template");
templateArtistGrid.innerHTML = `
    <style>
        #background{
            background-color: #000;
        }
            #grid-container{
                display: grid;
                padding: 2vh;
                grid-template-columns: repeat(auto-fit, minmax(32vmin, 1fr));
                grid-gap: 4vmin;
                box-sizing: border-box;
                padding: 4vmin;
            }
    </style>
    <div id="background">
        <div id="grid-container"></div>
    </div>
`;

export default class ArtistGrid extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(templateArtistGrid.content.cloneNode(true));

        fetch(`/static/test-api/artists/${this.getAttribute("paramID")}.json`).then((res) => res.json()).then((artists) => {
            let output = "";
            artists.forEach(function(artist){
                output += `
                    <artist-card
                        artistWidth="100%"
                        artistImage="url('https://tpb-test-cdn.sfo3.digitaloceanspaces.com/images/${artist.artist}.jpg')"
                        artistName="${artist.artist}"
                        artistLinks=${encodeURIComponent(JSON.stringify(artist.links))}
                    ></artist-card>
                `;
            })
        this.shadowRoot.getElementById("grid-container").innerHTML = output;
        })
    };
    connectedCallback(){
        this.shadowRoot.getElementById("background").style.backgroundColor = this.getAttribute("backgroundColor");

        /* Set Shadows */
        let shadowTop = () => {
            if (this.getAttribute("shadowTop") === "true"){
                return "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0) 3vh,";
            }
            else {
                return"linear-gradient(rgba(0, 0, 0, 0), ";
            }
        }
        let shadowBottom = () => {
            if (this.getAttribute("shadowBottom") === "true"){
                return "rgba(0, 0, 0, 0) calc(100% - 3vh), rgba(0, 0, 0, 0.6))";
            }
            else {
                return "rgba(0, 0, 0, 0))";
            }
        }
        this.shadowRoot.getElementById("grid-container").style.backgroundImage = shadowTop() + shadowBottom();
    };
};

customElements.define("artist-grid", ArtistGrid);
