const fs = require('fs')
const test = require('ava')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')
const plugin = require('../index.js')

const run = config => {
  config = {
    content: ['./data.js'],
    safelist: [
      {
        pattern: /^(mso|text)/,
      },
    ],
    plugins: [plugin],
    corePlugins: false,
    ...config,
  }

  return postcss(tailwindcss(config))
    .process(
      '@tailwind utilities',
      {
        from: null,
      },
    )
}

const expected = () => fs.readFileSync('./tests/expected/output.css', 'utf8').trim()

test.before(() => {
  fs.writeFileSync('./tests/expected/output.css', run().css)
})

test('It generates utilities', async t => {
  const {css} = await run()

  t.is(css, expected())
})

test('Works with string font size config', async t => {
  const {css} = await run({
    theme: {
      extend: {
        fontSize: {
          base: '1rem',
        },
      },
    },
  })

  t.is(css, expected())
})
