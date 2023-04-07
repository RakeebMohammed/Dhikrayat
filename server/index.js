let express=require('express')
let cors=require('cors')
let {mongoose}=require('mongoose')
let bodyparser=require('body-parser')
let postRoutes=require('./routes/post')

const  app=express()
app.use(cors())
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json({limit:'30mb',extended:true}))
app.use('/post',postRoutes)
let url='mongodb://localhost:27017'
let port =process.env.PORT || 3001
mongoose.connect(url).then(()=>{
    app.listen(port,()=>console.log(`App is listening to port ${port}`))
}).catch(err=>{
    console.log(err);
})

