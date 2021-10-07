const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https = require("https");


const app= express();

app.use(express.static ("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req, res){

    var firstName=req.body.fName;
    var lastName=req.body.lName;
    var email=req.body.email;


    var data={
          email_address:email,
          status:"subscribed",
          merge_fields:{
            FNAME:firstName,
            LNAME:lastName
          }
        };

    console.log("data: ", data);
        var jsonData=JSON.stringify(data);

        const url="https://us5.api.mailchimp.com/3.0/lists/52f669d9ee/members";

       const options={
         method:"POST",
         auth:"kason1:e3086d64bad55a4be6f95636c772d25b-us5"
       }

        const request =https.request(url,options,function(response){

             if (response.statusCode===200){
               res.sendFile(__dirname+"/success.html");
             }
             else{
               res.sendFile(__dirname+"/failure.html");
             }


          response.on("data",function(data){
            console.log(JSON.parse(data));
          })
        })
        request.write(jsonData);
        request.end();
});


app.post("/failure",function(req,res){
  res.redirect("/")
})
 app.listen(3000,function(){
   console.log("server is running on port 3000");
 })




//API KEY  e3086d64bad55a4be6f95636c772d25b-us5
// LIST ID 52f669d9ee
