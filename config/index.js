require("dotenv").config();
var link={   
        NameURL:process.env.Host_URL,
        DbName:process.env.index_data_DB       
}
module.exports={
    link
}
















// module.exports={
//  NAME:process.env.APP_Name,
//  PORT:process.env.APP_PORT,
//  DB_URL:process.env.App_DB
// };