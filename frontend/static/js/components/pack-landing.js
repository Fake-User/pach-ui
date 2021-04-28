const templatePackLanding = document.createElement("template");
templatePackLanding.innerHTML = `
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
            grid-template-areas: ". . ."". pack ."". . .";
        }
            .pack{
                grid-area: pack;
                width: 50vh;
                max-width: 76vw;
            }
    </style>

    <div id="landing" class="shadow-bottom""></div>
`;

export default class PackLanding extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(templatePackLanding.content.cloneNode(true));

        console.log()

        fetch(`/static/test-api/packs/${this.getAttribute("paramID")}.json`).then((res) => res.json()).then((pack) => {
            let output = `
            <pack-card class="pack"
                packWidth="100%"
                packImage="url('https://tpb-test-cdn.sfo3.digitaloceanspaces.com/images/${pack[0].pack}.jpg')"
                packName="${pack[0].pack}"
                packArtist="url('https://tpb-test-cdn.sfo3.digitaloceanspaces.com/images/${pack[0].artist}.jpg')"
                artistName="${pack[0].artist}"
            ></pack-card>
                `;
            this.shadowRoot.getElementById("landing").innerHTML = output;
        })
    };
};

customElements.define("pack-landing", PackLanding);
