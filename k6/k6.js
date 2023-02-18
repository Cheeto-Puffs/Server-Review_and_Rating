import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  // // Smoke Test
  // vus: 1,
  // duration: '5s',

  // thresholds: {
  //   http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  // },

  // Load Test
  stages: [
    { duration: '5m', target: 1000 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '10m', target: 1000 }, // stay at 100 users for 10 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
}

export default function () {
  const loginRes = http.get(
    `http://127.0.0.1:3000/api/reviews?sort='newest'&product_id=40350`
  )
  // console.log(JSON.parse(loginRes.body).rows)
  check(loginRes, {
    'logged in successfully': (resp) => resp.json('access') !== '',
  })

  check(loginRes, {
    'is status 200': (r) => r.status === 200,
  })

  sleep(1)
}
