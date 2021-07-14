const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(async () => {
    
    const result = await Recipe.create({
  title: "Chocolate chip Cookies",
  level: 'Easy Peasy',
  ingredients: [ 
    "1 cup salted butter* softened",
    "1 cup white (granulated) sugar",
    "1 cup light brown sugar packed",
    "2 tsp pure vanilla extract",
    "2 large eggs",
    "3 cups all-purpose flour",
    "1 tsp baking soda",
    "½ tsp baking powder",
  ],
  cuisine: "American",
  dishType: 'breakfast',
  image:'https://joyfoodsunshine.com/wp-content/uploads/2018/02/best-chocolate-chip-cookie-recipe-cooling-720x720.jpg',
  duration: 900,
  creator: "Persia",
    })
    
    console.log(result);

    const manyRecipe = await Recipe.insertMany(data)
    console.log(manyRecipe)

    const updateRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese"},
      { $set: { duration: 110 } },
      { new: true },
    )
console.log( "Update => ", updateRecipe)


const deleteRecipe = await Recipe.deleteOne(
  { _id: manyRecipe[3]._id }
)

console.log("DELETED CAT => ", deleteRecipe)
close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
