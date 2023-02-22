import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'
import http from 'k6/http'
import { check, sleep } from 'k6'

const last10percent = Math.floor(100011 * 0.1)
const product_id =
  Math.floor(Math.random() * last10percent) + (1000011 - last10percent)
const page = 1
const count = Math.floor(Math.random() * 5 + 1)
const sortOption = ['helpful', 'newest', 'relevant']
const sortBy = sortOption[Math.floor(Math.random() * 3)]

export const options = {
  // // Smoke Test
  // vus: 1,
  // duration: '5s',

  // thresholds: {
  //   http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  // },

  // Load Test
  summaryTrendStats: ['min', 'avg', 'med', 'max', 'p(95)', 'p(99)'],
  stages: [
    { duration: '10s', target: 1000 }, // simulate ramp-up of traffic from 1 to 100 users over 10s
    { duration: '10m', target: 1000 }, // stay at 1000 users for 10m
    // { duration: '10s', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: [{ threshold: 'p(95) < 150', abordOnFail: true }], // 99% of requests must complete below 1s
    http_req_failed: [{ threshold: 'rate < 0.01', abordOnFail: true }],
  },
}

export default function () {
  const BASE_URL = 'http://127.0.0.1:3000/api'

  // for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
  //   let response = http.get(
  //     `${BASE_URL}/reviews?sort=${sortBy}&product_id=${product_id}&page=${page}&count=${count}`
  //   )
  //   let metaResponse = http.get(
  //     `${BASE_URL}/reviews/meta?product_id=${product_id}`
  //   )
  //   sleep(1)
  // }
  let response = http.get(
    `${BASE_URL}/reviews?sort=${sortBy}&product_id=${product_id}&page=${page}&count=${count}`
  )
  // let metaResponse = http.get(
  //   `${BASE_URL}/reviews/meta?product_id=${product_id}`
  // )
  sleep(1)
}

export function handleSummary(data) {
  return {
    'summary.html': htmlReport(data),
  }
}
