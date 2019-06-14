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

async function averagePrice (eventId) {
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


module.exports = {
  TotalTicketsOfAuthor,
  averagePrice,
  TotalComments
}
