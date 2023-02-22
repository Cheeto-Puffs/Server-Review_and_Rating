const pool = require('../../postgreSQL.js')
// const Redis = require('ioredis')
// const redis = new Redis({
//   port: 6379,
//   host: '127.0.0.1',
// })

module.exports = {
  getReviewMeta: async (req, res) => {
    let { product_id } = req.query

    // let cacheKey = `Meta_${product_id}`
    // let cache = await redis.get(cacheKey)

    // if (cache) {
    //   cache = JSON.parse(cache)
    //   return res.status(200).send({ ...cache, source: 'redisCache' })
    // }

    return pool
      .connect()
      .then(async (client) => {
        await client.query('BEGIN')

        let ratings = {}
        let recommended = {}
        let characteristics = {}

        let ratingQuery = {
          text: `
          SELECT
          COUNT(CASE WHEN rating = 1 THEN 1 END) as rating_1,
          COUNT(CASE WHEN rating = 2 THEN 1 END) as rating_2,
          COUNT(CASE WHEN rating = 3 THEN 1 END) as rating_3,
          COUNT(CASE WHEN rating = 4 THEN 1 END) as rating_4,
          COUNT(CASE WHEN rating = 5 THEN 1 END) as rating_5,
          COUNT(CASE WHEN recommend = true THEN 1 END) as recommend_true,
          COUNT(CASE WHEN recommend = false THEN 1 END) as recommend_false
          FROM reviews WHERE product_id = $1;`,
          values: [product_id],
        }
        const ratingQueryResult = await client.query(ratingQuery)
        for (let key in ratingQueryResult.rows[0]) {
          key === 'rating_1'
            ? (ratings['1'] = ratingQueryResult.rows[0][key])
            : null
          key === 'rating_2'
            ? (ratings['2'] = ratingQueryResult.rows[0][key])
            : null
          key === 'rating_3'
            ? (ratings['3'] = ratingQueryResult.rows[0][key])
            : null
          key === 'rating_4'
            ? (ratings['4'] = ratingQueryResult.rows[0][key])
            : null
          key === 'rating_5'
            ? (ratings['5'] = ratingQueryResult.rows[0][key])
            : null
          key === 'recommend_true'
            ? (recommended['true'] = ratingQueryResult.rows[0][key])
            : null
          key === 'recommend_false'
            ? (recommended['false'] = ratingQueryResult.rows[0][key])
            : null
        }

        let charQuery = {
          text: 'SELECT id, name FROM characteristics WHERE product_id = $1',
          values: [product_id],
        }
        const charQueryResult = await client.query(charQuery)

        for (var i = 0; i < charQueryResult.rows.length; i++) {
          let charReviewsQuery = {
            text: 'SELECT avg(value) AS value FROM characteristic_reviews WHERE characteristic_id = $1',
            values: [charQueryResult.rows[i].id],
          }
          let charReviewsQueryResult = await client.query(charReviewsQuery)

          characteristics[charQueryResult.rows[i].name] = {
            id: charQueryResult.rows[i].id,
            value: charReviewsQueryResult.rows[0].value,
          }
        }

        await client.query('COMMIT')
        client.release()

        let result = { product_id, ratings, recommended, characteristics }
        // redis.setex(cacheKey, 600, JSON.stringify(result))

        res.status(200).send(result)
      })
      .catch((err) => res.status(500).send(err))
  },
}
