import { Toaster } from 'react-hot-toast'
import { useState } from 'react'

import TreeNode from './components/TreeNode'
import Header from './components/shared/Header'
import { ITreeNode } from './types'

function App() {
  const [activeNode, setActiveNode] = useState<number>(1)
  const [nodeTree, setNodeTree] = useState<ITreeNode>({
    id: 1,
    title: 'Root',
    children: [],
  })

  return (
    <>
      <Header
        nodeTree={nodeTree}
        setNodeTree={setNodeTree}
        activeNode={activeNode}
        setActiveNode={setActiveNode}
      />
      <main className='mt-[110px] px-8 py-6'>
        <TreeNode
          nodeTree={nodeTree}
          setActiveNode={setActiveNode}
          activeNode={activeNode}
        />
      </main>
      <Toaster
        position='bottom-right'
        toastOptions={{
          duration: 3500,
          style: {
            fontSize: '20px',
          },
        }}
      />
    </>
  )
}

export default App
