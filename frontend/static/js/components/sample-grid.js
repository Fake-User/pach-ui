const templateSampleGrid = document.createElement("template");
templateSampleGrid.innerHTML = `
    <style>
        #background{
            background-color: #000;
        }
            #grid-container{
                box-sizing: border-box;
                display: grid;
                grid-gap: 2vmin;
                /* Shadow */
                grid-template-columns: repeat(auto-fit, minmax(50vmin, 1fr));
                padding: 4vmin;
            }
    </style>

    <div id="background">
        <div id="grid-container"></div>
    </div>
`;

export default class SampleGrid extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(templateSampleGrid.content.cloneNode(true));

        fetch(`/static/test-api/samples/${this.getAttribute("paramID")}.json`).then((res) => res.json()).then((samples) => {
            let output = "";
            samples.forEach(function(sample){
                output += `
                    <sample-card
                        packImage="url('https://tpb-test-cdn.sfo3.digitaloceanspaces.com/images/${sample.pack}.jpg')"
                        packName="${sample.pack}"
                        sampleName="${sample.sample}"
                        packArtist="${sample.artist}"
                    ></sample-card>
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

customElements.define("sample-grid", SampleGrid);
