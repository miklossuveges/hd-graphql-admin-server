const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const pkg = require('./package.json')

const input = 'src/index.js'
const external = [
  // 'joi', 'refdata'
]


;(async () => {
  try {
    const nodeBundle = await rollup.rollup({
      input,
      external,
      plugins: [
        babel({
          exclude: 'node_modules/**',
          presets: [
            ['env', { targets: { node: 8 }, modules: false }]
          ],
          plugins: [
            'transform-object-rest-spread',
            'external-helpers',
          ]
        })
      ],
    })

    await nodeBundle.write({
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    })
    console.log(`📦 built common js package > ${pkg.main}`)

    const moduleBundle = await rollup.rollup({
      input,
      external,
      plugins: [
        babel({
          exclude: 'node_modules/**',
          presets: [
            ['env', { targets: { browsers: 'since 2017' }, modules: false }]
          ],
          plugins: [
            'transform-object-rest-spread',
            'external-helpers'
          ]
        })
      ],
    })

    await moduleBundle.write({
      file: pkg.module,
      format: 'es',
      sourcemap: true
    })
    console.log(`📦 built ES module package > ${pkg.module}`)

  } catch (err) {
    console.log('🔥 Error during build > ', err)
  }
})()
