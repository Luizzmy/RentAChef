// const {Schema, model}=require('mongoose')

// const chefSchema= new Schema({
//   names: String,
//   lastNames: String,
//   description: String,
//   email:{
//     type: String,
//     unique: true
//   },
//   password: String,
//   picture:{
//     type: String,
//     default: '../public/images/default-profile-icon-16.jpg'
//   },
//   favFoods:[String],
//   menu: [{name: String, type: String, price:Number, description: String}],
//   city: String,
//   state: String,
//   country: String,
//   googleID: String,
//   reviews: [String],
//   Rating: [Number],
//   phoneNumber: String,
//   role:{
//     type:String,
//     default:"Chef"
//   }
// },{
//   timestamps:true
// })

// module.exports=model("Chef", chefSchema)