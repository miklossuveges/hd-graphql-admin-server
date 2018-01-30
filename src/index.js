import { buildDirectiveRegistry } from './schema'

export const run = async () => {
  try {
    await buildDirectiveRegistry()
  } catch (err) {
    console.error(err)
  }
}

run()
