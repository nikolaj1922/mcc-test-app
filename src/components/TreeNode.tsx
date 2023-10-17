import React from 'react'

import { ITreeNode } from '../types'

interface Props {
  nodeTree: ITreeNode
  setActiveNode: React.Dispatch<React.SetStateAction<number>>
  activeNode: number
}

const TreeNode = ({ nodeTree, setActiveNode, activeNode }: Props) => {
  return (
    <>
      <div
        className={`mb-2 flex min-h-[80px] w-[180px] cursor-pointer rounded-md bg-green-100 px-4 py-2 transition-all duration-100 hover:bg-green-200 ${
          activeNode === nodeTree.id && 'outline outline-green-500'
        }`}
        onClick={() => setActiveNode(nodeTree.id)}
      >
        <p className='w-full break-words text-xl font-semibold'>
          {nodeTree.title}
        </p>
      </div>
      {nodeTree.children.length > 0 && (
        <div className='ml-20'>
          {nodeTree.children.map((child: ITreeNode) => (
            <TreeNode
              key={child.id}
              nodeTree={child}
              setActiveNode={setActiveNode}
              activeNode={activeNode}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default TreeNode
