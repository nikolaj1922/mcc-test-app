export interface ITreeNode {
  id: number
  title: string
  children: Array<ITreeNode>
}

interface IAddNode {
  operation: 'ADD'
  node: ITreeNode
  parentId: number
  newNode: ITreeNode
}

interface IRemoveNode {
  operation: 'REMOVE'
  node: ITreeNode
  nodeId: number
}

interface IEditNode {
  operation: 'EDIT'
  node: ITreeNode
  nodeId: number
  newTitle: string
}

export type UpdateTreeType = IAddNode | IRemoveNode | IEditNode
