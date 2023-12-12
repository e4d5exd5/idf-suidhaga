import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
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

const PostForm = ({ initialRef, finalRef, isOpen, onClose }) => {
    const [formD, setFormData] = useState({
        ownerId: '',
        title: '',
        description: '',
        cost: '',
        material: 1,
        active: true,
        noOfApplicants: 1,
        images: {},
    });
    
    const [maxApplicants, setMaxApplicants] = useState(1);
    
    const resetForm = () => {
        setFormData({
            ownerId: '',
            title: '',
            description: '',
            cost: '',
            material: true,
            active: true,
            noOfApplicants: 1,
            images: {},
        })
        setMaxApplicants(true);
    }
    
    const submit = () => {
        console.log(formD);
        
        resetForm();
        
    }
    
    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={() => { resetForm(); onClose()}}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>ADD POST</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>PRODUCT NAME:</FormLabel>
                            <Input ref={initialRef} placeholder='PRODUCT NAME' value={formD.title} onChange={(e) => setFormData({...formD, title: e.target.value})} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>DESCRIPTION:</FormLabel>
                            <Input placeholder='DESCRIPTION'  value={formD.description} onChange={(e) => {setFormData({ ...formD, description: e.target.value })}} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>COST:</FormLabel>
                            <Input placeholder='COST' value={formD.cost} onChange={(e) => setFormData({ ...formD, cost: e.target.value })} />
                        </FormControl>
                        
                        
                        <FormControl mt={4}>
                            <FormLabel>MAX NO OF APPLICANTS:</FormLabel>
                            <Input disabled={maxApplicants } type='number' value={formD.noOfApplicants} onChange={(e) => setFormData({ ...formD, noOfApplicants: e.target.value })} />
                        </FormControl>
                        
                        <FormControl mt={4}>
                            <FormLabel>No Limit:</FormLabel>
                            <RadioGroup defaultValue={ true } value={maxApplicants} onChange={(value) => {setMaxApplicants(value == 'true')}}>
                                <Stack direction='row'>
                                    <Radio value={ true } defaultChecked >Yes</Radio>
                                    <Radio value={ false }>No</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Materials will be provided?:</FormLabel>
                            <RadioGroup defaultValue={ true } value={formD.material} onChange={(value) => setFormData({ ...formD, material: value == 'true' })}>
                                <Stack direction='row'>
                                    <Radio value={ true } defaultChecked>Yes</Radio>
                                    <Radio value={ false }>No</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={submit}>
                            Save
                        </Button>
                        <Button onClick={() => { resetForm(); onClose()}}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PostForm