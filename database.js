const { createConnection, EntitySchema, getConnection} = require("typeorm");

const dbOpen = () => createConnection({
    type: "sqlite",
    synchronize: true,
    logging: true,
    logger: "simple-console",
    database: process.env.ProgramData + '\\POC_Data\\productDatabase.sqlite',
    // database: process.env.ProgramData + '\\T3\\AngularElectronPOCApp\\productDatabase.sqlite',
    entities: [
      new EntitySchema(require("./src/assets/model/product.schema.json")),
      new EntitySchema(require("./src/assets/model/stock.schema.json")),
      new EntitySchema(require("./src/assets/model/user.schema.json")),
    ]
}).then(async (connection) => {
    console.log('opening connection');
    return  await connection;
}).catch((error) => {
    console.error('Error: ', error);
});


const dbClose = async() => {
  let connection;
try {
   connection = await getConnection();
   if (!connection.isConnected) {
     console.log("Closing connection")
     return await connection.close()
   }
} catch (e) {
  // no connection created yet, nothing to get
  console.log("No Connection detected")
 }
}


module.exports ={
    dbOpen : dbOpen(),
    dbClose : dbClose()
} 
