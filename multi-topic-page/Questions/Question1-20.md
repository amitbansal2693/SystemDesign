1. How to Detect System Slowness? (Traffic Doubles)
   Metrics to Monitor:
   •	Application Level: Response time (p50, p95, p99), Error rate, Throughput (RPS)
   •	JVM (Java): Garbage collection pause time, Heap usage, Thread count, GC frequency
   •	Infrastructure: CPU utilization (>70% warning), Memory (heap + non-heap), Network latency, Packet loss
   •	Database: Query execution time, Connection pool exhaustion, Lock wait time, Slow query log
   •	Cache: Hit ratio drop, Eviction rate, Latency spike (Redis/Memcached)
   •	Dependencies: Downstream service latency, Circuit breaker state, Queue depth
   Action Plan: Set up alerts at 60-70% threshold. Use distributed tracing to identify bottleneck layer.

2. Design Monitoring & Alerting System for Production
   Components:
   •	Metrics Collection: Prometheus/Datadog/New Relic (pull-based)
   •	Logs Aggregation: ELK/Splunk (centralized logging)
   •	Distributed Tracing: Jaeger/Zipkin (end-to-end request tracking)
   •	Alerting Rules:
   o	P99 latency > 500ms
   o	Error rate > 1%
   o	GC pause > 100ms
   o	DB connection pool > 80%
   Critical: Multi-metric correlation before escalation (prevent alert fatigue)

3. Database Connection Pool Exhaustion - Solution?
   Root Causes:
   •	Slow queries blocking connections
   •	Connection leaks in application code
   •	Database too slow to accept new connections
   Solutions:
1.	Immediate: Increase pool size (HikariCP: maximumPoolSize)
2.	Investigation: Check slow query log, identify N+1 queries
3.	Long-term:
      o	Connection pooling: Keep pool small (2x CPU cores)
      o	Add statement timeout
      o	Monitor connection hold time
      o	Implement queue timeout in pool configuration
      Code Example:
      java
      HikariDataSource ds = new HikariDataSource();
      ds.setMaximumPoolSize(20);
      ds.setMinimumIdle(5);
      ds.setConnectionTimeout(30000); // 30s
      ds.setIdleTimeout(600000); // 10m
      ds.setMaxLifetime(1800000); // 30m

4. GC Pauses Killing Performance - How to Fix?
   Diagnosis:
   •	Check GC logs: -XX:+PrintGCDetails -XX:+PrintGCDateStamps
   •	Identify: Full GC vs Young GC frequency
   Solutions:
1.	Increase heap size (if not causing long pauses)
2.	Switch GC algorithm:
      o	Young traffic: G1GC or ZGC (low latency)
      o	Batch jobs: Serial/Parallel GC
3.	Reduce object allocation: Use object pools, StringBuilder instead of string concat
4.	Tune generations: -XX:NewRatio=2 (adjust young:old ratio)
      Formula: Heap = Peak Live Data × 1.5 + safety margin

5. Redis/Cache Hit Ratio Drops from 95% to 60% - Diagnosis?
   Possible Causes:
1.	Eviction policy triggered: LRU/LFU running (memory full)
2.	Cache invalidation issue: Stale data or aggressive TTL
3.	Working set size increased: Traffic spike with new data patterns
4.	Network partition: Read from secondary replica (stale)
      Response:
      •	Check memory usage: INFO memory
      •	Review eviction logs: CONFIG GET maxmemory-policy
      •	Increase Redis memory or optimize key TTL
      •	Implement cache warming for critical data

6. Design Database for 10M Users, 1M Concurrent Reads/Sec
   Architecture:
   Write → Master DB
   ↓
   Replication (async, 500ms lag)
   ↓
   Read Replicas (3-5 instances)
   ↓
   Query Router (application-level routing)
   Key Decisions:
   •	Sharding: By user_id (geographical/hash-based)
   •	Cache: Redis for hot user data (profiles, sessions)
   •	Replication: Async (faster, eventual consistency acceptable)
   •	Indexes: On filter columns (status, created_at), composite indexes
   •	Storage Engine: InnoDB (MVCC), proper buffer pool sizing

7. N+1 Query Problem - Detect & Fix
   Problem:
   java
   // BAD: 1 query to get users, then N queries for each user's orders
   List<Users> users = db.findAll();
   for (User u : users) {
   u.setOrders(db.findOrdersByUserId(u.getId())); // N queries
   }
   Detection:
   •	Enable query logging, count by query pattern
   •	Use APM tools (New Relic/DataDog) to identify slow transactions
   •	Look for repeated queries in distributed traces
   Fixes:
1.	Batch fetch: IN clause to fetch all at once
2.	Join: SQL LEFT JOIN with result mapping
3.	Lazy loading: Load only when accessed
4.	Caching: Store user→orders mapping in Redis

8. How to Scale Write-Heavy System (1M writes/sec)?
   Architecture:
   •	Queue: Kafka/RabbitMQ (async processing)
   •	Write-Through: Dual write to cache + DB
   •	Batch writes: 1000 records per batch, 100ms window
   •	Sharding: Partition by key (user_id)
   •	Write replicas: Distribute write load across replicas
   Example:
   API → Kafka Producer (async)
   ↓
   Message Queue
   ↓
   Consumer Pool (4-8 instances)
   ↓
   Batch INSERT + Cache update

9. Load Balancer Strategy for Uneven Request Distribution
   Problem: Some servers get 80% traffic, others 20%
   Causes & Fixes:
1.	Sticky sessions: Use session affinity wisely (can cause imbalance)
      o	Fix: Distribute across LB with hash distribution
2.	Server capacity differences:
      o	Monitor server health and adjust weights
3.	Hot partitions: One server handles all requests for popular user
      o	Fix: Consistent hashing, replica sharding
      Optimal Algorithm: Least connections + health check weight adjustment

10. Design Cache-Aside vs Write-Through Pattern
    Pattern	Pros	Cons	Use Case
    Cache-Aside	Simple, high hit ratio	Cache miss latency, stale data	Read-heavy (user profiles)
    Write-Through	Always fresh	Slower writes, double write	Critical data (payments, inventory)
    Write-Behind	Fast writes	Data loss risk, inconsistency	Analytics, logging
    Implementation (Cache-Aside):
    java
    public Object get(String key) {
    Object val = cache.get(key);
    if (val == null) {
    val = db.get(key);
    cache.set(key, val, TTL);
    }
    return val;
    }

11. Handle Database Replication Lag (500ms)
    Problem: Read replicas lag behind master
    Solutions:
1.	Critical reads: Route to master (user just updated)
2.	Eventual consistency acceptable: Route to replica
3.	Read-after-write: Store user preference, read from master for 1 second
4.	Versioning: Add version field, client waits for version bump
      Code:
      java
      User u = db.update(user); // master
      cache.set("recently_updated:" + u.id, u.version);

// For critical reads
if (cache.exists("recently_updated:" + u.id)) {
return masterDB.get(u.id);
}

12. Microservices Network Latency Issues
    Symptoms: P99 latency 5s, but each service averages 100ms
    Causes:
    •	Cascading timeouts (Service A waits for B, B waits for C)
    •	Network packet loss/retransmission
    •	DNS resolution delay
    •	Connection pool starvation
    Fixes:
1.	Timeouts: Set per-service (50ms for internal calls)
2.	Circuit breaker: Fail fast instead of waiting
3.	Connection pooling: Reuse TCP connections (HTTP keep-alive)
4.	DNS caching: Use internal DNS cache (10-30s TTL)
5.	Batch requests: GraphQL or internal batch API

13. Design Rate Limiting for API
    Strategy:
    Per-user: 1000 req/min
    Per-IP: 5000 req/min
    Per-endpoint: 10000 req/min
    Implementation:
    •	Token bucket: Redis, refill at fixed rate
    •	Sliding window: Last 60 seconds of requests
    •	Fixed window: Simpler, 1% error edge case
    Code (Redis):
    java
    public boolean isAllowed(String userId) {
    String key = "ratelimit:" + userId;
    Long count = redis.incr(key);
    if (count == 1) {
    redis.expire(key, 60); // 1 minute window
    }
    return count <= 1000;
    }

14. Handle Thundering Herd Problem
    Scenario: Cache key expires, 10K requests hit DB simultaneously
    Solutions:
1.	Probabilistic early expiration: Refresh at 70% TTL
2.	Locking: First request fetches, others wait
3.	Longer TTL + versioning: Serve stale while updating async
4.	Cache warming: Pre-load before expiry
      Recommended:
      java
      if (cache.timeToLive(key) < TTL * 0.3) {
      // Async refresh
      asyncExecutor.submit(() -> refresh(key));
      return cache.getStale(key);
      }

15. Debugging Memory Leak in Java Application
    Detection:
    •	Heap usage steadily increases despite GC
    •	Check: jstat -gc -h10 <pid> 1000 (every 1 second)
    Tools:
    •	jmap -heap <pid>: Heap summary
    •	jmap -dump:live,format=b,file=heap.bin <pid>: Dump heap
    •	jhat heap.bin: Analyze in browser
    •	Eclipse MAT / YourKit profiler
    Common Causes:
1.	Static collections: static List<Object> cache = new ArrayList()
2.	Thread pools: ThreadLocal not cleaned
3.	Listeners/Callbacks: Not unregistered
4.	Cache without eviction policy

16. Design Circuit Breaker Pattern
    States:
1.	Closed (normal): Requests pass through
2.	Open (failing): Fail fast, don't call service
3.	Half-Open (testing): Allow 1 request to test recovery
      Implementation:
      java
      public class CircuitBreaker {
      private State state = State.CLOSED;
      private int failureCount = 0;
      private long lastFailureTime = 0;
      private static final int THRESHOLD = 5;
      private static final long TIMEOUT = 60000; // 1 min

public Object execute(Callable<Object> task) {
if (state == State.OPEN) {
if (System.currentTimeMillis() - lastFailureTime > TIMEOUT) {
state = State.HALF_OPEN;
} else {
throw new CircuitBreakerOpenException();
}
}

    try {
        Object result = task.call();
        onSuccess();
        return result;
    } catch (Exception e) {
        onFailure();
        throw e;
    }
}
}

17. Design High-Availability (HA) System with 99.99% SLA
    Formula: Downtime allowed = (1 - 0.9999) × 365 days = 52 minutes/year
    Architecture:
    Multi-Region (3 regions)
    ↓
    Active-Active (not Active-Passive)
    ↓
    Each region: 3-5 availability zones
    ↓
    Data replication: 200ms max lag
    Components:
    •	DNS failover: 30-60 second TTL
    •	Database: Multi-master (Galera/MongoDB) or async replication
    •	Load Balancer: Health checks every 5 seconds
    •	Auto-scaling: Spin up in 30 seconds
    •	Backup: RTO < 1 hour, RPO < 5 min

18. SAP Commerce Specific: Handle Flash Sale (10x Traffic Spike)
    Challenges:
    •	Inventory updated frequently (race conditions)
    •	Cart operations increase (DB write heavy)
    •	Payment processing bottleneck
    •	Product catalog heavy reads
    Solution:
1. Pre-scale infrastructure (24 hrs before)
2. Queue cart operations → Kafka
3. Batch inventory updates (10s window)
4. Read catalog from Redis cache
5. Separate payment queue (dedicated pool)
6. Feature flag: Disable non-critical features
   Code Pattern:
   java
   // Inventory update - avoid double booking
   public synchronized void decrementInventory(String productId, int qty) {
   Product p = cache.get(productId);
   if (p.stock < qty) throw new OutOfStockException();
   cache.decrement(productId + ":stock", qty);
   // Async persist to DB
   eventBus.publish(new InventoryUpdatedEvent(productId, qty));
   }

19. Database Sharding Strategy: Hotspot & Rebalancing
    Sharding Key: By user_id (good cardinality, stable)
    Problem: One shard gets 80% traffic (celebrity user)
    Solutions:
1.	Replica shards: Replicate hot shard across servers
2.	Secondary shard: Hash(user_id + nonce) for read-only replicas
3.	Consistent hashing: Add virtual nodes to shift load gradually
      Rebalancing:
      •	Downtime method: Pause writes, migrate, resume
      •	Dual-write: New shard + old shard, eventually switch
      •	Best: Use managed solution (Vitess, CockroachDB)

20. Observability: Metrics, Logs, Traces (3 Pillars)
    Implementation:
    Pillar	Tool	Example
    Metrics	Prometheus/Datadog	HTTP requests/sec, GC pause time
    Logs	ELK/Splunk	Request ID, user_id, error stack trace
    Traces	Jaeger/Zipkin	Request path across services: API → DB (50ms) → Cache (5ms)
    Critical Correlation:
    Trace ID = Unique per request
    Span ID = Service execution
    Metrics + Logs + Traces = Root cause in 5 minutes
    Setup:
    java
    // Spring Cloud Sleuth (auto-tracing)
    @Autowired private Tracer tracer;

Span span = tracer.startSpan("database-query");
try {
// Query
} finally {
span.finish();
}
// Automatically appears in Jaeger UI

