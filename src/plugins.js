import { detachNodeFromParent } from 'svgo/lib/xast.js'

export function removePlogonWithoutStyle() {
  return {
    element: {
      enter: (node, parentNode) => {
        if (
          node.name === 'polygon'
          && node.children.length === 0
          && node.attributes['style'] == null
        ) {
          detachNodeFromParent(node, parentNode)
        }
      },
    },
  }
}

export function updateTitle(root, params) {
  return {
    element: {
      enter: (node, parentNode) => {
        if (node.name === 'title' && parentNode.name === 'svg') {
          node.children[0].value = params.title
        }
      },
    },
  }
}
