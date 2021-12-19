const express = require("express");
const body_parser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
var PORT = 3000;

app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended:true
}));

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'domingo.fritsch17@ethereal.email',
        pass: 'z78KGRUEXEAAuChQPH'
    }
});

app.post('/', async (req,res) => {
    const {to, email_body} = req.body;
    console.log(email_body);
    try {
        await transporter.sendMail({
            from : "abc@gmail.com",
            to,
            subject : "Demo",
            text: email_body,
        });
        res.json({
            success: true,
            message: "Email sent successfully",
        })
    } catch(e) {
        console.log(e.message);
        res.json({
            success: false, 
            message: e.message,
        })
    }
});



app.listen(PORT, function(err){
    if (err) console.log(err.message);
    console.log("Server listening on PORT", PORT);
});