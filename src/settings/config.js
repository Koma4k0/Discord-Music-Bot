require("dotenv").config();

/*
**  THIS IS AN OLD VERSION OF SOUND WAVE (MY PUBLIC MUSIC BOT), THIS SOURCE IS PRIOR TO V2 RELEASE.
**  THE BOT DOES WORK, HOWEVER DOES HAVE SOME BUGS AND THE CODE IS SOMEWHAT MESSY.
**  IF YOU NEED HELP WITH ANYTHING BELOW CONTACT ME VIA https://koma4k.xyz/ (I WILL NOT HELP WITH UPDATING THE BOT, ONLY SETUP)
*/

module.exports = {
    // ⬇⬇⬇ BOT DETAILS
    token: process.env.TOKEN || "", // <==== YOUR BOT TOKEN
    prefix: process.env.PREFIX || "sw!", // <==== SET YOUR PRERIX FOR OWNER COMMANDS
    color: process.env.EMBED_COLOR || "#ff0000", // <==== YOUR EMBED HEX COLOR
    owner: process.env.OWNER_ID || "1133030912397938820", // <==== BOTS OWNER ID
    guildLogs: process.env.GUILD_LOGS || "", // <==== YOUR SERVER JOIN/LEFT LOGS CHANNEL ID
    leaveTimeout: process.env.LEAVE_TIMEOUT || "30000", // <==== SET LEAVE TIMEOUT WHEN BOT WAS ALONE || 1000 = 1sec
    disableYouTube: parseBoolean(process.env.DISABLE_YOUTUBE || "true"), // <==== SET "TRUE OR FALSE" | ENABLE/DISABLE YOUTUBE FEATURES. DISABLING THIS WILL MAKE "AUTOPLAY" COMMANDS USELESS!!!

    // ⬇⬇⬇ PORU DETAILS
    playSource: process.env.PLAY_SOURCE || "ytsearch", // <==== SET YOUR PLAY SOURCE || "ytsearch","ytmsearch","scsearch"
    poruOptions: {
        defaultPlatform: process.env.DEFAULT_SOURCE || "ytsearch", // <==== SET DEFAULT SOURCE || "ytsearch","ytmsearch","scsearch"
        clientID: process.env.SPOTIFY_ID || "", // <==== YOUR SPOTIFY CLIENT ID (https://developer.spotify.com)
        clientSecret: process.env.SPOTIFY_SECRET || "", // <==== YOUR SPOTIFY CLIENT SECRET (https://developer.spotify.com)
        reconnectTries: 5, // <==== TOTAL ATTEMPS TO TRY IF RECONNECT FAILED. YOU CAN CHANGE IT TO "Infinity" FOR UNLIMITED ATTEMPS BUT NOT RECOMMENDED.
        playlistLimit: 100, // <==== 1 = 100 TRACKS
        albumLimit: 50, // <==== 1 = 50 TRACKS
        artistLimit: 50, // <==== 1 = 50 TRACKS
        searchMarket: "us",
    },

    // ⬇⬇⬇ NODE DETAILS (If the node doesn't work you can find a list of working nodes here: https://lavainfo.moebot.pro)
    nodes: [
        {
            name: process.env.NODE_NAME1 || "Main Node", // lavalink node name (anything you want)
            host: process.env.NODE_HOST1 || "lava.link", // <==== LAVALINK NAME HOST
            port: parseInt(process.env.NODE_PORT1 || "80"), // <==== LAVALINK PORT
            password: process.env.NODE_PASSWORD1 || "kronix", // <==== PASSWORD/AUTH
            secure: parseBoolean(process.env.NODE_SECURE1 || "false"), // <==== LAVALINK SECURE "true/false"
            regions: process.env.NODE_REGIONS1 || ["singapore"], // <==== AVAILABLE LAVALINK REGIONS [ "singapore","indonesian","japan" ]
        }
    ],

    // ⬇⬇⬇ LINK BOTS DETAILS
    mongoUri: process.env.MONGO_URI || "", // <==== YOUR MONGODB LINK (https://www.mongodb.com)
    supportUrl: process.env.SUPPORT_URL || "", // <==== YOUR SUPPORT SERVER LINK
    voteUrl: process.env.VOTE_URL || "", // <==== YOUR TOP.GG VOTE URL
    inviteUrl: process.env.INVITE_URL || "", // <==== YOUR BOT INVITE LINK (RECOMMEND SETTING PERMISSIONS TO ADMIN)
    imageUrl: process.env.IMAGE_URL || "", // <==== YOUR BOT IMAGE LINK
};

function parseBoolean(value) {
    if (typeof value === "string") {
        value = value.trim().toLowerCase();
    }
    switch (value) {
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}
