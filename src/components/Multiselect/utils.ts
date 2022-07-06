// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export interface TreeNode {
  id: string;
  name: string;
  parent?: TreeNode;
  children?: TreeNode[];
}

export const checkNodeNameContainsText = (node: TreeNode, text: string) =>
  node.name.toLowerCase().includes(text.toLowerCase());

export const findNodesByKeyword = (keyword: string, nodes: TreeNode[]) => {
  if (keyword.trim() === '') {
    return nodes;
  }

  let findedNodes: TreeNode[] = [];
  const keywordLower = keyword.toLowerCase();

  nodes.forEach((node) => {
    if (checkNodeNameContainsText(node, keywordLower)) {
      findedNodes.push(node);
    }

    if (node.children && node.children.length) {
      const findedChildrens = findNodesByKeyword(keyword, node.children);
      findedNodes = findedNodes.concat(findedChildrens);
    }
  });

  return findedNodes;
};
