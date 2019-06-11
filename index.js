const express =  require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
//later import the relevant routers
// const productsRouter = require('./src/products/routes')



const app = express()
const port = process.env.PORT || 4000

app
  .use(cors())
  .use(bodyParser.json())
  //later use relevant routers
  // .use(productsRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))
