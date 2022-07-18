export const translation = (language) => {
    const tr = {};
    switch (language) {
        case "EN":
            tr.welcomeTitle = "Hello";
            tr.welcomeSubtitle = "You have received this gift from";
            tr.expirationText = "It will be available until";
            tr.showMessageButtonText = "Read the message";
            tr.playVideoButtonText = "Play video";
            tr.messageSubtile = "created a video for you!";
            tr.tanksTitleText = "Thank You";
            tr.tanksSubtitleText = "We hope you enjoined this gift.\nWe'll be glad to see you in our shop";
            tr.greetings1 = "This video message was recorded at ";
            tr.greetings2 = " and will be available until ";
            tr.greetings3 = "You can download the video with the button below";
            tr.downloadText = "Download";
            tr.downloadingText = "Downloading";
            tr.enableAudio = "Turn on audio";
            tr.audioEnabled = "Audio enabled";
            break;
        case "FR":
            tr.welcomeTitle = "Salut";
            tr.welcomeSubtitle = "Vous avez reçu ce cadeau de";
            tr.expirationText = "Il sera disponible jusqu'au";
            tr.showMessageButtonText = "Lire le message";
            tr.playVideoButtonText = "Lire la vidéo";
            tr.messageSubtile = "a fait une vidéo pour vous";
            tr.tanksTitleText = "Merci";
            tr.tanksSubtitleText = "Nous espérons que vous avez accepté ce cadeau.\nNous serons heureux de vous voir dans notre boutique";
            tr.greetings1 = "Ce message vidéo a été enregistré chez ";
            tr.greetings2 = " et sera disponible jusqu'à ";
            tr.greetings3 = "Vous pouvez télécharger la vidéo avec le bouton ci-dessous";
            tr.downloadText = "Télécharger";
            tr.downloadingText = "Téléchargement";
            tr.enableAudio = "Activer le son";
            tr.audioEnabled = "Audio activé";
            break;
    };
    return tr;
}

