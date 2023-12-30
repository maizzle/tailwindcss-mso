import path from 'node:path'
import postcss from 'postcss'
import { expect, test } from 'vitest'
import tailwindcss from 'tailwindcss'
import tailwindcssMso from './index.js'

// Custom CSS matcher
expect.extend({
  // Compare two CSS strings with all whitespace removed
  // This is probably naive but it's fast and works well enough.
  toMatchCss(received, argument) {
    function stripped(string_) {
      return string_.replaceAll(/\s/g, '').replaceAll(';', '')
    }

    const pass = stripped(received) === stripped(argument)

    return {
      pass,
      actual: received,
      expected: argument,
      message: () => pass ? 'All good!' : 'CSS does not match',
    }
  }
})

// Function to run the plugin
function run(config, css = '@tailwind utilities', plugin = tailwindcss) {
  const {currentTestName} = expect.getState()

  config = {
    plugins: [tailwindcssMso],
    corePlugins: {
      preflight: false,
    },
    ...config,
  }

  return postcss(plugin(config)).process(css, {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  })
}

test('plugin options', () => {
  const config = {
    plugins: [
      tailwindcssMso({
        respectImportant: true
      })
    ],
    important: true,
    content: [{
      raw: String.raw`
        <div class="mso-hide-all"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-hide-all {
        mso-hide: all !important
      }
    `)
  })
})

test('mso-{ansi|bidi}-font-size', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-ansi-font-size-small"></div>
        <div class="mso-ansi-font-size-20"></div>
        <div class="mso-ansi-font-size-[14px]"></div>
        <div class="mso-bidi-font-size-small"></div>
        <div class="mso-bidi-font-size-20"></div>
        <div class="mso-bidi-font-size-[14px]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-ansi-font-size-20 {
          mso-ansi-font-size: 5rem
      }
      .mso-ansi-font-size-\[14px\] {
          mso-ansi-font-size: 14px
      }
      .mso-ansi-font-size-small {
          mso-ansi-font-size: small
      }
      .mso-bidi-font-size-20 {
          mso-bidi-font-size: 5rem
      }
      .mso-bidi-font-size-\[14px\] {
          mso-bidi-font-size: 14px
      }
      .mso-bidi-font-size-small {
          mso-bidi-font-size: small
      }
    `)
  })
})

test('mso-{ansi|bidi}-font-style', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-ansi-font-style-oblique"></div>
        <div class="mso-ansi-font-style-[normal]"></div>
        <div class="mso-bidi-font-style-oblique"></div>
        <div class="mso-bidi-font-style-[normal]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-ansi-font-style-\[normal\] {
        mso-ansi-font-style: normal
      }
      .mso-ansi-font-style-oblique {
        mso-ansi-font-style: oblique
      }
      .mso-bidi-font-style-\[normal\] {
        mso-bidi-font-style: normal
      }
      .mso-bidi-font-style-oblique {
        mso-bidi-font-style: oblique
      }
    `)
  })
})

test('mso-{ansi|bidi}-font-weight', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-ansi-font-weight-bold"></div>
        <div class="mso-ansi-font-weight-[normal]"></div>
        <div class="mso-bidi-font-weight-bold"></div>
        <div class="mso-bidi-font-weight-[normal]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-ansi-font-weight-\[normal\] {
        mso-ansi-font-weight: normal
      }
      .mso-ansi-font-weight-bold {
        mso-ansi-font-weight: bold
      }
      .mso-bidi-font-weight-\[normal\] {
        mso-bidi-font-weight: normal
      }
      .mso-bidi-font-weight-bold {
        mso-bidi-font-weight: bold
      }
    `)
  })
})

test('mso-{ascii|bidi}-font-family', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-ascii-font-family-serif"></div>
        <div class="mso-ascii-font-family-[sans-serif]"></div>
        <div class="mso-bidi-font-family-serif"></div>
        <div class="mso-bidi-font-family-[sans-serif]"></div>
        <div class="mso-arabic-font-family-serif"></div>
        <div class="mso-arabic-font-family-[sans-serif]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-arabic-font-family-\[sans-serif\] {
        mso-arabic-font-family: sans-serif
      }
      .mso-arabic-font-family-serif {
        mso-arabic-font-family: serif
      }
      .mso-ascii-font-family-\[sans-serif\] {
        mso-ascii-font-family: sans-serif
      }
      .mso-ascii-font-family-serif {
        mso-ascii-font-family: serif
      }
      .mso-bidi-font-family-\[sans-serif\] {
        mso-bidi-font-family: sans-serif
      }
      .mso-bidi-font-family-serif {
        mso-bidi-font-family: serif
      }
    `)
  })
})

test('mso-bidi-flag', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-bidi-flag-on"></div>
        <div class="mso-bidi-flag-[off]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-bidi-flag-\[off\] {
        mso-bidi-flag: off
      }
      .mso-bidi-flag-on {
        mso-bidi-flag: on
      }
    `)
  })
})

test('mso-highlight', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-highlight-auto"></div>
        <div class="mso-highlight-blue-400"></div>
        <div class="mso-highlight-[#ffcc00]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-highlight-\[\#ffcc00\] {
        mso-highlight: #ffcc00
      }
      .mso-highlight-auto {
        mso-highlight: auto
      }
      .mso-highlight-blue-400 {
        mso-highlight: #60a5fa
      }
    `)
  })
})

test('mso-generic-font-family', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-generic-font-family-swiss"></div>
        <div class="mso-generic-font-family-[script]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-generic-font-family-\[script\] {
        mso-generic-font-family: script
      }
      .mso-generic-font-family-swiss {
        mso-generic-font-family: swiss
      }
    `)
  })
})

test('mso-font-alt', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-font-alt-mono"></div>
        <div class="mso-font-alt-[Arial,sans-serif]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-font-alt-\[Arial\2c sans-serif\] {
        mso-font-alt: Arial,sans-serif
      }
      .mso-font-alt-mono {
        mso-font-alt: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
      }
    `)
  })
})

test('mso-element-frame-{width|height}', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-element-frame-width-auto"></div>
        <div class="mso-element-frame-width-20"></div>
        <div class="mso-element-frame-width-[16px]"></div>
        <div class="mso-element-frame-height-auto"></div>
        <div class="mso-element-frame-height-20"></div>
        <div class="mso-element-frame-height-[16px]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-element-frame-height-20 {
        mso-element-frame-height: 5rem
      }
      .mso-element-frame-height-\[16px\] {
        mso-element-frame-height: 16px
      }
      .mso-element-frame-height-auto {
        mso-element-frame-height: auto
      }
      .mso-element-frame-width-20 {
        mso-element-frame-width: 5rem
      }
      .mso-element-frame-width-\[16px\] {
        mso-element-frame-width: 16px
      }
      .mso-element-frame-width-auto {
        mso-element-frame-width: auto
      }
    `)
  })
})

test('mso-element', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-element-none"></div>
        <div class="mso-element-[field-separator]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-element-\[field-separator\] {
        mso-element: field-separator
      }
      .mso-element-none {
        mso-element: none
      }
    `)
  })
})

test('mso-element-wrap', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-element-wrap-none"></div>
        <div class="mso-element-wrap-[no-wrap-beside]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-element-wrap-\[no-wrap-beside\] {
        mso-element-wrap: no-wrap-beside
      }
      .mso-element-wrap-none {
        mso-element-wrap: none
      }
    `)
  })
})

test('mso-element-left', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-element-left-left"></div>
        <div class="mso-element-left-20"></div>
        <div class="-mso-element-left-20"></div>
        <div class="mso-element-left-[16px]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .-mso-element-left-20 {
        mso-element-left: -5rem
      }
      .mso-element-left-20 {
        mso-element-left: 5rem
      }
      .mso-element-left-\[16px\] {
        mso-element-left: 16px
      }
      .mso-element-left-left {
        mso-element-left: left
      }
    `)
  })
})

test('mso-element-top', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-element-top-top"></div>
        <div class="mso-element-top-20"></div>
        <div class="-mso-element-top-20"></div>
        <div class="mso-element-top-[16px]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .-mso-element-top-20 {
        mso-element-top: -5rem
      }
      .mso-element-top-20 {
        mso-element-top: 5rem
      }
      .mso-element-top-\[16px\] {
        mso-element-top: 16px
      }
      .mso-element-top-top {
        mso-element-top: top
      }
    `)
  })
})

test('mso-hide', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-hide-all"></div>
        <div class="mso-hide-[none]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-hide-\[none\] {
        mso-hide: none
      }
      .mso-hide-all {
        mso-hide: all
      }
    `)
  })
})

test('mso-color-alt', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-color-alt-auto"></div>
        <div class="mso-color-alt-red-200"></div>
        <div class="mso-color-alt-[#ffcc00]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-color-alt-\[\#ffcc00\] {
        mso-color-alt: #ffcc00
      }
      .mso-color-alt-auto {
        mso-color-alt: auto
      }
      .mso-color-alt-red-200 {
        mso-color-alt: #fecaca
      }
    `)
  })
})

test('mso-line-height-rule', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-line-height-rule-exactly"></div>
        <div class="mso-line-height-rule-[at-least]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-line-height-rule-\[at-least\] {
        mso-line-height-rule: at-least
      }
      .mso-line-height-rule-exactly {
        mso-line-height-rule: exactly
      }
    `)
  })
})

test('mso-line-height-alt', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-line-height-alt-normal"></div>
        <div class="mso-line-height-alt-20"></div>
        <div class="-mso-line-height-alt-20"></div>
        <div class="mso-line-height-alt-[10px]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .-mso-line-height-alt-20 {
        mso-line-height-alt: -5rem
      }
      .mso-line-height-alt-20 {
        mso-line-height-alt: 5rem
      }
      .mso-line-height-alt-\[10px\] {
        mso-line-height-alt: 10px
      }
      .mso-line-height-alt-normal {
        mso-line-height-alt: normal
      }
    `)
  })
})

test('text-underline, text-underline-style', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="text-underline-none"></div>
        <div class="text-underline-[wavy-double]"></div>
        <div class="text-underline-style-none"></div>
        <div class="text-underline-style-[wavy-double]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .text-underline-\[wavy-double\] {
        text-underline: wavy-double
      }
      .text-underline-none {
        text-underline: none
      }
      .text-underline-style-\[wavy-double\] {
        text-underline-style: wavy-double
      }
      .text-underline-style-none {
        text-underline-style: none
      }
    `)
  })
})

test('text-underline-color', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="text-underline-color-auto"></div>
        <div class="text-underline-color-blue-300"></div>
        <div class="text-underline-color-[#ffcc00]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .text-underline-color-\[\#ffcc00\] {
        text-underline-color: #ffcc00
      }
      .text-underline-color-auto {
        text-underline-color: auto
      }
      .text-underline-color-blue-300 {
        text-underline-color: #93c5fd
      }
    `)
  })
})

test('mso-special-format', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-special-format-bullet"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-special-format-bullet {
        mso-special-format: bullet
      }
    `)
  })
})

test('mso-text-raise', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-text-raise-4"></div>
        <div class="-mso-text-raise-4"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .-mso-text-raise-4 {
        mso-text-raise: -1rem
      }
      .mso-text-raise-4 {
        mso-text-raise: 1rem
      }
    `)
  })
})

test('mso-padding-alt', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-padding-alt-[4px]"></div>
        <div class="mso-padding-alt-4"></div>
        <div class="mso-padding-top-alt-4"></div>
        <div class="mso-padding-right-alt-4"></div>
        <div class="mso-padding-bottom-alt-4"></div>
        <div class="mso-padding-left-alt-4"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-padding-alt-4 {
        mso-padding-alt: 1rem
      }
      .mso-padding-alt-\[4px\] {
        mso-padding-alt: 4px
      }
      .mso-padding-bottom-alt-4 {
        mso-padding-bottom-alt: 1rem
      }
      .mso-padding-left-alt-4 {
        mso-padding-left-alt: 1rem
      }
      .mso-padding-right-alt-4 {
        mso-padding-right-alt: 1rem
      }
      .mso-padding-top-alt-4 {
        mso-padding-top-alt: 1rem
      }
    `)
  })
})

test('mso-margin-alt', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-margin-alt-[4px]"></div>
        <div class="mso-margin-alt-4"></div>
        <div class="-mso-margin-alt-4"></div>
        <div class="mso-margin-top-alt-4"></div>
        <div class="mso-margin-right-alt-4"></div>
        <div class="mso-margin-bottom-alt-4"></div>
        <div class="mso-margin-left-alt-4"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .-mso-margin-alt-4 {
        mso-margin-alt: -1rem
      }
      .mso-margin-alt-4 {
        mso-margin-alt: 1rem
      }
      .mso-margin-alt-\[4px\] {
        mso-margin-alt: 4px
      }
      .mso-margin-bottom-alt-4 {
        mso-margin-bottom-alt: 1rem
      }
      .mso-margin-left-alt-4 {
        mso-margin-left-alt: 1rem
      }
      .mso-margin-right-alt-4 {
        mso-margin-right-alt: 1rem
      }
      .mso-margin-top-alt-4 {
        mso-margin-top-alt: 1rem
      }
    `)
  })
})

test('mso-para-margin', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-para-margin-[4px]"></div>
        <div class="mso-para-margin-4"></div>
        <div class="-mso-para-margin-4"></div>
        <div class="mso-para-margin-top-4"></div>
        <div class="mso-para-margin-right-4"></div>
        <div class="mso-para-margin-bottom-4"></div>
        <div class="mso-para-margin-left-4"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .-mso-para-margin-4 {
        mso-para-margin: -1rem
      }
      .mso-para-margin-4 {
        mso-para-margin: 1rem
      }
      .mso-para-margin-\[4px\] {
        mso-para-margin: 4px
      }
      .mso-para-margin-bottom-4 {
        mso-para-margin-bottom: 1rem
      }
      .mso-para-margin-left-4 {
        mso-para-margin-left: 1rem
      }
      .mso-para-margin-right-4 {
        mso-para-margin-right: 1rem
      }
      .mso-para-margin-top-4 {
        mso-para-margin-top: 1rem
      }
    `)
  })
})

test('mso-text-indent-alt', () => {
  const config = {
    content: [{
      raw: String.raw`
      <div class="mso-text-indent-alt-4"></div>
      <div class="mso-text-indent-alt-[4px]"></div>
        <div class="-mso-text-indent-alt-4"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .-mso-text-indent-alt-4 {
        mso-text-indent-alt: -1rem
      }
      .mso-text-indent-alt-4 {
        mso-text-indent-alt: 1rem
      }
      .mso-text-indent-alt-\[4px\] {
        mso-text-indent-alt: 4px
      }
    `)
  })
})

test('mso-table-{t|r|b|l}space', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-table-tspace-[4px]"></div>
        <div class="mso-table-tspace-20"></div>
        <div class="-mso-table-tspace-20"></div>
        <div class="mso-table-rspace-20"></div>
        <div class="mso-table-bspace-20"></div>
        <div class="mso-table-lspace-20"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .-mso-table-tspace-20 {
        mso-table-tspace: -5rem
      }
      .mso-table-bspace-20 {
        mso-table-bspace: 5rem
      }
      .mso-table-lspace-20 {
        mso-table-lspace: 5rem
      }
      .mso-table-rspace-20 {
        mso-table-rspace: 5rem
      }
      .mso-table-tspace-20 {
        mso-table-tspace: 5rem
      }
      .mso-table-tspace-\[4px\] {
        mso-table-tspace: 4px
      }
    `)
  })
})

test('mso-font-width', () => {
  const config = {
    content: [{
      raw: String.raw`
      <div class="mso-font-width-full"></div>
      <div class="mso-font-width-[25%]"></div>
      <div class="mso-font-width-1/2"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-font-width-1\/2 {
        mso-font-width: 50%
      }
      .mso-font-width-\[25\%\] {
        mso-font-width: 25%
      }
      .mso-font-width-full {
        mso-font-width: 100%
      }
    `)
  })
})

test('mso-shading', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-shading-auto"></div>
        <div class="mso-shading-red-200"></div>
        <div class="mso-shading-[#ffcc00]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-shading-\[\#ffcc00\] {
        mso-shading: #ffcc00
      }
      .mso-shading-auto {
        mso-shading: auto
      }
      .mso-shading-red-200 {
        mso-shading: #fecaca
      }
    `)
  })
})

test('mso-element-frame-{v|h}space', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-element-frame-vspace-20"></div>
        <div class="mso-element-frame-vspace-[16px]"></div>
        <div class="mso-element-frame-hspace-20"></div>
        <div class="mso-element-frame-hspace-[16px]"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-element-frame-hspace-20 {
        mso-element-frame-hspace: 5rem
      }
      .mso-element-frame-hspace-\[16px\] {
        mso-element-frame-hspace: 16px
      }
      .mso-element-frame-vspace-20 {
        mso-element-frame-vspace: 5rem
      }
      .mso-element-frame-vspace-\[16px\] {
        mso-element-frame-vspace: 16px
      }
    `)
  })
})

test('mso-border colors', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-border-alt-[#ffcc00]"></div>
        <div class="mso-border-alt-auto"></div>
        <div class="mso-border-alt-red-200"></div>

        <div class="mso-border-between-[#ffcc00]"></div>
        <div class="mso-border-between-auto"></div>
        <div class="mso-border-between-red-200"></div>

        <div class="mso-border-bottom-alt-[#ffcc00]"></div>
        <div class="mso-border-bottom-alt-auto"></div>
        <div class="mso-border-bottom-alt-red-200"></div>

        <div class="mso-border-left-alt-[#ffcc00]"></div>
        <div class="mso-border-left-alt-auto"></div>
        <div class="mso-border-left-alt-red-200"></div>

        <div class="mso-border-right-alt-[#ffcc00]"></div>
        <div class="mso-border-right-alt-auto"></div>
        <div class="mso-border-right-alt-red-200"></div>

        <div class="mso-border-top-alt-[#ffcc00]"></div>
        <div class="mso-border-top-alt-auto"></div>
        <div class="mso-border-top-alt-red-200"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-border-alt-\[\#ffcc00\] {
        mso-border-alt: #ffcc00
      }
      .mso-border-alt-auto {
        mso-border-alt: auto
      }
      .mso-border-alt-red-200 {
        mso-border-alt: #fecaca
      }

      .mso-border-between-\[\#ffcc00\] {
        mso-border-between: #ffcc00
      }
      .mso-border-between-auto {
        mso-border-between: auto
      }
      .mso-border-between-red-200 {
        mso-border-between: #fecaca
      }

      .mso-border-bottom-alt-\[\#ffcc00\] {
        mso-border-bottom-alt: #ffcc00
      }
      .mso-border-bottom-alt-auto {
        mso-border-bottom-alt: auto
      }
      .mso-border-bottom-alt-red-200 {
        mso-border-bottom-alt: #fecaca
      }

      .mso-border-left-alt-\[\#ffcc00\] {
        mso-border-left-alt: #ffcc00
      }
      .mso-border-left-alt-auto {
        mso-border-left-alt: auto
      }
      .mso-border-left-alt-red-200 {
        mso-border-left-alt: #fecaca
      }

      .mso-border-right-alt-\[\#ffcc00\] {
        mso-border-right-alt: #ffcc00
      }
      .mso-border-right-alt-auto {
        mso-border-right-alt: auto
      }
      .mso-border-right-alt-red-200 {
        mso-border-right-alt: #fecaca
      }

      .mso-border-top-alt-\[\#ffcc00\] {
        mso-border-top-alt: #ffcc00
      }
      .mso-border-top-alt-auto {
        mso-border-top-alt: auto
      }
      .mso-border-top-alt-red-200 {
        mso-border-top-alt: #fecaca
      }
    `)
  })
})

test('mso-border widths', () => {
  const config = {
    content: [{
      raw: String.raw`
      <div class="mso-border-between-width-20"></div>
      <div class="mso-border-between-width-[10px]"></div>
        <div class="mso-border-between-width-thin"></div>

        <div class="mso-border-bottom-width-alt-20"></div>
        <div class="mso-border-bottom-width-alt-[10px]"></div>
        <div class="mso-border-bottom-width-alt-thin"></div>

        <div class="mso-border-left-width-alt-20"></div>
        <div class="mso-border-left-width-alt-[10px]"></div>
        <div class="mso-border-left-width-alt-thin"></div>

        <div class="mso-border-right-width-alt-20"></div>
        <div class="mso-border-right-width-alt-[10px]"></div>
        <div class="mso-border-right-width-alt-thin"></div>

        <div class="mso-border-top-width-alt-20"></div>
        <div class="mso-border-top-width-alt-[10px]"></div>
        <div class="mso-border-top-width-alt-thin"></div>

        <div class="mso-border-width-alt-20"></div>
        <div class="mso-border-width-alt-[10px]"></div>
        <div class="mso-border-width-alt-thin"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-border-between-width-20 {
        mso-border-between-width: 5rem
      }
      .mso-border-between-width-\[10px\] {
        mso-border-between-width: 10px
      }
      .mso-border-between-width-thin {
        mso-border-between-width: thin
      }

      .mso-border-bottom-width-alt-20 {
        mso-border-bottom-width-alt: 5rem
      }
      .mso-border-bottom-width-alt-\[10px\] {
        mso-border-bottom-width-alt: 10px
      }
      .mso-border-bottom-width-alt-thin {
        mso-border-bottom-width-alt: thin
      }

      .mso-border-left-width-alt-20 {
        mso-border-left-width-alt: 5rem
      }
      .mso-border-left-width-alt-\[10px\] {
        mso-border-left-width-alt: 10px
      }
      .mso-border-left-width-alt-thin {
        mso-border-left-width-alt: thin
      }

      .mso-border-right-width-alt-20 {
        mso-border-right-width-alt: 5rem
      }
      .mso-border-right-width-alt-\[10px\] {
        mso-border-right-width-alt: 10px
      }
      .mso-border-right-width-alt-thin {
        mso-border-right-width-alt: thin
      }

      .mso-border-top-width-alt-20 {
        mso-border-top-width-alt: 5rem
      }
      .mso-border-top-width-alt-\[10px\] {
        mso-border-top-width-alt: 10px
      }
      .mso-border-top-width-alt-thin {
        mso-border-top-width-alt: thin
      }

      .mso-border-width-alt-20 {
        mso-border-width-alt: 5rem
      }
      .mso-border-width-alt-\[10px\] {
        mso-border-width-alt: 10px
      }
      .mso-border-width-alt-thin {
        mso-border-width-alt: thin
      }
    `)
  })
})

test('mso-border-{bottom|left|right|top}-source', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-border-bottom-source-auto"></div>
        <div class="mso-border-left-source-auto"></div>
        <div class="mso-border-right-source-auto"></div>
        <div class="mso-border-top-source-auto"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-border-bottom-source-auto {
        mso-border-bottom-source: auto
      }
      .mso-border-left-source-auto {
        mso-border-left-source: auto
      }
      .mso-border-right-source-auto {
        mso-border-right-source: auto
      }
      .mso-border-top-source-auto {
        mso-border-top-source: auto
      }
    `)
  })
})

test('mso-border-shadow', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-border-shadow-no"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-border-shadow-no {
        mso-border-shadow: no
      }
    `)
  })
})

test('mso-border-effect', () => {
  const config = {
    content: [{
      raw: String.raw`
        <div class="mso-border-effect-3d"></div>
      `
    }],
  }

  return run(config).then(result => {
    expect(result.css).toMatchCss(String.raw`
      .mso-border-effect-3d {
        mso-border-effect: 3d
      }
    `)
  })
})
