
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");


app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());


var aes256 = require('aes256');
var axios = require("axios").default
const BFF = process.env.BFF
const dbSchema = process.env.DBSCHEMA

async function encryption(JSONData) { 

  const time = new Date();  ///pick current time
  var json = { APIKEY: '088DE49ECf0c5da1dCADDE49ECf0c5da1dCADd8c24D2F4c4a71ee0c19B', currentTime: time, data: JSONData }
  const myJSON = JSON.stringify(json);

  var key = "My Shairtime Passphrase";//symmetric encryption key
  var plainText = myJSON;

  var encrypted = aes256.encrypt(key, plainText);
  console.log(encrypted)
  return encrypted;

}
//dummy get function in path  /

app.get('/', (req, res) => {
  res.send("connected to API")
})

//sample select query with no condition
app.post("/genericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.demo`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['intfield'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})





//sample insert query
app.post("/insert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.demo`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['intfield'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//sample update query 
app.post("/update", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /update';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.demo`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['intfield'];
    // arrKeyFields includes the key fields to be put in the where query
   // reqBodyObj.arrKeyFields = ['intfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/update", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})


//sample MULTIPLEupdate query 
app.post("/bulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.demo`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['intfield'];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})



//sample direct sql query 
app.post("/direct", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})




app.listen(process.env.SERVER_PORT, () => {
  console.log("Server at", process.env.SERVER_PORT);
})

const validate = (data) => {
  const errors = {};
  const regex = new RegExp(
    "[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})"
  );
  // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (!data.user_firstname) {
    errors.user_firstname = "First name is required!";
  }
  // else if (data.user_firstname < 3) {
  //   errors.user_firstname = "First name must be more than 4 characters";
  // } 
  if (!data.user_lastname) {
    errors.user_lastname = "Last name is required!";
  }
  // else if (data.user_lastname < 3) {
  //   errors.user_lastname = "Last name must be more than 4 characters";
  // } 
  if (!data.user_email) {
    errors.user_email = "Email is required!";
  } else if (!regex.test(data.user_email)) {
    errors.user_email = "This is not a valid email format!";
  }
  if (!data.user_passwd) {
    errors.user_passwd = "Password is required!";
  } else if (data.user_passwd.length < 4) {
    errors.user_passwd = "Password must be more than 4 characters";
  } else if (data.user_passwd.length > 10) {
    errors.user_passwd = "Password cannot exceed more than 10 characters";
  } 
  else if (!strongRegex.test(data.user_passwd)) {
    errors.user_passwd = "Invalid format: Accepted format is John@123";
  }
  // if (!data.user_lang) {
  //   errors.user_lang = " Language is required!";
  // }
  // if (!data.user_type) {
  //   errors.user_type = "Type is required!";
  // }
  return errors;
};

//////////////////////////////insert//////////////////////////

//register insert
app.post("/registerinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    console.log(reqBodyObj)
    let error = validate(reqBodyObj.objJsonData[0]);
    if (Object.keys(error).length) {
      console.log(error);
      return res.status(400).send(error);
    }
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.users`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ["user_typeid", "user_id"];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})


//activity insert
app.post("/activityinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.activity`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ["act_id","farm_id","paddock_id","estd_hours"];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }
  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//chemicals insert
app.post("/chemicalsinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.chemicals`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ["chemical_id","farm_id","withholding_period" , "user_id"];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }
  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//chemicalinventoryingoinginsert
app.post("/chemicalinventoryingoinginsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.chemicalinventoryingoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ["id", "farm_id","chemical_qnty"];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//chemicalinventoryoutgoinginsert
app.post("/chemicalinventoryoutgoinginsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.chemicalinventoryoutgoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['id','farm_id','chemical_qnty'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//chemicalinventorystocktakeinsert
app.post("/chemicalinventorystocktakeinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.chemicalinventorystocktake`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['id','farm_id','chemical_qnty'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//equipmentinsert
app.post("/equipmentinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.equipment`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['equipment_id','user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }
  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//farm_fueltanksinsert
app.post("/farm_fueltanksinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.farm_fueltanks`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['ft_id','farmid','ft_capacity','user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//farmpaddockinsert
app.post("/farmpaddockinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.farmpaddock`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['paddockid','farmid','paddock_size','cultivarid','year','user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//farmsinsert
app.post("/farmsinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.farms`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['farmid'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fertiliserinventoryingoinginsert
app.post("/fertiliserinventoryingoinginsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fertiliserinventoryingoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['id','farm_id','fertiliser_qnty'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fetiliserinventoryoutgoinginsert
app.post("/fertiliserinventoryoutgoinginsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fertiliserinventoryoutgoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['id','farm_id','fertiliser_qnty'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }
  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fertiliserinventorystocktakeinsert
app.post("/fertiliserinventorystocktakeinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fertiliserinventorystocktake`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['id','farm_id','paddock_id','fertiliser_qnty','user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }
  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fertilisersinsert
app.post("/fertiliserinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fertiliser`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ["fertiliser_id","farm_id","fertiliser_inventory",, "user_id"];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fuelinventoryingoinginsert
app.post("/fuelinventoryingoinginsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fuelinventoryingoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['farm_id','id','fuel_qnty'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }
  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fuelinventoryoutgoinginsert
app.post("/fuelinventoryoutgoinginsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fuelinventoryoutgoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['farm_id','paddock_id','id','fuel_qnty'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fuelinventorystocktakeinsert
app.post("/fuelinventorystocktakeinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fuelinventorystocktake`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['farm_id','paddock_id','fuel_qnty'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }
  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//grain_contractsinsert
app.post("/grain_contractsinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.grain_contracts`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['farm_id','product','qnty'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }
  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//graininventoryintktsinsert
app.post("/graininventoryintktsinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.graininventoryintkts`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['farm_id','silo_id','id','harvt_farm_id','grain_amount','user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }
  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//graininventoryouttktsinsert
app.post("/graininventoryouttktsinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.graininventoryouttkts`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['farm_id','silo_id','id','havt_farm_id','grain_amount','endconfirm_amount','out_farmid','out_paddockid'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }
  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})
//graininventorytransferinsert
app.post("/graininventorytransferinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.graininventorytranfer`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['farm_id','grain_qnty'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})
//jobsinsert
app.post("/jobsinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.jobs`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['job_id','user_id', 'job_status'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//cultivarsinsert
app.post("/cultivarsinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.cultivars`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ["cultivar_id","user_id","grain_weight","cultivar_status"];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//farm_fueltanksinsert
app.post("/farm_fueltanksinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.farm_fueltanks`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['ft_id','farmid','ft_capacity','user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//silosinsert
app.post("/silosinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.silos`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['silo_id','farmid','silo_capacity','user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//nozzlesinsert
app.post("/nozzlesinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.nozzles`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ['nozzles_id','farmid','operating_pressure', 'user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})
//waterlicensesinsert
app.post("/waterlicensesinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.waterlicenses`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ['water_license_id', 'user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//equipmentinsert
app.post("/equipmentinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.equipment`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ['equipment_id', 'user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})


//waterstorageinsert
app.post("/waterinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.water_storage`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['waterstorage_id','farmid','ws_surfacearea','ws_maxdepth','ws_slopefactor','ws_capacity','user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//livestockinsert
app.post("/livestockinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.livestock`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =['livestock_id','user_id','livestock_number'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//activity insert
app.post("/activityinsert", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupsert-insertOperation1';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.activity`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =["act_id","farmid","paddockid","estd_hours","act_contract","act_started","act_completed","act_approved"];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    let response = await axios.post(BFF + "/insert", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }
  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

///////////////////////////////////////SELECT/////////////////////////////////////////////////

//farmsgenericselect
app.post("/farmsgenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.farms`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['farmid','user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})
//logingenericselect
app.post("/logingenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.users`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['user_id','user_typeid'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//usersgenericselect
app.post("/usersgenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.users`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['owner_id','user_id', 'user_typeid'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})
//jobsgenericselect

app.post("/jobsgenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.jobs`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['job_id','user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//farmpsddockgenericselect

app.post("/farmpaddockgenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.farmpaddock`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =['paddockid','farmid','paddock_size','cultivarid','year','user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }
  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//chemicalsgenericselect

app.post("/chemicalsgenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.chemicals`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ["chemical_id","farm_id","withholding_period", "user_id"];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }
  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//cultivarsgenericselect

app.post("/cultivarsgenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.cultivars`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ["cultivar_id","user_id","grain_weight","cultivar_status"];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }
  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fertilisergenericselect

app.post("/fertilisergenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fertiliser`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ["fertiliser_id","fertiliser_inventory",, "user_id"];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }
  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})



//farm_fueltankgenericselect

app.post("/farm_fueltanksgenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.farm_fueltanks`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =['ft_id','farmid','ft_capacity','user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//farm_silosgenericselect

app.post("/silosgenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.silos`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =['silo_id','farmid','silo_capacity','user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//nozzlesgenericselect

app.post("/nozzlesgenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.nozzles`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ['nozzles_id','farmid','operating_pressure', 'user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})


//waterlicensesgenericselect

app.post("/waterlicensesgenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.waterlicenses`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ['water_license_id', 'user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//equipmentgenericselect

app.post("/equipmentgenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.equipment`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ['equipment_id','user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})


//waterstoragegenericselect


app.post("/water_storagegenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.water_storage`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =['waterstorage_id','farmid','ws_surfacearea','ws_maxdepth','ws_slopefactor','ws_capacity','user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//livestockgenericselect


app.post("/livestockgenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.livestock`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =['livestock_id','user_id','livestock_number'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})



//activitygenericselect
app.post("/activitygenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.activity`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ["act_id","farmid","paddockid","estd_hours","act_contract","act_started","act_completed","act_approved"];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//chemicalingoinggenericselect
app.post("/chemicalingoinggenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.chemicalinventoryingoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =["id", "farm_id","archived","chemical_qnty"];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//chemicaloutgoinggenericselect
app.post("/chemicaloutgoinggenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.chemicalinventoryoutgoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['id','farm_id','archived','chemical_qnty'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//chemicalstocktakegenericselect
app.post("/chemicalstocktakegenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.chemicalinventorystocktake`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =['id','farm_id','paddock_id','archived','chemical_qnty'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fertiliseringoinggenericselect
app.post("/fertiliseringoinggenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fertiliserinventoryingoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =['id','farm_id','archived','fertiliser_qnty'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fertiliseroutgoinggenericselect
app.post("/fertiliseroutgoinggenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fertiliserinventoryoutgoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =['id','farm_id','archived','fertiliser_qnty'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fertiliserstocktakeggenericselect
app.post("/fertiliserstocktakeggenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fertiliserinventorystocktake`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =['id','farm_id','paddock_id','archived','fertiliser_qnty'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fuelingoinggenericselect
app.post("/fuelingoinggenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fuelinventoryingoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =['id','farm_id','archived']
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fueloutgoingggenericselect
app.post("/fueloutgoingggenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fuelinventoryoutgoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =['id','farm_id','paddock_id','archived','fertiliser_qnty'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fuelstocktakeggenericselect
app.post("/fuelstocktakeggenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fuelinventorystocktake`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =['id','farm_id','paddock_id','fuel_qnty','archived','stocktake_status','reported']
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})




///////////////////////////////DELETE//////////////////////////////////////////////////////////

//farmsdelete
app.post("/farmsdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})



//jobs delete
app.post("/jobsdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//farmpaddockdelete
app.post("/farmpaddockdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//chemicalsdelete
app.post("/chemicalsdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//cultivarsdelete
app.post("/cultivarsdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fertiliserdelete
app.post("/fertiliserdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})


//farmfueltankdelete
app.post("/fueltankdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//farmsilostankdelete
app.post("/silosdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})
//nozzlesdelete
app.post("/nozzlesdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})


//waterlicensesdelete
app.post("/waterlicensesdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//equipmentdelete
app.post("/equipmentdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})



//water_storagedelete
app.post("/waterdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//livestockdelete
app.post("/livestockdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})




//activity delete
app.post("/activitydelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//chemicalingoingdelete
app.post("/chemicalingoingdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//chemicaloutgoingdelete
app.post("/chemicaloutgoingdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//chemicalstocktakedelete
app.post("/chemicalstocktakedelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fertiliserinventoryingoingdelete
app.post("/fertiliserinventoryingoingdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fertiliserinventoryoutgoingdelete
app.post("/fertiliserinventoryoutgoingdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fertiliserinventorystocktakedelete
app.post("/fertiliserinventorystocktakedelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})


//fuelinventoryingoingdelete
app.post("/fuelinventoryingoingdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fuelinventoryoutgoingdelete
app.post("/fuelinventoryoutgoingdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fuelinventorystocktakedelete
app.post("/fuelinventorystocktakedelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

/////////////////////////////update////////////////////////////////////////////

//farmsbulkupdate 
app.post("/farmsbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.farms`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ['farmid','user_id'];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})
//paddockbulkupdate 
app.post("/paddockbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.farmpaddock`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ['paddockid','farmid','paddock_size','cultivarid','created_year','user_id'];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//chemicalsbulkupdate 
app.post("/chemicalsbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.chemicals`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ["chemical_id","farm_id","withholding_period", "user_id"];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)
    res.status(200).send(response.data)
  }
  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//cultivarsbulkupdate 
app.post("/cultivarsbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.cultivars`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ["cultivar_id","user_id","grain_weight","cultivar_status"];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)
    res.status(200).send(response.data)
  }
  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fertiliserbulkupdate 
app.post("/fertiliserbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fertiliser`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ["fertiliser_id","fertiliser_inventory", "user_id"];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)
    res.status(200).send(response.data)
  }
  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})


app.post("/fueltankbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.farm_fueltanks`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ['ft_id','farmid','ft_capacity'];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

app.post("/silosbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.silos`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ['silo_id','farmid','silo_capacity','user_id'];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//nozzlesbulkupdate
app.post("/nozzlesbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.nozzles`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ['nozzles_id','farmid','operating_pressure', 'user_id'];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})


//waterlicensesbulkupdate
app.post("/waterlicensesbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.waterlicenses`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ['water_license_id', 'user_id'];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//equipmentbulkupdate
app.post("/equipmentbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.equipment`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ['equipment_id', 'user_id'];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})



///water_storagebulkupdate

app.post("/waterbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.water_storage`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ['waterstorage_id','farmid','ws_surfacearea','ws_maxdepth','ws_slopefactor','ws_capacity', 'user_id'];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

///livestockbulkupdate

app.post("/livestockbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.livestock`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =['livestock_id','user_id','livestock_number'];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})


//activitybulkupdate 
app.post("/activitybulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.activity`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ["act_id","farmid","paddockid","estd_hours","act_contract","act_started","act_completed","act_approved"];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//chemicalingoingbulkupdate
app.post("/chemicalingoingbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.chemicalinventoryingoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =["id", "farm_id","archived","chemical_qnty"];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//chemicaloutgoingbulkupdate 
app.post("/chemicaloutgoingbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.chemicalinventoryoutgoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['id','farm_id','archived','chemical_qnty'];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//chemicalstocktakebulkupdate 
app.post("/chemicalstocktakebulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.chemicalinventorystocktake`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['id','farm_id','paddock_id','archived','chemical_qnty'];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fertiliseringoingbulkupdate 
app.post("/fertiliseringoingbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fertiliserinventoryingoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['id','farm_id','archived','fertiliser_qnty'];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fertiliseroutgoingbulkupdate 
app.post("/fertiliseroutgoingbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fertiliserinventoryoutgoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['id','farm_id','archived','fertiliser_qnty'];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fertiliserstocktakebulkupdate 
app.post("/fertiliserstocktakebulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fertiliserinventorystocktake`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['id','farm_id','paddock_id','archived','fertiliser_qnty'];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})



//fuelingoingbulkupdate 
app.post("/fuelingoingbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fuelinventoryingoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['id','farm_id','archived']
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fueloutgoingbulkupdate 
app.post("/fueloutgoingbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fuelinventoryoutgoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['id','farm_id','paddock_id','fuel_qnty','archived']
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//fuelstocktakebulkupdate 
app.post("/fuelstocktakebulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.fuelinventorystocktake`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =['id','farm_id','paddock_id','fuel_qnty','archived','stocktake_status','reported']
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})





//graininventoryingoinggenericselect


app.post("/grainingoinggenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.graininventoryingoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =['silo_id','id','harvt_farm_id','grain_amount', 'user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})
//graininventoryoutgoinggenericselect


app.post("/grainoutgoinggenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.graininventoryoutgoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =['silo_id','id','harvt_farm_id','grain_amount','endconfirm_amount','out_farmid','out_paddockid','archived','weigh_bridge', 'user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})
//graininventorytransfergenericselect


app.post("/graintransfergenericselect", async (req, res) => {

  try {
   
    if (Object.keys(req.body.paramObject).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /genericselect';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.graininventorytransfer`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields = ['id','grain_qnty','transfer_amount','trn_status','archived','user_id'];
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;
    console.log(reqBodyObj)
    let encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/genericselect", { data: encptedjson })

    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})

//grainingoingdelete
app.post("/grainingoingdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})
//grainoutgoingdelete
app.post("/grainoutgoingdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})
//graintransferdelete
app.post("/graintransferdelete", async (req, res) => {

  try {
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /direct';
    var encptedjson = await encryption(reqBodyObj);
    var response = await axios.post(BFF + "/direct", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})


///grainngoingbulkupdate

app.post("/grainingoingbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.graininventoryingoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ['silo_id','id','harvt_farm_id','grain_amount'];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})
///grainoutgoingbulkupdate

app.post("/grainoutgoingbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.graininventoryoutgoing`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ['silo_id','id','harvt_farm_id','grain_amount','endconfirm_amount','out_farmid','out_paddockid','archived','weigh_bridge',  'user_id'];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})
///graintransferbulkupdate

app.post("/graintransferbulkupdate", async (req, res) => {

  try {
    if (Object.keys(req.body.objJsonData).length === 0) { throw new Error(`req.body.objJsonData is empty`); }
    let reqBodyObj = req.body;
    reqBodyObj.strCallerFunction = 'post /bulkupdate';
    // strTablename holds the name of the table to which the insertion need to be performed
    reqBodyObj.tableName = `${dbSchema}.graininventorytransfer`;
    // arrNumFields includes the list of numeric fields in the table. string array of fields ['field1','field2']
    reqBodyObj.arrNumFields =  ['id','grain_qnty','transfer_amount','trn_status','archived', 'userId'];
    // arrKeyFields includes the key fields to be put in the where query
    //reqBodyObj.arrKeyFields = ['strfield']; 
    // boolAtomic decides whether the transaction need to be atomic. False will be for non atomic transaction.
    reqBodyObj.boolAtomic = false;

    var encptedjson = await encryption(reqBodyObj);

    var response = await axios.post(BFF + "/bulkUpdate", { data: encptedjson })
    console.log(response.data)

    res.status(200).send(response.data)
  }


  catch (err) {
    console.log(err);
    res.status(400).send("error in submission")
  }
})