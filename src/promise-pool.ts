/**
 * Promise pool for controlling concurrent async operations
 */

export class PromisePool {
  private queue: (() => Promise<void>)[] = []
  private running = 0
  private concurrency: number

  constructor(concurrency = 5) {
    this.concurrency = concurrency
  }

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const task = async () => {
        try {
          const result = await fn()
          resolve(result)
        } catch (err) {
          reject(err)
        } finally {
          this.running--
          this.next()
        }
      }

      if (this.running < this.concurrency) {
        this.running++
        task()
      } else {
        this.queue.push(task)
      }
    })
  }

  private next(): void {
    if (this.queue.length > 0 && this.running < this.concurrency) {
      const task = this.queue.shift()!
      this.running++
      task()
    }
  }

  get pending(): number {
    return this.queue.length
  }

  get active(): number {
    return this.running
  }

  get size(): number {
    return this.running + this.queue.length
  }
}

/**
 * Run tasks with concurrency limit, returns all results
 */
export async function poolAll<T>(
  tasks: (() => Promise<T>)[],
  concurrency = 5
): Promise<T[]> {
  const pool = new PromisePool(concurrency)
  return Promise.all(tasks.map((task) => pool.add(task)))
}
