const templateAppFooter = document.createElement("template");
templateAppFooter.innerHTML = `
<!DOCTYPE html>
    <style>
        #footer{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(35vh, 1fr));
            grid-gap: 4vmin;
            background-color: #111111;
            padding: 4vmin;
            align-self: center;
            color: var(--text-color);
            font-family: var(--font-round);
            font-size: var(--font-size-s);
        }
            .title{
                font-family: var(--font-demi);
                font-size: var(--font-size-m);
            }
            .button{
                display: grid;
                align-content: center;
                background-color: var(--form-fill);
                filter: drop-shadow(0.4vmin 0.4vmin 0.4vmin rgba(0, 0, 0 , 0.3));
                transition: 0.5s;
                color: var(--form-color);
                font-family: var(--font-demi);
                font-size: var(--font-size-l);
                margin: 4vmin auto 0 auto;
                padding: 0 6vmin;
                width: min-content;
                height: 6vh;
                border-radius: 3vh;
            }
                .button:hover{
                    filter: drop-shadow(0.8vmin 0.8vmin 0.8vmin rgba(0, 0, 0 , 0.6));
                    color: var(--text-color);
                    transition: 0s;
                }
    </style>

    <div id="footer">
        <div>
            <span class="title">Contact</span><br/>Have a question or just want to reach out? Shoot us an email and we will do our best to get back to you. If you would like to reach out to a specific artist reguarding business, please put their name in the subject feild and we will try and get you in touch.
            <div class="button">Contact</div>
        </div>
        <div>
            <span class="title">Support Us</span><br/>Because all of the content on The Patch Bay is free, we are entirly funded by our community. If you like what we do, why not join the effort with a little patronage? Your support allows us to keep making cool sounds for everyone (and you get bragging rights).
            <a><div class="button">Donate</div></a>
        </div>
        <div>
            <span class="title">Terms of Service</span><br/>Music law and copywrite can get pretty dense and wordy. We want you to know that we aren't up to anything shadey, and we hope that you aren't either. If you need to, you can find our full terms of service below.
            <a><div class="button">ToS</div></a>
        </div>
    </div>
`;

export default class AppFooter extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(templateAppFooter.content.cloneNode(true));
    };
};

customElements.define("app-footer", AppFooter);
