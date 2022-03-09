
module.exports=function(app){
    app.get('/driver-details',async(req,res)=>{
        res.json({
            driver:1
        })
    })
}