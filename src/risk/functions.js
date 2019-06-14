const Ticket = require('../tickets/model')
const Comment = require('../comments/model')

async function TotalTicketsOfAuthor (userId) {
  const total = await Ticket
    .count({ where: {'user_id': userId} }).then(total => {
      console.log("The author have " + total + " tickets published")
      return total
    })
  console.log('total tickets for author:', total)  
  return total  
}

async function AveragePrice (eventId) {
  const average_price = await Ticket
    .findAndCountAll({ where: {'event_id': eventId} })
    .then(result => {
      console.log('total tickets:', result.count);
      const ticketsSum = result.rows.reduce((totalPrice, ticket) => {
        return totalPrice += Number(ticket.price)},0)
      console.log('tickets prices:', ticketsSum)
      const average = ticketsSum / result.count
      console.log('average price:', average)
      return average
    })
    .catch(console.error)
  console.log('average_price:', average_price)  
  return average_price  
}

async function TotalComments (ticketId) {
  const total = await Comment
    .count({ where: {'ticket_id': ticketId} }).then(total => {
      console.log("This ticket have " + total + " comments published")
      return total
    })
  console.log('total comments:', total)  
  return total  
}

async function TicketCreatedTime (ticketId) {
  const time =  await Ticket
    .findByPk(ticketId)
    .then(ticket => {
      console.log('ticket:', ticket.created_at)
          return ticket.created_at 
      })
      .catch(console.error)
      const timeToDate = new Date(time)
      console.log('timeToDate', timeToDate)
      console.log('type of ticket:', typeof time)
      console.log('hour of ticket:',  time.getHours())
      return time
}

async function CalculateTicketRisk (userId, eventId, ticketId) {
  let risk = 5
  const totalTickets = await TotalTicketsOfAuthor(userId)
  const averagePrice = await AveragePrice(eventId)
  const totalComments = await TotalComments(ticketId)
  const ticketTime = await TicketCreatedTime(ticketId)
  const ticketPrice =  await Ticket
  .findByPk(ticketId)
    .then(ticket => {
          return ticket.price 
      })
      .catch(console.error)

  if (totalTickets <= 1) {
    risk += 10
  }
  if (totalComments > 3) {
    risk += 5
  }
  if ( ticketPrice < averagePrice ) {
    const riskFactor = 100 - ((ticketPrice * 100) / averagePrice)
    risk += riskFactor
  }
  if ( ticketPrice > averagePrice ) {
    const riskCalculate = ((ticketPrice * 100) / averagePrice) - 100
    const decreaseRiskBy = Math.max(10, riskCalculate)
    risk -= decreaseRiskBy
  }
  if (ticketTime.getHours() < 9 || ticketTime.getHours() > 17) {
    risk += 10
  } else {
    risk -= 10
  }

  if (risk < 5) {
    risk = 5
  }
  console.log('The risk:',risk)
  return Math.min(95,risk)
}

module.exports = {
  TotalTicketsOfAuthor,
  AveragePrice,
  TotalComments,
  TicketCreatedTime,
  CalculateTicketRisk
}
