"use client"

import { signIn } from 'next-auth/react';
import { FC, useState } from 'react'
import { Button } from './Button';
import { toast } from './toast';

interface SignInButtonProps {
  
}

const SignInButton: FC<SignInButtonProps> = ({}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const signInWithGoogle = async () => {
        try {
            setIsLoading(true)
            await signIn('google');

        } catch (error) {
            toast({
                title: 'Error signing in',
                message: 'Please try again later.',
                type: 'error',
              })
        }
    };

  return <Button className='text-xs' onClick={signInWithGoogle} isLoading={isLoading}>
    Sign In
  </Button>
}

export default SignInButton