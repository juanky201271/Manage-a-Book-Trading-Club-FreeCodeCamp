const express = require('express')

const RequestCtrl = require('../controllers/request-ctrl')

const requestRouter = express.Router()

requestRouter.post('/request', RequestCtrl.createRequest)
requestRouter.put('/request/:_id', RequestCtrl.updateRequest)
requestRouter.delete('/request/:_id', RequestCtrl.deleteRequest)
requestRouter.get('/request/:_id', RequestCtrl.getRequestById)
requestRouter.get('/requests', RequestCtrl.getRequests)
// new
requestRouter.get('/requests/twitterid/:twitterId', RequestCtrl.getRequestsByTwitterId)
requestRouter.get('/requests/givebookid/:give_book_id', RequestCtrl.getRequestsByGiveBookId)
requestRouter.get('/requests/takebookid/:take_book_id', RequestCtrl.getRequestsByTakeBookId)
requestRouter.get('/requests/takeok/:take_ok', RequestCtrl.getRequestsByTakeOk)

module.exports = requestRouter
