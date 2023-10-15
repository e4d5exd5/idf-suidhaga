import Card from '@/Cards/Postcard'
import { Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

const Posts = () => {
  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    left: '20px'
  }
  const postsData = [
    { id: 1},
    { id: 2},
    { id: 3},
    { id: 4},
  ];
  return (
    <div className="h-full overflow-y-auto p-2">
    {postsData.map((post) => (
      // <div className='mb-4 shadow-gray-500 shadow-xl' key={post.id}>
        <Card key={post.id}/>
    //  </div>
    ))}

    <div style={buttonStyle}>
      <Button
        className="self-end rounded-md"
        leftIcon={<AddIcon />}
        colorScheme="red"
        variant="solid"
      >
        ADD POST
      </Button>
    </div>
  </div>
);
};

export default Posts
