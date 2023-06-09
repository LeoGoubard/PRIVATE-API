'use client'

import createApiKey from '@/helpers/create-api-key'
import { revokeApiKey } from '@/helpers/revoke-api-key'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { Button } from './ui/Button'
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem } from './ui/DropDownMenu'
import { toast } from './ui/Toast'

interface ApiKeyOptionsProps {
  apiKeyId: string
  apiKeyValue: string
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({ apiKeyId, apiKeyValue }) => {
    const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false)
    const [isRevoking, setIsRevoking] = useState<boolean>(false)
    const router = useRouter()


    const createNewApiKey = async() =>{
        setIsCreatingNew(true)

        try {
            await revokeApiKey({ keyId: apiKeyId })
            await createApiKey()

            router.refresh()
        } catch (error) {
            toast({
                title: 'Error creating API key',
                message: 'Please try again later',
                type: 'error'
            })
        } finally {
            setIsCreatingNew(false)
        }
    }
    const revokeCurrentApiKey = async() => {
        setIsRevoking(true)
        try {
            await revokeApiKey({ keyId: apiKeyId })
            router.refresh()
        } catch (error) {
            toast({
                title: 'Error revoking API key',
                message: 'Please try again later',
                type: 'error'
            })
        } finally {
            setIsRevoking(false)
        }
    }
  return (
    <DropdownMenu>
        <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
            <Button variant='ghost' className='flex gap-2 items-center'>
                <p>
                    {isCreatingNew ? 'Creating new key' : isRevoking ? 'Revoking key' : 'Options'}
                </p>
                {isCreatingNew || isRevoking ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                ) : null}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem onClick={() => {
                navigator.clipboard.writeText(apiKeyValue)

                toast({
                    title: 'Copied',
                    message: 'API key copied to clipboard',
                    type: 'success'
                })
            }}>
                Copy
            </DropdownMenuItem>
            <DropdownMenuItem onClick={createNewApiKey}>
                Create new key
            </DropdownMenuItem>
            <DropdownMenuItem onClick={revokeCurrentApiKey}>
                Revoke key
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ApiKeyOptions