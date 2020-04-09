const Request = require('../models/request-model')
const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

createRequest = async (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({ success: false, error: 'You must provide a request', })
  }
  const request = new Request(body)
  if (!request) {
    return res.status(400).json({ success: false, error: 'You must provide a correct json request', })
  }
  // body with givebookid, takebookid, takeok and twitterId
  await request
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        _id: request._id,
        message: 'Request created!',
      })
    })
    .catch(err => {
      return res.status(400).json({ success: false, error: err, })
    })
}

updateRequest = async (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({ success: false, error: 'You must provide a request', })
  }
  await Request
    .findOne({ _id: ObjectId(req.params._id) }, (err, request) => {
      if (err) {
        return res.status(400).json({ success: false, error: err, })
      }
      if (!request) {
        return res.status(404).json({ success: false, error: 'Request not found', })
      }
      request.take_ok = body.take_ok
      //await
      request
        .save()
        .then(() => {
          return res.status(201).json({
            success: true,
            _id: request._id,
            message: 'Request updated!',
          })
        })
        .catch(err => {
          return res.status(400).json({ success: false, error: err, })
        })
    })
    .catch(err => {
      return res.status(400).json({ success: false, error: err, })
    })
}

deleteRequest = async (req, res) => {
  await Request
    .findOneAndDelete({ _id: ObjectId(req.params._id) }, (err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err, })
      }
      //if (!request) {
      //  return res.status(404).json({ success: false, error: 'Request not found', })
      //}
      return res.status(200).json({ success: true, }) // data: request})
    })
    .catch(err => {
      return res.status(400).json({ success: false, error: err, })
    })
}

getRequestById = async (req, res) => {
  await Request
    .findOne({ _id: ObjectId(req.params._id) }, (err, request) => {
      if (err) {
        return res.status(400).json({ success: false, error: err, })
      }
      if (!request) {
        return res.status(404).json({ success: false, error: 'Request not found', })
      }
      return res.status(200).json({ success: true, data: request})
    })
    .catch(err => {
      return res.status(400).json({ success: false, error: err, })
    })
}

getRequests = async (req, res) => {
  await Request
    .find({}, (err, requests) => {
      if (err) {
        return res.status(400).json({ success: false, error: err, })
      }
      if (!requests.length) {
        return res.status(404).json({ success: false, error: 'Requests not found', })
      }
      return res.status(200).json({ success: true, data: requests})
    })
    .catch(err => {
      return res.status(400).json({ success: false, error: err, })
    })
}

getRequestsByTwitterId = async (req, res) => {
  await Request
    .find({ twitterId: req.params.twitterId }, (err, request) => {
      if (err) {
        return res.status(400).json({ success: false, error: err, })
      }
      if (!request) {
        return res.status(404).json({ success: false, error: 'Request not found', })
      }
      return res.status(200).json({ success: true, data: request})
    })
    .catch(err => {
      return res.status(400).json({ success: false, error: err, })
    })
}

getRequestsByGiveBookId = async (req, res) => {
  await Request
    .find({ give_book_id: req.params.give_book_id }, (err, request) => {
      if (err) {
        return res.status(400).json({ success: false, error: err, })
      }
      if (!request) {
        return res.status(404).json({ success: false, error: 'Request not found', })
      }
      return res.status(200).json({ success: true, data: request})
    })
    .catch(err => {
      return res.status(400).json({ success: false, error: err, })
    })
}

getRequestsByTakeBookId = async (req, res) => {
  await Request
    .find({ take_book_id: req.params.take_book_id }, (err, request) => {
      if (err) {
        return res.status(400).json({ success: false, error: err, })
      }
      if (!request) {
        return res.status(404).json({ success: false, error: 'Request not found', })
      }
      return res.status(200).json({ success: true, data: request})
    })
    .catch(err => {
      return res.status(400).json({ success: false, error: err, })
    })
}

getRequestsByTakeOk = async (req, res) => {
  await Request
    .find({ take_ok: req.params.take_ok }, (err, request) => {
      if (err) {
        return res.status(400).json({ success: false, error: err, })
      }
      if (!request) {
        return res.status(404).json({ success: false, error: 'Request not found', })
      }
      return res.status(200).json({ success: true, data: request})
    })
    .catch(err => {
      return res.status(400).json({ success: false, error: err, })
    })
}

deleteRequestByGiveBookId = async (req, res) => {
  await Request
    .findAndDelete({ give_book_id: ObjectId(req.params.give_book_id) }, (err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err, })
      }
      //if (!request) {
      //  return res.status(404).json({ success: false, error: 'Request not found', })
      //}
      return res.status(200).json({ success: true, }) // data: request})
    })
    .catch(err => {
      return res.status(400).json({ success: false, error: err, })
    })
}

deleteRequestByTakeBookId = async (req, res) => {
  await Request
    .findAndDelete({ take_book_id: ObjectId(req.params.take_book_id) }, (err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err, })
      }
      //if (!request) {
      //  return res.status(404).json({ success: false, error: 'Request not found', })
      //}
      return res.status(200).json({ success: true, }) // data: request})
    })
    .catch(err => {
      return res.status(400).json({ success: false, error: err, })
    })
}

module.exports = {
  createRequest,
  updateRequest,
  deleteRequest,
  getRequestById,
  getRequests,
  getRequestsByTwitterId,
  getRequestsByGiveBookId,
  getRequestsByTakeBookId,
  getRequestsByTakeOk,
  deleteRequestByGiveBookId,
  deleteRequestByTakeBookId
}
