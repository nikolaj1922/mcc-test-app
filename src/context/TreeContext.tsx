import React, {
  createContext,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
} from 'react'
import { ITreeNode } from '../types'

interface ContextProps {
  children: React.ReactNode
}

interface InitialProps {
  activeNode: number
  setActiveNode: Dispatch<SetStateAction<number>>
  tree: ITreeNode
  setTree: Dispatch<React.SetStateAction<ITreeNode>>
}

const TreeContext = createContext<InitialProps>({
  activeNode: 1,
  setActiveNode: () => {},
  tree: {
    id: 1,
    title: 'Root',
    children: [],
  },
  setTree: () => {},
})

export const TreeContextProvider = ({ children }: ContextProps) => {
  const [activeNode, setActiveNode] = useState<number>(1)
  const [tree, setTree] = useState<ITreeNode>({
    id: 1,
    title: 'Root',
    children: [],
  })

  return (
    <TreeContext.Provider value={{ activeNode, setActiveNode, tree, setTree }}>
      {children}
    </TreeContext.Provider>
  )
}

export const useTree = () => {
  return useContext(TreeContext)
}
