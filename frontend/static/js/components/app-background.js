const templateAppBackground = document.createElement("template");
templateAppBackground.innerHTML = `
    <style>
        #canvas1{
            position: fixed;
            background: #080808;
            width: 100%;
            height: 100%;
            z-index: -9;
        }
    </style>

    <canvas id="canvas1"></canvas>
`;

export default class AppBackground extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(templateAppBackground.content.cloneNode(true));
    };

    connectedCallback(){

        const canvas = this.shadowRoot.getElementById("canvas1");
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const particlesArray = [];

        const bgCount = 100 /* Number of Initial Background Particles */
        const pColor = "#fff" /* Particle Color */
        const pSize = 10 /* Maximum Random Particle Size */
        const pSpeed = 1 /* Maximum Random Particle Speed */
        const mLength = 150 /* Maximum Length of Lines */
        const mFade = 3 /* Coefficient For Exponential Line Opacity */

        /* Resize Event */
        window.addEventListener("resize", function(){
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        });

        /* Background Particles */
        class ParticleBG{
            constructor(type){
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.size = Math.random() * (pSize - 1) + 1
                this.posX = Math.random() * (pSpeed * 2) - (pSpeed / 2)
                this.posY = Math.random() * (pSpeed * 2) - (pSpeed / 2)
                this.color = pColor;
            }
            update(){
                if (this.x + this.posX > canvas.width + mLength){
                    this.x += (this.posX - canvas.width - mLength)
                } else if (this.x + this.posX < -mLength){
                    this.x += (this.posX + canvas.width + mLength)
                } else (this.x += this.posX)
                if (this.y + this.posY > canvas.height + mLength){
                    this.y += (this.posY - canvas.height - mLength)
                } else if (this.y + this.posY < -mLength){
                    this.y += (this.posX + canvas.height + mLength)
                } else (this.y += this.posY)
            }
            draw(){
                ctx.fillStyle = this.color
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        };

        function bg(){
            for (let i = 0; i < 100; i++){
                particlesArray.push(new ParticleBG())
            }
        };
        bg();

        /* Mouse Particles */
        const mouse = {
            x: undefined,
            y: undefined
        };

        document.addEventListener("mousemove", function(e){
            mouse.x = e.x
            mouse.y = e.y
            particlesArray.push(new ParticleMouse())
        });

        class ParticleMouse{
            constructor(){
                this.x = mouse.x
                this.y = mouse.y
                this.size = Math.random() * (pSize - 1) + 1
                this.posX = Math.random() * (pSpeed * 2) - (pSpeed / 2)
                this.posY = Math.random() * (pSpeed * 2) - (pSpeed / 2)
                this.color = pColor;
            }
            update(){
                this.x += this.posX
                this.y += this.posY
                if (this.size > 0.2){
                    this.size -= 0.08
                }
            }
            draw(){
                ctx.fillStyle = this.color
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        };

        /* Handle Particle Array */
        function handleParticles(){
            for (let i = 0; i < particlesArray.length; i++){
                particlesArray[i].update()
                particlesArray[i].draw()
                for(let j = i; j < particlesArray.length; j++){
                    const dx = particlesArray[i].x - particlesArray[j].x
                    const dy = particlesArray[i].y - particlesArray[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)
                    if (distance < mLength){
                        ctx.beginPath()
                        let opacityValue = ((-1 * ((distance / mLength) ** (mFade * 2) )) + 1)
                        ctx.strokeStyle = "rgba(256,256,256," + opacityValue +")";
                        ctx.lineWidth = particlesArray[i].size/3
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
                        ctx.stroke()
                        ctx.closePath() /* Might Not Be Nessecary IDK */
                    }
                }
                if (particlesArray[i].size <= 0.2){
                    particlesArray.splice(i, 1)
                    i--
                }
            }
        };

        /* Canvas Animation */
        function animate(){
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            handleParticles()
            requestAnimationFrame(animate)
        };

        animate();
    };
};

customElements.define("app-background", AppBackground);
