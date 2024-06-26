const { ClusterManager } = require("discord-hybrid-sharding");
require("dotenv").config();

const manager = new ClusterManager(`${__dirname}/index.js`, {
    totalShards: "auto",
    shardsPerClusters: 5,
    totalClusters: "auto",
    mode: "process",
    token: process.env.TOKEN || "", // <=== PASTE YOU TOKEN BOT HERE
});

manager.on("clusterCreate", (cluster) => console.log(`[INFO] Bot Launched Cluster ${cluster.id}`));
manager.spawn({ timeout: -1 });
