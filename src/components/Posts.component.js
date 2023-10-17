import Card from '@/Cards/Postcard'
import { Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import Addpost from '@/pages/cards/addpost'
import React, { useState } from 'react'
import Link from 'next/link'
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Radio,
  RadioGroup,
  Stack,
  Image,
} from '@chakra-ui/react'

const Posts = () => {
  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    left: '20px'
  }
  const postsData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <div className='h-full overflow-y-auto p-2'>
      {postsData.map(post => (
        // <div className='mb-4 shadow-gray-500 shadow-xl' key={post.id}>
        <Card key={post.id} />
        //  </div>
      ))}

      <div style={buttonStyle}>
        <Button
          className='self-end rounded-md'
          leftIcon={<AddIcon />}
          colorScheme='red'
          variant='solid'
          onClick={onOpen}
        >
          ADD POST
        </Button>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>ADD POST</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              
              <FormControl>
                <FormLabel>PRODUCT NAME:</FormLabel>
                <Input ref={initialRef} placeholder='PRODUCT NAME' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>DESCRIPTION:</FormLabel>
                <Input placeholder='DESCRIPTION' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>COST:</FormLabel>
                <Input placeholder='COST' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Materials will be provided?:</FormLabel>
                <RadioGroup defaultValue='1'>
                  <Stack direction='row'>
                    <Radio value='1'>Yes</Radio>
                    <Radio value='2'>No</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}

export default Posts
