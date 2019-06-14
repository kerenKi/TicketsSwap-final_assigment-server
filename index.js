const express =  require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./src/auth/routes')
const UserRouter = require('./src/users/routes')
const EventRouter = require('./src/events/routes')
const TicketRouter = require('./src/tickets/routes')
const CommentRouter = require('./src/comments/routes')
const { CalculateTicketRisk } = require('./src/risk/functions')


const app = express()
const port = process.env.PORT || 4000

app
  .use(cors())
  .use(bodyParser.json())
  .use(AuthRouter)
  .use(UserRouter)
  .use(EventRouter)
  .use(TicketRouter)
  .use(CommentRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))

  // console.log('risk:', CalculateTicketRisk(6,6,1))