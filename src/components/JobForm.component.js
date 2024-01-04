import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import router from 'next/router'
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

const JobForm = ({ initialRef, finalRef, isOpen, onClose }) => {
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

        fetch('/api/job', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ownerId: formD.ownerId,
                title: formD.title,
                description: formD.description,
                cost: formD.cost,
                material: formD.material,
                active: formD.active,
                noOfApplicants: formD.noOfApplicants,
                images: formD.images,
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error != null) setError(res.error)
                else router.push('/job')
            })
            .catch(err => {
                alert('Something went wrong')
                console.log(err)
            })

        resetForm();

    }

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={() => { resetForm(); onClose() }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>ADD JOB</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>JOB TITLE:</FormLabel>
                            <Input ref={initialRef} placeholder='JOB TITLE' value={formD.title} onChange={(e) => setFormData({ ...formD, title: e.target.value })} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>JOB DESCRIPTION:</FormLabel>
                            <Input placeholder='JOB DESCRIPTION' value={formD.description} onChange={(e) => { setFormData({ ...formD, description: e.target.value }) }} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>COST:</FormLabel>
                            <Input placeholder='COST' value={formD.cost} onChange={(e) => setFormData({ ...formD, cost: e.target.value })} />
                        </FormControl>


                        <FormControl mt={4}>
                            <FormLabel>MAX NO OF APPLICANTS:</FormLabel>
                            <Input disabled={maxApplicants} type='number' value={formD.noOfApplicants} onChange={(e) => setFormData({ ...formD, noOfApplicants: e.target.value })} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>No Limit:</FormLabel>
                            <RadioGroup defaultValue={true} value={maxApplicants} onChange={(value) => { setMaxApplicants(value == 'true') }}>
                                <Stack direction='row'>
                                    <Radio value={true} defaultChecked >Yes</Radio>
                                    <Radio value={false}>No</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Materials will be provided?:</FormLabel>
                            <RadioGroup defaultValue={true} value={formD.material} onChange={(value) => setFormData({ ...formD, material: value == 'true' })}>
                                <Stack direction='row'>
                                    <Radio value={true} defaultChecked>Yes</Radio>
                                    <Radio value={false}>No</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button className='text-black hover:text-white' colorScheme='blue' mr={3} onClick={submit}>
                            Save
                        </Button>
                        <Button onClick={() => { resetForm(); onClose() }}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default JobForm