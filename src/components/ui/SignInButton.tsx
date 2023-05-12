"use client"

import { FC, useState } from 'react';
import { Button } from "@/components/ui/Button";
import { signIn } from 'next-auth/react';
import { toast } from '@/components/ui/Toast';

interface SignInButtonProps {
  
}

const SignInButton: FC<SignInButtonProps> = ({}) => {
    const [isLoading, setIsloading] = useState<boolean>(false)

    const signInWithGoogle = async() => {
        setIsloading(true)

        try {
            await signIn('google')
        } catch (error) {
            toast({
                title: 'Error signin in',
                message: 'Please try again later.',
                type: 'error'
            })
        }
    }

    return (
        <Button onClick={signInWithGoogle} isLoading={isLoading}>
            Sign in
        </Button>
    )
}

export default SignInButton