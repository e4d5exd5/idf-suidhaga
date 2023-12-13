import Card from '@/Cards/Postcard'
import { Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import Addpost from '@/pages/cards/addpost'
import PostForm from '@/components/PostForm.component'
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
        bottom: '0px',
        boxShadow: '0px 0px 5px rgba(255, 255, 255, 1)',
        borderRadius: '8px',
        border: '2px solid #ffffff',
        width: '968px',
        backgroundColor:'white',
        
    }
    const postsData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    return (
        <div className='h-full overflow-y-auto p-2 pb-10'>
            {postsData.map(post => (
                // <div className='mb-4 shadow-gray-500 shadow-xl' key={post.id}>
                <Card key={post.id} />
                //  </div>
            ))}

            <div style={buttonStyle}>
                <Button
                    className='self-end rounded-lg bg-blue-500 '
                    leftIcon={<AddIcon />}
                    colorScheme=''
                    variant='solid'
                    left={400}
                    onClick={onOpen}
                    borderRadius={8}
                >
                    ADD POST
                </Button>

                <PostForm initialRef={initialRef}
                    finalRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose} />

            </div>
        </div>
    )
}

export default Posts
