const {Schema, model}=require('mongoose')

const userSchema = new Schema({
  names: String,
  lastNames: String,
  description: String,
  email:{
    type: String,
    unique: true
  },
  password: String,
  picture:{
    type: String,
    default: '../public/images/default-profile-icon-16.jpg'
  },
  favFoods:[String],
  city: String,
  state: String,
  country: String,
  googleID: String
},{
  timestamps:true
})

module.exports=model("User", userSchema)
