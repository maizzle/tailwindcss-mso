/* eslint-env jest */
const path = require('path')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')
const examplePlugin = require('./index.js')

function run(config, css = '@tailwind utilities', plugin = tailwindcss) {
  const {currentTestName} = expect.getState()

  config = {
    plugins: [examplePlugin],
    corePlugins: {
      preflight: false,
    },
    important: true,
    ...config,
  }

  return postcss(plugin(config)).process(css, {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  })
}

// Utilities with predefined values

it('mso-{ansi|bidi}-font-size', () => {
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
      .mso-ansi-font-size-small {
        mso-ansi-font-size: small;
      }
      .mso-ansi-font-size-20 {
        mso-ansi-font-size: 5rem;
      }
      .mso-ansi-font-size-\[14px\] {
        mso-ansi-font-size: 14px;
      }
      .mso-bidi-font-size-small {
        mso-bidi-font-size: small;
      }
      .mso-bidi-font-size-20 {
        mso-bidi-font-size: 5rem;
      }
      .mso-bidi-font-size-\[14px\] {
        mso-bidi-font-size: 14px;
      }
    `)
  })
})

it('mso-{ansi|bidi}-font-style', () => {
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
      .mso-ansi-font-style-oblique {
        mso-ansi-font-style: oblique;
      }
      .mso-ansi-font-style-\[normal\] {
        mso-ansi-font-style: normal;
      }
      .mso-bidi-font-style-oblique {
        mso-bidi-font-style: oblique;
      }
      .mso-bidi-font-style-\[normal\] {
        mso-bidi-font-style: normal;
      }
    `)
  })
})

it('mso-{ansi|bidi}-font-weight', () => {
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
      .mso-ansi-font-weight-bold {
        mso-ansi-font-weight: bold;
      }
      .mso-ansi-font-weight-\[normal\] {
        mso-ansi-font-weight: normal;
      }
      .mso-bidi-font-weight-bold {
        mso-bidi-font-weight: bold;
      }
      .mso-bidi-font-weight-\[normal\] {
        mso-bidi-font-weight: normal;
      }
    `)
  })
})

it('mso-{ascii|bidi}-font-family', () => {
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
      .mso-ascii-font-family-serif {
        mso-ascii-font-family: serif;
      }
      .mso-ascii-font-family-\[sans-serif\] {
        mso-ascii-font-family: sans-serif;
      }
      .mso-bidi-font-family-serif {
        mso-bidi-font-family: serif;
      }
      .mso-bidi-font-family-\[sans-serif\] {
        mso-bidi-font-family: sans-serif;
      }
      .mso-arabic-font-family-serif {
        mso-arabic-font-family: serif;
      }
      .mso-arabic-font-family-\[sans-serif\] {
        mso-arabic-font-family: sans-serif;
      }
    `)
  })
})

it('mso-bidi-flag', () => {
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
      .mso-bidi-flag-on {
        mso-bidi-flag: on;
      }
      .mso-bidi-flag-\[off\] {
        mso-bidi-flag: off;
      }
    `)
  })
})

it('mso-highlight', () => {
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
      .mso-highlight-auto {
        mso-highlight: auto;
      }
      .mso-highlight-blue-400 {
        mso-highlight: #60a5fa;
      }
      .mso-highlight-\[\#ffcc00\] {
        mso-highlight: #ffcc00;
      }
    `)
  })
})

it('mso-generic-font-family', () => {
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
      .mso-generic-font-family-swiss {
        mso-generic-font-family: swiss;
      }
      .mso-generic-font-family-\[script\] {
        mso-generic-font-family: script;
      }
    `)
  })
})

it('mso-font-alt', () => {
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
      .mso-font-alt-mono {
        mso-font-alt: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      }
      .mso-font-alt-\[Arial\2c sans-serif\] {
        mso-font-alt: Arial,sans-serif;
      }
    `)
  })
})

it('mso-element-frame-width', () => {
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
      .mso-element-frame-width-auto {
        mso-element-frame-width: auto;
      }
      .mso-element-frame-width-20 {
        mso-element-frame-width: 5rem;
      }
      .mso-element-frame-width-\[16px\] {
        mso-element-frame-width: 16px;
      }
      .mso-element-frame-height-auto {
        mso-element-frame-height: auto;
      }
      .mso-element-frame-height-20 {
        mso-element-frame-height: 5rem;
      }
      .mso-element-frame-height-\[16px\] {
        mso-element-frame-height: 16px;
      }
    `)
  })
})

it('mso-element', () => {
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
      .mso-element-none {
        mso-element: none;
      }
      .mso-element-\[field-separator\] {
        mso-element: field-separator;
      }
    `)
  })
})

it('mso-element-wrap', () => {
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
      .mso-element-wrap-none {
        mso-element-wrap: none;
      }
      .mso-element-wrap-\[no-wrap-beside\] {
        mso-element-wrap: no-wrap-beside;
      }
    `)
  })
})

it('mso-element-left', () => {
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
      .mso-element-left-left {
        mso-element-left: left;
      }
      .mso-element-left-20 {
        mso-element-left: 5rem;
      }
      .-mso-element-left-20 {
        mso-element-left: -5rem;
      }
      .mso-element-left-\[16px\] {
        mso-element-left: 16px;
      }
    `)
  })
})

it('mso-element-top', () => {
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
      .mso-element-top-top {
        mso-element-top: top;
      }
      .mso-element-top-20 {
        mso-element-top: 5rem;
      }
      .-mso-element-top-20 {
        mso-element-top: -5rem;
      }
      .mso-element-top-\[16px\] {
        mso-element-top: 16px;
      }
    `)
  })
})

it('mso-hide', () => {
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
      .mso-hide-all {
        mso-hide: all;
      }
      .mso-hide-\[none\] {
        mso-hide: none;
      }
    `)
  })
})

it('mso-color-alt', () => {
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
      .mso-color-alt-auto {
        mso-color-alt: auto;
      }
      .mso-color-alt-red-200 {
        mso-color-alt: #fecaca;
      }
      .mso-color-alt-\[\#ffcc00\] {
        mso-color-alt: #ffcc00;
      }
    `)
  })
})

it('mso-line-height-rule', () => {
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
      .mso-line-height-rule-exactly {
        mso-line-height-rule: exactly;
      }
      .mso-line-height-rule-\[at-least\] {
        mso-line-height-rule: at-least;
      }
    `)
  })
})

it('mso-line-height-alt', () => {
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
      .mso-line-height-alt-normal {
        mso-line-height-alt: normal;
      }
      .mso-line-height-alt-20 {
        mso-line-height-alt: 5rem;
      }
      .-mso-line-height-alt-20 {
        mso-line-height-alt: -5rem;
      }
      .mso-line-height-alt-\[10px\] {
        mso-line-height-alt: 10px;
      }
    `)
  })
})

it('text-underline, text-underline-style', () => {
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
      .text-underline-none {
        text-underline: none;
      }
      .text-underline-\[wavy-double\] {
        text-underline: wavy-double;
      }
      .text-underline-style-none {
        text-underline-style: none;
      }
      .text-underline-style-\[wavy-double\] {
        text-underline-style: wavy-double;
      }
    `)
  })
})

it('text-underline-color', () => {
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
      .text-underline-color-auto {
        text-underline-color: auto;
      }
      .text-underline-color-blue-300 {
        text-underline-color: #93c5fd;
      }
      .text-underline-color-\[\#ffcc00\] {
        text-underline-color: #ffcc00;
      }
    `)
  })
})

it('mso-special-format', () => {
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
        mso-special-format: bullet;
      }
    `)
  })
})

// Spacing utilities

it('mso-text-raise', () => {
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
      .mso-text-raise-4 {
        mso-text-raise: 1rem;
      }
      .-mso-text-raise-4 {
        mso-text-raise: -1rem;
      }
    `)
  })
})

it('mso-padding-alt', () => {
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
      .mso-padding-alt-\[4px\] {
        mso-padding-alt: 4px;
      }
      .mso-padding-alt-4 {
        mso-padding-alt: 1rem;
      }
      .mso-padding-top-alt-4 {
        mso-padding-top-alt: 1rem;
      }
      .mso-padding-right-alt-4 {
        mso-padding-right-alt: 1rem;
      }
      .mso-padding-bottom-alt-4 {
        mso-padding-bottom-alt: 1rem;
      }
      .mso-padding-left-alt-4 {
        mso-padding-left-alt: 1rem;
      }
    `)
  })
})

it('mso-margin-alt', () => {
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
      .mso-margin-alt-\[4px\] {
        mso-margin-alt: 4px;
      }
      .mso-margin-alt-4 {
        mso-margin-alt: 1rem;
      }
      .-mso-margin-alt-4 {
        mso-margin-alt: -1rem;
      }
      .mso-margin-top-alt-4 {
        mso-margin-top-alt: 1rem;
      }
      .mso-margin-right-alt-4 {
        mso-margin-right-alt: 1rem;
      }
      .mso-margin-bottom-alt-4 {
        mso-margin-bottom-alt: 1rem;
      }
      .mso-margin-left-alt-4 {
        mso-margin-left-alt: 1rem;
      }
    `)
  })
})

it('mso-text-indent-alt', () => {
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
      .mso-text-indent-alt-4 {
        mso-text-indent-alt: 1rem;
      }
      .mso-text-indent-alt-\[4px\] {
        mso-text-indent-alt: 4px;
      }
      .-mso-text-indent-alt-4 {
        mso-text-indent-alt: -1rem;
      }
    `)
  })
})

it('mso-table-{t|r|b|l}space', () => {
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
      .mso-table-tspace-\[4px\] {
        mso-table-tspace: 4px;
      }
      .mso-table-tspace-20 {
        mso-table-tspace: 5rem;
      }
      .-mso-table-tspace-20 {
        mso-table-tspace: -5rem;
      }
      .mso-table-rspace-20 {
        mso-table-rspace: 5rem;
      }
      .mso-table-bspace-20 {
        mso-table-bspace: 5rem;
      }
      .mso-table-lspace-20 {
        mso-table-lspace: 5rem;
      }
    `)
  })
})

it('mso-font-width', () => {
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
      .mso-font-width-full {
        mso-font-width: 100%;
      }
      .mso-font-width-\[25\%\] {
        mso-font-width: 25%;
      }
      .mso-font-width-1\/2 {
        mso-font-width: 50%;
      }
    `)
  })
})
