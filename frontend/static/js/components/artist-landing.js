const templateArtistLanding = document.createElement("template");
templateArtistLanding.innerHTML = `
    <style>
        .shadow-bottom{
            background-image: linear-gradient(rgba(0, 0, 0, 0) calc(100% - 4vmin), rgba(0, 0, 0, 0.6));
        }
        #landing{
            width: 100vw;
            height: 61vh;
            display: grid;
            grid-template-columns: auto min-content auto;
            grid-template-rows: auto min-content auto;
            grid-template-areas: ". . ."". artist ."". . .";
        }
            .artist{
                grid-area: artist;
                width: 50vh;
                max-width: 76vw;
            }
    </style>

    <div id="landing" class="shadow-bottom"></div>
`;

export default class ArtistLanding extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(templateArtistLanding.content.cloneNode(true));

        fetch(`/static/test-api/artists/${this.getAttribute("paramID")}.json`).then((res) => res.json()).then((artist) => {
            let output = `
                <artist-card
                    class="artist"
                    artistWidth="100%"
                    artistImage="url('https://tpb-test-cdn.sfo3.digitaloceanspaces.com/images/${artist[0].artist}.jpg')"
                    artistName="${artist[0].artist}"
                    artistLinks=${encodeURIComponent(JSON.stringify(artist[0].links))}
                ></artist-card>
                `;
            this.shadowRoot.getElementById("landing").innerHTML = output;
        })
    };
};

customElements.define("artist-landing", ArtistLanding);
