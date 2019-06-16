const Ticket = require('../tickets/model')
const Comment = require('../comments/model')

function TotalTicketsOfAuthor (userId) {
  return Ticket
    .count({ where: {'user_id': userId} })
    .then(total => {
      return total
    })
}

function AveragePrice (eventId) {
  return Ticket
    .findAndCountAll({ where: {'event_id': eventId} })
    .then(result => {
      const ticketsSum = result.rows
        .reduce((totalPrice, ticket) => {
          return totalPrice += Number(ticket.price)},0)
      const average = ticketsSum / result.count
      return average
    })
    .catch(console.error)
}

function TotalComments (ticketId) {
  return Comment
    .count({ where: {'ticket_id': ticketId} })
    .then(total => {
      return total
    })
}

function TicketCreatedTime (ticketId) {
  return Ticket
    .findByPk(ticketId)
    .then(ticket => {
          return ticket.created_at 
      })
      .catch(console.error)
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
  return Math.min(95,Math.floor(risk))
}

module.exports = {
  CalculateTicketRisk
}
