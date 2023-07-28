import { app } from "./app.js";
import { connectDB } from './data/connectDataBase.js'




connectDB()

app.listen(process.env.PORT,()=>{
    console.log(`Server Started at ${process.env.PORT}`)
  })

