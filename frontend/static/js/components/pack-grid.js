const templatePackGrid = document.createElement("template");
templatePackGrid.innerHTML = `
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

export default class PackGrid extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(templatePackGrid.content.cloneNode(true));

        fetch(`/static/test-api/packs/${this.getAttribute("paramID")}.json`).then((res) => res.json()).then((data) => {
            let output = "";
            data.forEach(function(pack){
                output += `
                    <pack-card
                        packWidth="100%"
                        packImage="url('https://tpb-test-cdn.sfo3.digitaloceanspaces.com/images/${pack.pack}.jpg')"
                        packName="${pack.pack}"
                        packArtist="url('https://tpb-test-cdn.sfo3.digitaloceanspaces.com/images/${pack.artist}.jpg')"
                        artistName="${pack.artist}"
                    ></pack-card>
                `
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

customElements.define("pack-grid", PackGrid);
