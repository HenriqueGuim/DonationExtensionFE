let token, userId;
const button = document.getElementById("save-button");

const twitch = window.Twitch.ext;

twitch.onContext((context) => {
    console.log(context);
});

twitch.onAuthorized((auth) => {
    token = auth.token;
    userId = auth.userId;
});

//getSavedConfigValues()

button.addEventListener("click", saveConfig);

function saveConfig() {
    let configs = {
        "streamLabsAccessToken": document.getElementById("streamLabsToken").value,
        "streamLabsRefreshToken": document.getElementById("streamLabsRefreshToken").value,
        "stripeToken": document.getElementById("stripeToken").value,
    }
    twitch.configuration.set("broadcaster", "1", JSON.stringify(configs));

}

function getSavedConfigValues() {
    const configs = twitch.configuration.global
    if (configs.content) {
        const content = JSON.parse(configs.content)
        //document.getElementById("streamLabsToken").value = content.streamLabsAccessToken
        //document.getElementById("streamLabsRefreshToken").value = content.streamLabsRefreshToken
        //document.getElementById("stripeToken").value = content.stripeToken
    }
}



twitch.configuration.onChanged(function(){
    console.log(twitch.configuration.broadcaster)
    console.log("in onChanged")
    if(twitch.configuration.broadcaster){
        console.log("config exists")
        const content = JSON.parse(twitch.configuration.broadcaster.content)
        document.getElementById("streamLabsToken").value = content.streamLabsAccessToken
        document.getElementById("streamLabsRefreshToken").value = content.streamLabsRefreshToken
        document.getElementById("stripeToken").value = content.stripeToken
    }
})