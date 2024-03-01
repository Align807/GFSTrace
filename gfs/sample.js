
var aes256 = require('aes256');
var axios =require("axios").default

async function  encryption(JSONData)
{   
 
    const time=new Date();  ///pick current time
    var json={APIKEY:"088DE49ECf0c5da1dCADDE49ECf0c5da1dCADd8c24D2F4c4a71ee0c19B",currentTime:time,data:JSONData}
    const myJSON = JSON.stringify(json);
    
    var key = "My Shairtime Passphrase";//symmetric encryption key
    var plainText = myJSON;
  
    var encrypted = aes256.encrypt(key, plainText);
    console.log(encrypted)
    return encrypted;
    
} 

// json={}

// encptedjson=encryption(json)

// axios.post(url ,encptedjson)


//sample select query with no condition
async function select()
{
    var json={
        "paramObject" : {
            "queryId":"DEMO_DATA",
            "paramArray":[],
            "strCallerFunction" :"DEMO DATA"
        }
    }
    var encptedjson =await encryption(json);
    var response = await axios.post("http://localhost:8080/api-service/genericselect",{data:encptedjson})

    console.log(response.data)
}
//select()    //uncomment to call


//sample select query with one condition
async function select2()
{
    var json={
        "paramObject" : {
            "queryId":"SELECT2",
            "paramArray":["samp1",],
            "strCallerFunction" :"SELECT2"
        }
    }
    var encptedjson =await encryption(json);
    var response = await axios.post("http://localhost:8080/api-service/genericselect",{data:encptedjson})

    console.log(response.data)
}
//select2()    //uncomment to call


//sample select query with two condition
async function select3()
{
    var json={
        "paramObject" : {
            "queryId":"SELECT3",
            "paramArray":["samp1","345"],
            "strCallerFunction" :"SELECT3"
        }
    }
    var encptedjson =await encryption(json);
    var response = await axios.post("http://localhost:8080/api-service/genericselect",{data:encptedjson})

    console.log(response.data)
}
//select3()    //uncomment to call



//sample insert query 
async function insert()
{
    var json={
        "objJsonData":[{"strfield":"DATAAADATA3","datefield":"2021-08-04","intfield":1,"boolfield":true}],
        "strCallerFunction": 'post /insertOperation1',
      "tableName": 'demo',
     "arrNumFields": [ 'intfield' ],
    "boolAtomic": true
}


    var encptedjson =await encryption(json);
    var response = await axios.post("http://localhost:8080/api-service/insert",{data:encptedjson})

    console.log(response.data)
}
//insert()    //uncomment to call


//sample update query 
async function update()
{
    var json={"objJsonData":{"intfield":123,"boolfield":false},   //what all are the assginments
    "arrKeyFields" : ["intfield"],     //from above json which all field are in where condition of update
   
    "strCallerFunction": 'post /update-updateOperation1',
  "tableName": 'demo',
  "arrNumFields": [ 'intfield' ],
  "boolAtomic": false}


    var encptedjson =await encryption(json);
    var response = await axios.post("http://localhost:8080/api-service/update",{data:encptedjson})

    console.log(response.data)
}
//update()    //uncomment to call



//sample direct query 
async function direct()
{  
    var array=[]
    var json={"strCallerFunction":"direct query","updateQuery":"update demo set intfield=5","updateValues": array,"boolAtomic": false }


    var encptedjson =await encryption(json);
    var response = await axios.post("http://localhost:8080/api-service/direct",{data:encptedjson})

    console.log(response.data)
}
direct()    //uncomment to cal









// //sample delete query 
// async function deleted()
// {
//     var json={}
//      var id="123"

//     var encptedjson =await encryption(json);
//     var response = await axios.delete("http://localhost:8080/api-service/delete",{data:encptedjson},{
//         method: "DELETE",
//         headers: {
         
//           "Content-Type": "application/json" 
//         },
//         params:{id:id}})

//     console.log(response.data)
// }
// deleted()    //uncomment to call