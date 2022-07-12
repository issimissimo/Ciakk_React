export const translation = (language) => {
    const tr = {};
    switch (language) {
        case "EN":
            tr.welcomeTitle = "Hello";
            tr.welcomeSubtitle = "You have received this gift from";
            tr.expirationText = "It will be available until";
            tr.showMessageButtonText = "Read the message";
            tr.playVideoButtonText = "Watch my video ";
            tr.messageSubtile = "created a video for you!";
            tr.tanksTitleText = "Thank You";
            tr.tanksSubtitleText = "We hope you enjoined this gift.\nWe'll be glad to see you in our shop";
            tr.replayButtonText = "Replay video";
            tr.homeButtonText = "Return to home";
            break;
        case "FR":
            tr.welcomeTitle = "Salut";
            tr.welcomeSubtitle = "Vous avez reçu ce cadeau de";
            tr.expirationText = "Il sera disponible jusqu'au";
            tr.showMessageButtonText = "Lire le message";
            tr.playVideoButtonText = "Lire ma vidéo";
            tr.messageSubtile = "a fait une vidéo pour vous";
            tr.tanksTitleText = "Merci";
            tr.tanksSubtitleText = "Nous espérons que vous avez accepté ce cadeau.\nNous serons heureux de vous voir dans notre boutique";
            tr.replayButtonText = "Rejouer la vidéo";
            tr.homeButtonText = "Retourner à la maison";
            break;
    };
    return tr;
}

