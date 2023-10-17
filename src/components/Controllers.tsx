import React, { useState, useRef } from 'react'
import toast from 'react-hot-toast'

import Button from './ui/Button'
import { UpdateTreeType, ITreeNode } from '../types'

interface Props {
  nodeTree: ITreeNode
  setNodeTree: React.Dispatch<React.SetStateAction<ITreeNode>>
  activeNode: number
  setActiveNode: React.Dispatch<React.SetStateAction<number>>
}

const Controllers = ({ activeNode, setActiveNode, nodeTree, setNodeTree }: Props) => {
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
      node: nodeTree,
      parentId,
      operation: 'ADD',
    })

    setNodeTree(updatedTree)
    setTitle('')
    toast.success('Node added successfully!')
  }
  const handleDeleteNode = (nodeId: number) => {
    const updatedTree = handleUpdateNode({
      node: nodeTree,
      operation: 'REMOVE',
      nodeId,
    })

    setNodeTree(updatedTree)
    setActiveNode(1)
    toast.success('Node removed successfully!')
  }
  const handleEditNode = (nodeId: number, newTitle: string) => {
    const updatedTree = handleUpdateNode({
      node: nodeTree,
      operation: 'EDIT',
      nodeId,
      newTitle,
    })

    setNodeTree(updatedTree)
    setTitle('')
    toast.success('Node edited successfully!')
  }
  const handleResetTree = () => {
    setNodeTree({
      id: 1,
      title: 'Root',
      children: [],
    })
    setActiveNode(1)
    toast.success('Tree Node reset successfully!')
  }

  return (
    <div className='flex items-center gap-24'>
      <div className='flex items-center justify-center gap-4'>
        <Button
          title='Add'
          type='Add'
          onClick={() => {
            if (title.trim().length < 1) {
              toast('Write some title!', {
                icon: '✍️',
              })
              inputRef.current?.focus()
            } else {
              handleAddNode(activeNode, title.trim())
            }
          }}
          isDisabled={title.trim().length < 1}
        />
        <Button
          title='Remove'
          type='Remove'
          isDisabled={activeNode === 1}
          onClick={() => {
            if (activeNode === 1) {
              toast.error('Cannot remove root Node!')
            } else {
              handleDeleteNode(activeNode)
            }
          }}
        />
        <Button
          title='Edit'
          type='Edit'
          onClick={() => {
            if (title.trim().length < 1) {
              toast('Write some title!', {
                icon: '✍️',
              })
              inputRef.current?.focus()
            } else {
              handleEditNode(activeNode, title.trim())
            }
          }}
          isDisabled={title.trim().length < 1}
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

export default Controllers
