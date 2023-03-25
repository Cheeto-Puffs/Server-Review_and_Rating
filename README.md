<h1 align="left">SDC - Review & Rating Server</h1>

###

<h2 align="left">Summary</h2>

###

<p align="left">🎯 Goals: Our team was given a legacy database to build an API for an E-commerce website that is expected to handle one million units of data and traffic. I was responsible for the review and rating server part of the website.</p>

###

<h2 align="left">Tech</h2>

###

<div align="left">
 <h4>PostgreSQL<span><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height="20" width="32" alt="postgresql logo" /></span></h3>
</div>

- <p align="left">PostgreSQL was chosen to store and handle different queries due to the highly organized and defined data.</p>

<div align="left">
 <h4>Redis<span><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" height="20" width="32" alt="redis logo"  /></span></h3>
</div>

- <p align="left">By utilizing the Redis cache system, the performance of the server was improved from handling approximately 250 requests per second with a latency of approximately 2 seconds to handling approximately 1000 requests per second with a latency of approximately 30 milliseconds.</p>

<div align="left">
 <h4>K6 <span><img src="https://user-images.githubusercontent.com/20960197/227672921-c058aa0d-0ac6-40e5-96e5-932eb29ddfec.png" height="20" width="32" alt="k6 logo" /></span></h3>
</div>

- <p align="left">The local smoke tests, stress tests, and load tests are run using K6.</p>

<div align="left">
 <h4>AWS<span><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" height="20" width="32" alt="amazonwebservices logo" /></span></h3>
</div>

- <p align="left">The server was deployed on an AWS EC2 Ubuntu t2.micro instance and a load balancer with four EC2 instances was used for horizontal scaling. This resulted in an improvement in performance from around 1000 requests per second (rps) with an average latency of around 800 milliseconds (ms) and an error rate of approximately 45%, to around 2000 rps with an average latency of around 100ms and an error rate of approximately 4%.</p>

<div align="left">
 <h4>Nginx<span><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" height="20" width="32" alt="nginx logo" /></span></h3>
</div>

- <p align="left">Nginx was used as the load balancer as it allows for easy addition and removal of instances on request. The t2 micro system has hardware limitations that make this a necessary choice. Nginx cache was preferred over Redis cache due to the ability to create a shared proxy cache that can be used by different services with different software stacks. This means that even if the API is down, nginx can still respond with cached content.</p>

###

<h2 align="left">Result</h2>

###

[Result Link](https://gist.github.com/VesLan/12c44d0585562989b6c62b36d3e3447a)

<h2 align="left">Language</h2>

###

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" width="52" alt="javascript logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" width="52" alt="html5 logo"  />
</div>

###
