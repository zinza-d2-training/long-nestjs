import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCacheValue(key: string) {
    try {
      return await this.cacheManager.get(key);
    } catch (err) {
      console.log(err);
    }
  }

  async setCacheValue(key: string, value: string, ttl?: number) {
    try {
      await this.cacheManager.set(key, value, { ttl });
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCacheValue(key: string) {
    try {
      await this.cacheManager.del(key);
    } catch (err) {
      console.log(err);
    }
  }

  async resetCache() {
    try {
      await this.cacheManager.reset();
    } catch (err) {
      console.log(err);
    }
  }
}
