import { initModels } from './db'

;(async () => {
  try {
    // await createDirectiveRegistrySchema()
    // await run()
    await initModels()
  } catch (err) {
    console.error(err)
  }
})()
