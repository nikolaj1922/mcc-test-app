import React from 'react'

import { ITreeNode } from '../../types'
import Controllers from '../Controllers'

interface Props {
  nodeTree: ITreeNode
  setNodeTree: React.Dispatch<React.SetStateAction<ITreeNode>>
  activeNode: number
  setActiveNode: React.Dispatch<React.SetStateAction<number>>
}

const Header = ({
  nodeTree,
  activeNode,
  setActiveNode,
  setNodeTree,
}: Props) => {
  return (
    <header className='fixed top-0 flex w-full items-center border-b-2 bg-white px-10 py-6'>
      <div className='flex items-center gap-4'>
        <img src='/assets/mcc-logo.svg' className='w-[80px]' />
        <p className='mr-4 text-4xl font-semibold'>
          <span className='text-green-500'>T</span>ree
          <span className='text-yellow-500'>N</span>ode
          <span className='text-red-500'>A</span>pp
        </p>
      </div>

      <div className='ml-24'>
        <Controllers
          nodeTree={nodeTree}
          activeNode={activeNode}
          setActiveNode={setActiveNode}
          setNodeTree={setNodeTree}
        />
      </div>
    </header>
  )
}

export default Header
