import Card from '@/Cards/Postcard'
import { Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

const Posts = () => {
  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    left: '20px'
  }
  return (
    <div className='h-full grid grid-flow-row align-bottom '>
      <div className='mx-2 my-2 shadow-gray-400 shadow-xl h-[80%]'>
        <Card />
      </div>
      <div className='h-[20%] absolute mt-80 '>
        <Button
          className='self-end rounded-md'
          leftIcon={<AddIcon />}
          colorScheme='red'
          variant='solid'
        >
          ADD POST
        </Button>
      </div>
    </div>
  )
}
export default Posts
