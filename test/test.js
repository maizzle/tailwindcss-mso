const fs = require('fs-extra')
const postcss = require('postcss')
const msoPlugin = require('../index')
const tailwindcss = require('tailwindcss')

function run(config, plugin = tailwindcss) {
  config = {
    ...{ plugins: [msoPlugin], corePlugins: { preflight: false } },
    ...config,
  }

  return postcss(plugin(config))
    .process(
      '@tailwind utilities',
      {
        from: undefined,
      }
    )
}

test('it generates the correct CSS', () => {
  return run().then(result => {
    const expected = fs.readFileSync('./test/expected/all.css', 'utf8')
    expect(result.css).toMatchCss(expected)
  })
})
