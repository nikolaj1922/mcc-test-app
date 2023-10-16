import { useTree } from '../context/TreeContext'
import { ITreeNode } from '../types'

interface Props {
  data: ITreeNode
}

const TreeNode = ({ data }: Props) => {
  const { activeNode, setActiveNode } = useTree()

  return (
    <>
      <div
        className={`mb-2 flex min-h-[80px] w-[180px] cursor-pointer rounded-md bg-green-100 px-4 py-2 transition-all duration-100 hover:bg-green-200 ${
          activeNode === data.id && 'outline outline-green-500'
        }`}
        onClick={() => setActiveNode(data.id)}
      >
        <p className='w-full break-words text-xl font-semibold'>{data.title}</p>
      </div>
      {data.children.length > 0 && (
        <div className='ml-20'>
          {data.children.map((child: ITreeNode) => (
            <TreeNode data={child} key={child.id} />
          ))}
        </div>
      )}
    </>
  )
}

export default TreeNode
