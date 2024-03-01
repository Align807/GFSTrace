var aes256 = require('aes256');
var axios =require("axios").default

async function init()
{
    try{
var json= {"objJsonData":[{"strfield":"GIVE THANKS","datefield":null,"intfield":1,"boolfield":true}, 
{"strfield":"GOD BLESS YOU","datefield":"2021-08-04","intfield":2,"boolfield":true},
{"strfield":"PEACE BE WITH YOU","datefield":"2021-08-04","intfield":3,"boolfield":true},
{"strfield":"hlo","datefield":"2021-08-04","intfield":4,"boolfield":true}
]
};
var response = await axios.post("http://localhost:3002/insert",json)

console.log(response.data)
    }
    catch(e)
    {
        console.log(e)
    }
}

init()