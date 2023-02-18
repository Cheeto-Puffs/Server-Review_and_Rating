const pool = require('../../postgreSQL.js')

module.exports = {
  getReviews: (req, res) => {
    let { product_id, page, count, sort } = req.query

    page = page || 1
    count = count || 5

    sort = sort === 'newest' ? 'date DESC' : sort
    sort = sort === 'helpful' ? 'helpness DESC' : sort
    sort = sort === 'relevant' ? 'date DESC, helpness DESC' : sort

    let offset = count * (page - 1)

    const query = {
      text: `
      SELECT id AS review_id, rating, summary, recommend, response, body, TO_TIMESTAMP(date/1000) as date, reviewer_name, helpfulness,
        (SELECT coalesce(json_agg(to_json(r_rp)), '[]') FROM
          (SELECT rp.id, rp.url FROM reviews_photos AS rp
          INNER JOIN reviews AS r
          ON r.id = rp.review_id
          WHERE rp.review_id = reviews.id
          ) AS r_rp
        ) AS photos
      FROM reviews
      WHERE product_id = $1 AND reported = false
      ORDER BY $2
      LIMIT $3
      OFFSET $4;
      `,
      values: [product_id, sort, count, offset],
    }

    return pool
      .connect()
      .then((client) => {
        client.query(query).then((result) => {
          client.release()
          res.status(200).send(result)
        })
      })
      .catch((err) => res.status(500).send(err))
  },
}
