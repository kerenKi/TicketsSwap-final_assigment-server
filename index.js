const express =  require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./src/auth/routes')
const UserRouter = require('./src/users/routes')
const EventRouter = require('./src/events/routes')
const TicketRouter = require('./src/tickets/routes')
const CommentRouter = require('./src/comments/routes')
const { TotalTicketsOfAuthor, AveragePrice, TotalComments, TicketCreatedTime, CalculateTicketRisk } = require('./src/risk/functions')


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

  // TotalTicketsOfAuthor(3)  
  // // console.log('total tickets', TotalTicketsOfAuthor(6))
  // console.log('average price eventId 6:', AveragePrice(6))
  // // console.log('average price eventId 1:', AveragePrice(1))
  // const average1 = AveragePrice(1)
  // console.log('av1:', average1)
  // TotalComments(1)
  // TotalComments(2)
  // TicketCreatedTime(2)
  console.log('risk:', CalculateTicketRisk(6,6,1))