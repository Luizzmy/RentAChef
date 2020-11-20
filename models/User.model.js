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
    default: '/images/default-profile-icon-16.jpg'
  },
  favFoods:[String],
  city: String,
  state: String,
  country: String,
  googleID: String,
  role:{
    type:String,
    enum:['Chef','User'],
    default:"User"
  },
  rating:[Number],
  reviews:[String],
  phoneNumber:String
  // menu: [{name: String, type: String, price:Number, description: String}],
},{
  timestamps:true
})

module.exports=model("User", userSchema)
