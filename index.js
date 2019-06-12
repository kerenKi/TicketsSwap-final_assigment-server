const express =  require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const UserRouter = require('./src/users/routes')
const EventRouter = require('./src/events/routes')
const AuthRouter = require('./src/auth/routes')




const app = express()
const port = process.env.PORT || 4000

app
  .use(cors())
  .use(bodyParser.json())
  .use(AuthRouter)
  .use(UserRouter)
  .use(EventRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))
