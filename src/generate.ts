import fs from 'node:fs'
import path from 'node:path'
import c from 'picocolors'
import { AddClassesToSVGElementPlugin, optimize } from 'svgo'
import { removePlogonWithoutStyle, updateTitle } from './plugins'
import { script, style, template } from './template'
import { getClassName } from './utils'

export async function generate(input: string, output: string) {
  if (input == undefined) {
    console.error(c.red('Pleaes choose svg'))
    return
  }
  const root = process.cwd()
  const sourceFilePath = path.join(root, input)
  const targetFilePath = path.join(root, output)
  const fileName = output.split('/').pop()?.split('.')[0]

  if (fileName == undefined) {
    console.error(c.red('Wrong path'))
    return
  }
  const className = getClassName(fileName)
  const svgString = fs.readFileSync(sourceFilePath)
  const updateTitlePlugin = {
    name: 'updateTitle',
    type: 'visitor',
    active: true, // 'perItem', 'perItemReverse' or 'full'
    params: {
      title: fileName.replace('Icon', ''),
    },
    fn: updateTitle,
  }
  const removePolygon = {
    name: 'removePolygon',
    type: 'visitor', // 'perItem', 'perItemReverse' or 'full'
    active: true,
    fn: removePlogonWithoutStyle,
  }
  const result = optimize(svgString, {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeTitle: false,
            convertTransform: {
              collapseIntoOne: true,
            },
          },
        },
      },
      'removeDimensions',
      'removeStyleElement',
      {
        name: 'removeAttrs',
        params: {
          attrs: '(fill|stroke|class|id|data-name)',
        },
      },
      {
        name: 'addClassesToSVGElement',
        active: true,
        params: {
          className: className,
        },
      } as AddClassesToSVGElementPlugin,
      {
        name: 'addAttributesToSVGElement',
        params: {
          attributes: [
            {
              ':width': 'size',
            },
            {
              ':height': 'size',
            },
          ],
        },
      },
      updateTitlePlugin,
      removePolygon,
    ],
  })
  if ('data' in result) {
    let optimizedSvgString = result.data
    if (optimizedSvgString.startsWith('<?xml')) {
      optimizedSvgString = optimizedSvgString.replace(
        '<?xml version="1.0" encoding="UTF-8"?>',
        '',
      )
    }
    const vueScript = script(fileName)
    const vueTemplate = template(optimizedSvgString)
    const vueStyle = style(className)

    fs.writeFileSync(targetFilePath, vueTemplate + vueScript + vueStyle)

    console.log(c.green('???? Generate successfully!'))
  } else {
    console.error(c.cyan(result.error))
    return
  }
  return
}
