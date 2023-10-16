import { Toaster } from 'react-hot-toast'

import TreeNode from './components/TreeNode'
import Header from './components/shared/Header'
import { useTree } from './context/TreeContext'

function App() {
  const { tree } = useTree()

  return (
    <>
      <Header />
      <main className='mt-[110px] px-8 py-6'>
        <TreeNode data={tree} />
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
