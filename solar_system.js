var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ex_solar_system');
var Schema = mongoose.Schema;

var solarSystemSchema = new Schema({
    planets: [{ type: Schema.Types.ObjectId, ref: 'planet' }],
    starName: String
});

var planetSchema = new Schema({
    name: String,
    system: { type: Schema.Types.ObjectId, ref: 'system' },
    visitors: [{ type: Schema.Types.ObjectId, ref: 'visitor' }]
});

var visitorSchema = new Schema({
    name: String,
    homePlanet: {type: Schema.Types.ObjectId, ref: 'planet'},
    visitedPlanets: [{type: Schema.Types.ObjectId, ref: 'planet'}]
});
var SolarSystem = mongoose.model("system", solarSystemSchema);
var Planet = mongoose.model("planet", planetSchema);
var Visitor = mongoose.model("visitor", visitorSchema);

var system1 = new SolarSystem({
    Starname: "Sun1",
    planets: []
});

var planet1 = new Planet({
    name: "Earth",
    system: system1._id,
    visitors: []
});
var planet2 = new Planet({
    name: "Saturn",
    system: system1._id,
    visitors: []
});
var planet3 = new Planet({
    name: "Mars",
    system: system1._id,
    visitors: []
});


var visitor1 = new Visitor({
    name: "Karlos",
    homePlanet: planet1._id,
    visitedPlanets: []
});
var visitor2 = new Visitor({
    name: "Pedro",
    homePlanet: planet1._id,
    visitedPlanets: []
});

// system1.save();
// planet1.save();
// planet2.save();
// planet3.save();
// visitor1.save();
// visitor2.save();

// planet1.visitors.push(visitor1);
// planet2.visitors.push(visitor1);
// planet2.visitors.push(visitor2);
// visitor1.visitedPlanets.push(planet1, planet2);
// visitor2.visitedPlanets.push(planet1);
// system1.planets.push(planet1,planet2);
// system1.save();
// planet1.save();
// visitor1.save();
// visitor2.save();
// Planet.findOne({}).populate('visitors').exec(function(err, answer){
//     if (err) throw err;
//     else 
//     console.log(answer)
// })
//Find a visitor's list of visited planets
// Visitor.find({visitedPlanets: {$not: {$size: 0}}}).populate('visitedPlanets','name').exec(function(err, res){
//     // console.log(res);
//     for(i in res){
//     console.log(res[i]);
//     }
//   });

// // Find all the visitors on a planet
// Planet.find({visitors: {$not: {$size: 0}}}).populate('visitors','name').exec(function(err, res){
//     // console.log(res);
//     for(i in res){
//     console.log(res[i]);
//     }
//   });
  //Find all the visitors in a system planets: {$not: {$size: 0}}
  SolarSystem.find({planets: {$not: {$size: 0}}}).populate({
    path: 'planets',
    populate: {
      path: 'visitors'
    }
  }).exec(function(err, res) {
    console.log(err); 
    const MyVisitors=new Set();
    var length_planets=res[0].planets.length;
    for (let n=0; n<length_planets; n++){
        for (let s=0; s<res[0].planets[n].visitors.length; s++){
            MyVisitors.add(res[0].planets[n].visitors[s].name);
        }
    }
    for (let item of MyVisitors) {
        console.log(item);}
  
  });
	//({planets:{$elemMatch:{ visitors: {$not: {$size: 0}} } } })
