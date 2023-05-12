"use client"

import { FC, useState } from 'react';
import { Button } from "@/components/ui/Button";
import { signOut } from 'next-auth/react';
import toast from "react-hot-toast";

interface SignOutButtonProps {}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
    const [isLoading, setIsloading] = useState<boolean>(false)

    const signUSerOut = async() => {
        setIsloading(true)

        try {
            await signOut()
        } catch (error) {
            toast.error('Please try again later.')
        }
    }

    return (
        <Button onClick={signUSerOut} isLoading={isLoading}>
            Sign out
        </Button>
    )
}

export default SignOutButton