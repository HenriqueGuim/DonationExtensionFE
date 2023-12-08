const button = document.getElementById("donate-button");
const amount = document.getElementById("amount");
const message = document.getElementById("message");
const username = document.getElementById("user");
const image = "https://i.imgur.com/EHyR2nP.png";
const url = "http://localhost:8080";
const serverUrl = "https://twitchdono-donation-extension-twitch.koyeb.app";
const twitch = window.Twitch.ext;
let token, userId;
let streamLabsToken, streamLabsRefreshToken, stripeToken;


twitch.onAuthorized((auth) => {
    token = auth.token;
    userId = auth.userId;
});

if (twitch.configuration.broadcaster) {
    console.log("config exists")
    const configs = JSON.parse(twitch.configuration.broadcaster.content);
    streamLabsToken = configs.streamLabsAccessToken;
    streamLabsRefreshToken = configs.streamLabsRefreshToken;
    stripeToken = configs.stripeToken;

} else {
    console.log("config does not exist")
    //TODO comment the key under this when you want to use a test key
    stripeToken = "sk_test_51OAxnAJVFcUZJgfRJZrP5ZowLDd6IlC4L31lfXji9sXS21cH2qZ2UVrknCI6MG9K7DdPomlrNsWFJRFdyGMf3STa00fsgC03o2"
}

//uncomment this when you want to use a test key
//const stripeToken = "sk_test_51OAxnAJVFcUZJgfRJZrP5ZowLDd6IlC4L31lfXji9sXS21cH2qZ2UVrknCI6MG9K7DdPomlrNsWFJRFdyGMf3STa00fsgC03o2";


async function createCheckOut() {
    console.log("clicked");
    const response = await fetch(serverUrl + "/createCheckout", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "text/json"
        },
        body: JSON.stringify({
            amount: parseInt(amount.value),
            username: username.value,
            message: message.value,
            imgUrl: image,
            successDomain: url,
            failDomain: url,
            stripeToken: stripeToken,
            streamLabsToken: streamLabsToken,
            streamLabsRefreshToken: streamLabsRefreshToken
        })
    })

    console.log("request made");

    await response.json().then(data => {
        console.log("data");
        console.log(data.url);
        window.open(data.url, "_blank");
    });
}

button.addEventListener("click", createCheckOut);
