import { createDirectiveRegistrySchema } from './schema'

export const run = async () => {
  try {
    await createDirectiveRegistrySchema()
  } catch (err) {
    console.error(err)
  }
}

run()
