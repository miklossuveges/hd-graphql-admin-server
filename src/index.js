import { createDirectiveRegistrySchema } from './schema'
import { run } from './app'

;(async () => {
  try {
    // await createDirectiveRegistrySchema()
    await run()
  } catch (err) {
    console.error(err)
  }
})()
