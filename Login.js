const express=require('express');
const zod=require('zod');
const app=express();




const schema=zod.object({
    first_name:zod.string(),
    last_name:zod.string(),
    phonenumber:zod.int().min(10),
    email:zod.string().email(),
    Username:zod.string(),
    password:zod.string().min(6),

});


app.get('/loginexp',(req,res)=>{
    const {first_name,last_name,phonenumber,email,Username,password}=req.body;
    
});

app.listen(5000);