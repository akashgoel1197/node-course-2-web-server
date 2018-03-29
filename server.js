const express = require('express')
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT||8000
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

app.set('view engine', 'hbs');



app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} , ${req.url}`
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to append the log to server.log')
        }
    })
    console.log(log);
    next();
})

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public')) //Take the middleware as function
//Express.static() take absolute path


app.get('/',(req,res)=>{
    res.render('home.hbs',{
        PageDetail : 'ROOT',
        WelcomeMessage : 'hey You how are you doing',
    })
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        PageDetail : 'About Page',
    });
})

app.get('/bad',(req,res)=>{
    res.send({
        bad : 'bad request',
        not : 'not possible'
    })
})

app.get('/projects', (req, res)=>{
    res.render('projects.hbs',{
        pageTitle: 'Projects'
    })
});
app.listen(port);