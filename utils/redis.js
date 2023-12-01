const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.client.on('error', (error) => {
      console.error(`Redis client not connected to the server: ${error}`);
    });
  }
  isAlive() {
    return this.client.connected;
  }
  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }
  async set(key, val, duration) {
    this.client.set(key, val);
    this.client.expire(key, duration);
  }
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
