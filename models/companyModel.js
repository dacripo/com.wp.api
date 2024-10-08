var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var companySchema = new Schema({
	'cif' : { type: String, index: true, required: true, unique: true },
	'name' :  String,
	'logo' :  String,
	'email' :  String,
	'phone' :  String,
	'lat' :  String,
	'lng' :  String,
	'postCode' :  String,
	'webPage' :  String,
	'fullAddress' :  String,
	'twitter' :  String,
	'facebook' :  String,
	'linkedin' :  String,
	'trollNumber':{
		type: Number,
	 	default :  0
	},
	'schemaVer' : {
		type: Number,
	 	default :  1
	}
});
companySchema.plugin(uniqueValidator);
module.exports = mongoose.model('company', companySchema);
