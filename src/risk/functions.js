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
//>>>>>>>>>>>>>>>>>>>>>>>>>.
// .then(tickets => {
//   const ticketsRisk = tickets.map(ticket => {
//     return CalculateTicketRisk(ticket.user_id,ticket.event_id,ticket.id)
//     .then(risk => {
//       return risk
//     })
//     .catch(console.error)
//   })
//   Promise.all(ticketsRisk)
//   .then(risks => {
//     return res.send({ tickets,risks })
//   })
//   .catch(console.error)
// })

// function CalculateTicketRisk (userId, eventId, ticketId) {
//   let risk = 5
//   const totalTickets = TotalTicketsOfAuthor(userId)
//   const averagePrice = AveragePrice(eventId)
//   const totalComments = TotalComments(ticketId)
//   const ticketTime = TicketCreatedTime(ticketId)
//   const ticketPrice = () => {
//     return Ticket
//     .findByPk(ticketId)
//       .then(ticket => {
//             return ticket.price 
//         })
//         .catch(console.error)
//   } 
//   console.log('CalculateTicketRisk', totalTickets, averagePrice, totalComments, ticketTime, ticketPrice())
//   Promise.all([totalTickets, averagePrice, totalComments, ticketTime, ticketPrice()])
//   .then(resolvedPromises => {
//     if (resolvedPromises[0] <= 1) {
//       risk += 10
//     }
//     if (resolvedPromises[2] > 3) {
//       risk += 5
//     }
//     if ( resolvedPromises[4] < resolvedPromises[1] ) {
//       const riskFactor = 100 - ((resolvedPromises[4] * 100) / resolvedPromises[1])
//       risk += riskFactor
//     }
//     if ( resolvedPromises[4] > resolvedPromises[1] ) {
//       const riskCalculate = ((resolvedPromises[4] * 100) / resolvedPromises[1]) - 100
//       const decreaseRiskBy = Math.max(10, riskCalculate)
//       risk -= decreaseRiskBy
//     }
//     if (resolvedPromises[3].getHours() < 9 || resolvedPromises[3].getHours() > 17) {
//       risk += 10
//     } else {
//       risk -= 10
//     }
  
//     if (risk < 5) {
//       risk = 5
//     }
//     return Math.min(95,Math.floor(risk))
//   })
  
// }

module.exports = {
  CalculateTicketRisk
}
