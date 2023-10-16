import { useState, useRef } from 'react'
import toast from 'react-hot-toast'

import Button from './ui/Button'
import { useTree } from '../context/TreeContext'
import { UpdateTreeType, ITreeNode } from '../types'

const Controls = () => {
  const { tree, setTree, activeNode, setActiveNode } = useTree()

  const [title, setTitle] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleUpdateNode = (data: UpdateTreeType) => {
    switch (data.operation) {
      case 'ADD': {
        const { newNode, node, parentId } = data

        if (node.id === parentId) {
          const updatedNode = {
            ...node,
            children: [...node.children, newNode],
          }
          return updatedNode
        } else if (node.children.length > 0) {
          const updatedChildren: ITreeNode[] = node.children.map(child =>
            handleUpdateNode({
              newNode,
              node: child,
              parentId,
              operation: 'ADD',
            })
          )
          return { ...node, children: updatedChildren }
        }
        return node
      }
      case 'REMOVE': {
        const { node, nodeId } = data

        const isNodeExists = node.children.some(item => item.id === nodeId)

        if (isNodeExists) {
          const filteredChildren = node.children.filter(
            item => item.id !== nodeId
          )

          return {
            ...node,
            children: filteredChildren,
          }
        } else if (node.children.length > 0) {
          const updatedChildren: ITreeNode[] = node.children.map(child =>
            handleUpdateNode({
              node: child,
              nodeId,
              operation: 'REMOVE',
            })
          )
          return { ...node, children: updatedChildren }
        }

        return node
      }
      case 'EDIT': {
        const { node, nodeId, newTitle } = data

        if (node.id === nodeId) {
          return {
            ...node,
            title,
          }
        } else if (node.children.length > 0) {
          const updatedChildren: ITreeNode[] = node.children.map(child =>
            handleUpdateNode({
              operation: 'EDIT',
              node: child,
              nodeId,
              newTitle,
            })
          )

          return { ...node, children: updatedChildren }
        }

        return node
      }
      default: {
        return [] as never as ITreeNode
      }
    }
  }
  const handleAddNode = (parentId: number, title: string) => {
    const newNode: ITreeNode = {
      id: Date.now(),
      title,
      children: [],
    }

    const updatedTree = handleUpdateNode({
      newNode,
      node: tree,
      parentId,
      operation: 'ADD',
    })

    setTree(updatedTree)
    setTitle('')
    toast.success('Node added successfully!')
  }
  const handleDeleteNode = (nodeId: number) => {
    const updatedTree = handleUpdateNode({
      node: tree,
      operation: 'REMOVE',
      nodeId,
    })

    setTree(updatedTree)
    setActiveNode(1)
    toast.success('Node removed successfully!')
  }
  const handleEditNode = (nodeId: number, newTitle: string) => {
    const updatedTree = handleUpdateNode({
      node: tree,
      operation: 'EDIT',
      nodeId,
      newTitle,
    })

    setTree(updatedTree)
    setTitle('')
    toast.success('Node edited successfully!')
  }
  const handleResetTree = () => {
    setTree({
      id: 1,
      title: 'Root',
      children: [],
    })
  }

  return (
    <div className='flex items-center gap-24'>
      <div className='flex items-center justify-center gap-4'>
        <Button
          title='Add'
          type='Add'
          onClick={() => {
            if (title.length < 1) {
              toast('Write some Node title!', {
                icon: '✍️',
              })
              inputRef.current?.focus()
            } else {
              handleAddNode(activeNode, title)
            }
          }}
          isDisabled={title.length < 1}
        />
        <Button
          title='Remove'
          type='Remove'
          isDisabled={activeNode === 1}
          onClick={() => {
            if (activeNode === 1) {
              toast('Cannot remove root Node!', {
                icon: '🤔',
              })
            } else {
              handleDeleteNode(activeNode)
            }
          }}
        />
        <Button
          title='Edit'
          type='Edit'
          onClick={() => {
            if (title.length < 1) {
              toast('Write some Node title!', {
                icon: '✍️',
              })
              inputRef.current?.focus()
            } else {
              handleEditNode(activeNode, title)
            }
          }}
          isDisabled={title.length < 1}
        />
        <Button title='Reset' type='Reset' onClick={handleResetTree} />
      </div>

      <div className='flex items-center gap-4'>
        <p className='text-2xl font-semibold'>Node title:</p>
        <input
          type='text'
          placeholder='Enter Node title...'
          className='rounded-md bg-gray-200 px-4 py-2 text-xl focus:outline-none'
          maxLength={20}
          onChange={e => setTitle(e.target.value)}
          value={title}
          ref={inputRef}
        />
      </div>
    </div>
  )
}

export default Controls
