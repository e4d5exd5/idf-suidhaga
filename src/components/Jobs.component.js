import Card from '@/components/Cards/Jobcard'
import { Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import JobForm from '@/components/JobForm.component'
import React, { useState, useEffect } from 'react'
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

const Jobs = () => {
    
    const buttonStyle = {
        position: 'fixed',
        bottom: '0px',
        boxShadow: '0px 0px 5px rgba(255, 255, 255, 1)',
        borderRadius: '8px',
        border: '2px solid #ffffff',
        width: '100%',
        backgroundColor: 'white',

    }
    const [jobsData, setJobsData] = useState([]);
    
    useEffect(() => {
        fetch('/api/job')
            .then(response => response.json())
            .then(data => { setJobsData(data.jobs)});
    }, []);
    
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    return (
        <div className='h-full overflow-y-auto p-2 pb-10'>
            {jobsData && jobsData.map(job => (
                // <div className='mb-4 shadow-gray-500 shadow-xl' key={job.id}>
                <Card key={job.id} job={job} />
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
                    ADD Job
                </Button>

                <JobForm initialRef={initialRef}
                    finalRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose} />

            </div>
        </div>
    )
}

export default Jobs
