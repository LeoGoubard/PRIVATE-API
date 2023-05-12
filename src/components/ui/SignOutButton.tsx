"use client"

import { FC, useState } from 'react';
import { Button } from "@/components/ui/Button";
import { signOut } from 'next-auth/react';
import { toast } from '@/components/ui/Toast';

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
    const [isLoading, setIsloading] = useState<boolean>(false)

    const signUSerOut = async() => {
        setIsloading(true)

        try {
            await signOut()
        } catch (error) {
            toast({
                title: 'Error signin out',
                message: 'Please try again later.',
                type: 'error'
            })
        }
    }

    return (
        <Button onClick={signUSerOut} isLoading={isLoading}>
            Sign out
        </Button>
    )
}

export default SignOutButton