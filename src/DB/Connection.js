import mongoose from "mongoose";
export default  function () {
  try {
     mongoose.connect(process.env.DB_STRING).then(()=>{
         console.log(`Database Connected`);
     });
  } catch (error) {
    console.log(`Could not connect database...`, error);
  }
}