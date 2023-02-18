const pool = require('../../postgreSQL.js')

module.exports = {
  markHelpful: (req, res) => {
    const review_id = req.params.review_id
    return pool
      .connect()
      .then((client) => {
        client
          .query({
            text: 'UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1',
            values: [review_id],
          })
          .then((result) => {
            client.release()
            res.status(200).send(result)
          })
      })
      .catch((err) => res.status(500).send(err))
  },
}
