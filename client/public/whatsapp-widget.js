window.onload = function() {
    var container = `<div class="whatsapp-widget">
        <div class="whatsapp-widget-header">
            <h1> WhatsApp</h1>
        </div>
        <div class="whatsapp-widget-body">

        </div>`
    var template = `<div class='whatsapp-widget-agent'>
                <div class='whatsapp-widget-agent-image'>
                    <div class='whatsapp-widget-agent-image-holder'>
                    </div>
                </div>

                <div class='whatsapp-widget-agent-description'>
                    <div class='whatsapp-widget-agent-name'>
                    </div>
                    <div class='whatsapp-widget-agent-phonenumber'>
                    </div>
                </div>
            </div'>`
    var style = ` 
                    .whatsapp-widget {
                position: absolute;
                right: 10px;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                width: 300px;
                min-height: 100px;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                bottom: 10px;
                background-color: teal;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

            }

            .whatsapp-widget .whatsapp-widget-header h1 {
                margin: 0px;
                color: white;
                padding: 10px;
                font-size: 24px;
            }

            .whatsapp-widget .whatsapp-widget-header {

                border-top-left-radius: 9px;
                border-top-right-radius: 9px;
                height: 46px;
            }

            .whatsapp-widget .whatsapp-widget-body {
                padding: 0px;
                height: 100%;
                background-color: rgb(233, 231, 231);
            }

            .whatsapp-widget .whatsapp-widget-agent {
                cursor: pointer;
                display: flex;
                flex-direction: row;
                width: 100%;
                min-height: 90px;
                background-color: white;
                border-bottom: 1px solid #e2e2e2;
            }

            .whatsapp-widget .whatsapp-widget-agent-description {
                flex: 1;
                display: flex;
                flex-direction: column;
            }

            .whatsapp-widget .whatsapp-widget-agent-image {
                flex: 0.3;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .whatsapp-widget .whatsapp-widget-agent-image-holder {
                width: 60px;
                height: 60px;
                background-size: cover;
                border-radius: 50%;
            }

            .whatsapp-widget .whatsapp-widget-agent-name {
                font-size: 20px;
                padding: 10px;
            }

            .whatsapp-widget .whatsapp-widget-agent-phonenumber {
                font-size: 20px;
                padding: 10px;
                padding-top: 0px;
                color: grey;
            }

            .whatsapp-widget .whatsapp-widget-agent:hover {
                background-color: #f1f1f1;
            }
                    `;

    function generateUID() {
        // I generate the UID from two parts here 
        // to ensure the random number provide enough bits.
        var firstPart = (Math.random() * 46656) | 0;
        var secondPart = (Math.random() * 46656) | 0;
        firstPart = ("000" + firstPart.toString(36)).slice(-3);
        secondPart = ("000" + secondPart.toString(36)).slice(-3);
        return "a"+firstPart + secondPart;
    }



    function addStyleString(str) {
        var node = document.createElement('style');
        node.innerHTML = str;
        document.body.appendChild(node);
    }



    function htmlToElement(html) {
        var template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    }

    function generateAgentElement(agent) {
        var agentDom = htmlToElement(template);
        agentDom.querySelector("." + uid + "whatsapp-widget-agent-name").innerText = agent.name;
        agentDom.querySelector("." + uid + "whatsapp-widget-agent-phonenumber").innerText = agent.phone;
        agentDom.querySelector("." + uid + "whatsapp-widget-agent-image-holder").style.backgroundImage = "url(" + agent.photo + ")";
        return agentDom;
    }

    function onClickAgent(event){
        console.log(this.value.phone);
        window.open("https://api.whatsapp.com/send?phone="+this.value.phone)
    }

    var uid = generateUID();
    const regex = /whatsapp-widget/gi
    container = container.replace(regex, uid + "whatsapp-widget");
    template = template.replace(regex, uid + "whatsapp-widget");
    style = style.replace(regex, uid + "whatsapp-widget");
    addStyleString(style);

    document.body.append(htmlToElement(container));

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            agents = JSON.parse(this.responseText).agents;
            for (i = 0; i < agents.length; i++) {
                var agentDom = generateAgentElement(agents[i]);
                agentDom.value = agents[i];
                agentDom.addEventListener("click",onClickAgent);
                document.querySelector("." + uid + "whatsapp-widget-body").append(agentDom);
            }
        }
    };
    xhttp.open("GET", "http://192.168.1.9:3000/cred", true);
    xhttp.send();

}