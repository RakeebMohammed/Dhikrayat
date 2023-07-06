const userSchema=require('../modal/userSchema')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

exports.SignIn=async(req,res)=>{
  const  {password,email}=req.body
      const emailExist=await userSchema.findOne({email})
      if(! emailExist) return res.status(404).json({message:'No user found'})
      const passwordCheck=await bcrypt.compare(password,emailExist.password,)   
      if(! passwordCheck) return res.status(404).json({message:'Invalid password'})
const token=jwt.sign({email:emailExist.email,id:emailExist._id},process.env.SECRET,{expiresIn:'4h'})
res.status(200).json({result:emailExist,token})
    }
exports.SignUp=async(req,res)=>{
    const  {firstname,lastname,password,confirmpassword,email}=req.body
    const emailExist=await userSchema.findOne({email})
    if( emailExist) return res.status(404).json({message:'User already exist'})
    if(password!==confirmpassword) return res.status(404).json({message:'Password mismatch'})
    const hashedPassword=bcrypt.hash(password,12)
const  result=await userSchema.create({email,password:hashedPassword,name:`${firstname} ${lastname}`})
const token =jwt.sign({email:result.email,id:result._id},process.env.SECRET,{expiresIn:'4h'})
res.status(200).json({result,token})
}