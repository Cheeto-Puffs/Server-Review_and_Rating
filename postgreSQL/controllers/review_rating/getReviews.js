const pool = require('../../postgreSQL.js')
const Redis = require('ioredis')
const redis = new Redis({
  port: 6379,
  host: '127.0.0.1',
})

module.exports = {
  getReviews: async (req, res) => {
    let { product_id, page, count, sort } = req.query

    page = page || 1
    count = count || 5

    if (sort === 'newest') {
      sort = 'date DESC'
    } else if (sort === 'helpful') {
      sort = 'helpness DESC'
    } else if (sort === 'relevant') {
      sort = 'date DESC, helpness DESC'
    }

    let offset = count * (page - 1)

    let cacheKey = `${product_id}_${page.toString()}_${count.toString()}_${sort}`
    let cache = await redis.get(cacheKey)

    if (cache) {
      cache = JSON.parse(cache)
      return res.status(200).send({ ...cache, source: 'redisCache' })
    }

    const query = {
      text: `
      SELECT id AS review_id, rating, summary, recommend, response, body, TO_TIMESTAMP(date/1000) as date, reviewer_name, helpfulness,
        (SELECT coalesce(json_agg(to_json(r_rp)), '[]') FROM
          (SELECT rp.id, rp.url
          FROM reviews_photos AS rp
          INNER JOIN reviews AS r
          ON r.id = rp.review_id
          WHERE rp.review_id = reviews.id
          ) AS r_rp
        ) AS photos
      FROM reviews
      WHERE product_id = $1 AND reported = false
      ORDER BY ${sort}
      LIMIT $2
      OFFSET $3;
      `,
      values: [product_id, count.toString(), offset.toString()],
    }

    return pool
      .connect()
      .then((client) => {
        client.query(query).then((result) => {
          redis.setex(cacheKey, 60, JSON.stringify(result))
          client.release()
          res.status(200).send(result)
        })
      })
      .catch((err) => res.status(500).send(err))
  },
}
