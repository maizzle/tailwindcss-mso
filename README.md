# tailwindcss-mso

[![Version][npm-version-shield]][npm]
[![Build][github-ci-shield]][github-ci]
[![Downloads][npm-stats-shield]][npm-stats]
[![License][license-shield]][license]

A Tailwind CSS plugin that generates MSO utilities.

Useful when styling HTML emails with Tailwind CSS, like in [Maizzle](https://maizzle.com).

## Installation

```sh
npm i tailwindcss-mso
```

## Usage

In your `tailwind.config.js`:

```js
module.exports = {
  plugins: [
    require('tailwindcss-mso'),
  ],
}
```

You can now use the classes in your HTML:

```html
<p class="mso-line-height-rule-exactly">...</p>
```

## Options

You may pass options to configure how the plugin generates utilities.

#### respectImportant

Type: `Boolean`\
Default: `false`

By default, the plugin does not respect the `important` option from your Tailwind config, as this may cause issues in Outlook when CSS is inlined.

You may force it to generate `!important` utilities by setting this to `true`:

```js
module.exports = {
  plugins: [
    require('tailwindcss-mso')({
      respectImportant: true,
    }),
  ],
}
```

Result:

```html
<p class="mso-hide-all">...</p>
```

```css
.mso-hide-all {
  mso-hide: all !important;
}
```

## Arbitrary values

The plugin supports arbitrary values:

```html
<p class="mso-text-raise-[20px]">...</p>
```

```css
.mso-text-raise-\[20px\] {
  mso-text-raise: 20px;
}
```

## Negative values

Negative values are also supported, just as you'd expect:

```html
<p class="-mso-text-raise-4">...</p>
```

```css
.-mso-text-raise-4 {
  mso-text-raise: -16px;
}
```

## Generated utilities

The plugin generates both utilities that have default values, as well as utilities based on your Tailwind CSS configuration.

### Spacing utilities

These utilities also work with values from your `theme.spacing` scale:

- `mso-line-height-alt`
- `mso-text-indent-alt`
- `mso-padding-alt` (+ variations)
- `mso-margin-alt` (+ variations)
- `mso-para-margin` (+ variations)
- `mso-text-raise`
- `mso-font-width`
- `mso-element-top`, `mso-element-left`
- `mso-ansi-font-size`, `mso-bidi-font-size`
- `mso-ansi-font-size`, `mso-bidi-font-size`
- `mso-element-frame-width`, `mso-element-frame-height`
- `mso-element-frame-vspace`, `mso-element-frame-hspace`
- `mso-table-tspace`, `mso-table-rspace`, `mso-table-bspace`, `mso-table-lspace`

Where it makes sense, these also support negative versions, like `-mso-text-raise-20`.

### Color utilities

These utilities are all based on your `theme.colors` config:

- `mso-color-alt`
- `mso-highlight`
- `text-underline-color`
- `mso-shading`

### Font utilities

These font size utilities work with values from your `theme.spacing` config:

- `mso-ansi-font-size`
- `mso-bidi-font-size`

Additionally, each utility also supports these values: `large`, `larger`, `medium`, `small`, `smaller`, `x-large`, `x-small`, `xx-large`, `xx-small`.

### Other utilities

The plugin also generates the following utilities with default values:

#### mso-{ansi|bidi}-font-style

Values: `italic`, `normal`, `oblique`

#### mso-{ansi|bidi}-font-weight

Values: `lighter`, `normal`, `bold`, `bolder`

#### mso-{ascii|bidi|arabic}-font-family

Values: `auto`, `cursive`, `fantasy`, `monospace`, `sans-serif`, `serif`

#### mso-bidi-flag

Values: `on`, `off`

#### mso-highlight

Values: `auto`, `windowtext` (+ colors from your config)

#### mso-generic-font-family

Values: `auto`, `decorative`, `modern`, `roman`, `script`, `swiss`

#### mso-element-frame-{width|height}

Values: `auto` (+ values from your `spacing` scale)

#### mso-element

Values: `comment`, `comment-list`, `dropcap-dropped`, `dropcap-in-margin`, `endnote`, `endnote-continuation-notice`, `endnote-continuation-separator`, `endnote-list`, `endnote-separator`, `field-begin`, `field-end`, `field-separator`, `footer`, `footnote`, `footnote-continuation-notice`, `footnote-continuation-separator`, `footnote-list`, `footnote-separator`, `frame`, `header`, `none`, `paragraph-mark-properties`, `table-head`

#### mso-element-left

Values: `center`, `inside`, `left`, `outside`, `right` (+ values from your `spacing` scale)

#### mso-element-top

Values: `bottom`, `inside`, `middle`, `outside`, `top` (+ values from your `spacing` scale)

#### mso-hide

Values: `all`, `none`, `screen`

#### mso-color-alt

Values: `auto`, `windowtext` (+ colors from your config)

#### mso-line-height-rule

Values: `at-least`, `exactly`

#### mso-line-height-alt

Values: `normal`  (+ values from your `spacing` scale)

[npm]: https://www.npmjs.com/package/tailwindcss-mso
[npm-stats]: https://npm-stat.com/charts.html?package=tailwindcss-mso&from=2020-08-23
[npm-version-shield]: https://img.shields.io/npm/v/tailwindcss-mso.svg?style=flat-square
[npm-stats-shield]: https://img.shields.io/npm/dt/tailwindcss-mso.svg?style=flat-square&color=6875f5
[github-ci]: https://github.com/maizzle/tailwindcss-mso/actions
[github-ci-shield]: https://img.shields.io/github/workflow/status/maizzle/tailwindcss-mso/Node.js%20CI?style=flat-square
[license]: ./LICENSE
[license-shield]: https://img.shields.io/npm/l/tailwindcss-mso.svg?style=flat-square&color=0e9f6e
