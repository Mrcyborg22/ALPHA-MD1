const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU5NQzNHalNqdW1meEMzK1hpWGtRVlF1cWVkbVdBYnlyWVZaKzVGcHQyMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVpUTTZVUkJkY1kxY0hnMzhJb20rTVMyaEU3VDlTRHlmRmhFam1EcDYzbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRTkV1cnBvRFlkNFdnbVJOVFptS00vK3F6NnlMZXFOTEVMaFp1dUQxbm5nPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoRDJCWkoySmRMUEo2MWJiWmV4S1dzbTkzbXo0dlNRZFFvYlcwMnRBR2tRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVMM1g2aVN1Q3FzeklKeDJFUUVaa1ZBV3FMZ3VaZDlKY24wWUlVUzdqa3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitLbTZmTUtXK1RMNHc3OGhFcnBuUEwrWnJ3dWNwZHo1UnhFRFdFMFdKa1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUUxa3ZjUXBPem5IYlVod090TUw4cHlVTEVKSEt4SXFkbGdSTjV1RVNVND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR1lOZUxtb29MNGxnRzFQOHVyeWRzc0hickRwQnQrZXViS3lSWVphSG5DYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ill4cmFpV0s4K0UxQ2xCclFXTnBWQnB3cmpvbHlGMCtySHJoUWQySm85YVNvT0gyMWg2OTdrSlZhQktVNkY1d0IrUUlSSEhLOFhvTFFRUlFPOHp6UWhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzgsImFkdlNlY3JldEtleSI6IlNkT0gvbVVZdk1nejNITklrQjRRTllsTlFQZjM3MjRyeG9qZlppRW9Jc2M9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM3NjU2MzYwMzE3QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkVCNUI4QzA0QTU4OTI4NTlCNDA5MjFFNTY2ODM5MEY4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzIwNDQ1NzZ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Imx2UnAyT1lsU3h1Z1R4OXVsa0RpV1EiLCJwaG9uZUlkIjoiZThkNDVjMWUtY2E3MS00N2RkLTlkM2EtNjYwODZiMTJkMWQ3IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJ1aDhXU25HUnVUU2EwTHVzZkVpemdxTXRzUT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZbTlJM21aUFRZUnBvcWQxSDlTS0FYUUJWN3M9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVE1TQzZUWUciLCJtZSI6eyJpZCI6IjIzNzY1NjM2MDMxNzo0NEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS0hmK3N3R0VJM084N2tHR0EwZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiK0R1a08wNW5ycjF3NWpFMVg3dzFHUHdHK2MwSGZxWGp1NHNmQ0dWem9UMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVmFRVXRWVG51MWhodEFlWDd3cEw0RHRnKzhLUllLejg0TzN3T3NDUW9hRFJ1Rk0vYzRveU5tS3ZZVjVBbTlWRm02SHFNN2tQUnkzRWtZdVFBazExQ3c9PSIsImRldmljZVNpZ25hdHVyZSI6IkhFR0JYWEtoeUJPdmdMQ1NsSXU2NkVxU2QvYWdwY2lPd1UxV1l5YVU2QXJtL05IcDZxdFJ0Vjl6TGhORnlJeVJzTVZtcjlUV0NNQ09xNjhJbWdneGdRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM3NjU2MzYwMzE3OjQ0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZnN3BEdE9aNjY5Y09ZeE5WKzhOUmo4QnZuTkIzNmw0N3VMSHdobGM2RTkifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzIwNDQ1NzEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQzVHIn0=',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Keithkeizzah/ALPHA-MD1',
    OWNER_NAME : process.env.OWNER_NAME || "mrcyborg",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "237656360317 
        ",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'yes',              
    CHATBOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.BLOCK_ALL || 'no',              
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    CAPTION : process.env.CAPTION || "ALPHA-MD",
    BOT : process.env.BOT_NAME || 'ALPHA_MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL: process.env.ANTICALL || 'no',              
    CHATBOT : process.env.PM_CHATBOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
