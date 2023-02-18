const pool = require('../../postgreSQL.js')

module.exports = {
  addReview: (req, res) => {
    const {
      product_id,
      rating,
      summary,
      body,
      recommend,
      name,
      email,
      photos,
      characteristics,
    } = req.body

    return pool
      .connect()
      .then(async (client) => {
        await client.query('BEGIN')

        const addReviewQuery = {
          text: `
          INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email)
          VALUES ($1, $2, EXTRACT(epoch FROM CURRENT_TIMESTAMP) * 1000 + EXTRACT(milliseconds FROM CURRENT_TIMESTAMP), $3, $4, $5, $6, $7)
          RETURNING id;
          `,
          values: [product_id, rating, summary, body, recommend, name, email],
        }
        const addReviewResult = await client.query(addReviewQuery)
        const new_review_id = addReviewResult.rows[0].id

        const addPhotosQuery = {
          text: `
          INSERT INTO reviews_photos (review_id, url)
          SELECT $1, unnest($2::TEXT[]) AS url;
          `,
          values: [new_review_id, photos],
        }
        const addPhotosResult = await client.query(addPhotosQuery)

        for (var key in characteristics) {
          console.log(Number(key), typeof Number(key), characteristics[key])
          let addCharReviewQuery = {
            text: `
            INSERT INTO characteristic_reviews (review_id, characteristic_id, value)
            VALUES ($1, $2, $3);
            `,
            values: [new_review_id, Number(key), characteristics[key]],
          }
          await client.query(addCharReviewQuery)
        }

        await client.query('COMMIT')
        res.status(201).send()
      })
      .catch((err) => res.status(500).send(err))
  },
}
