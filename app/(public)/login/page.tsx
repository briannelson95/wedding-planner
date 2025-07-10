import FormWrapper from '@/components/forms/FormWrapper'
import LoginForm from '@/components/forms/LoginForm'
import React from 'react'

export default function LoginPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <FormWrapper
                    title='Login to your account'
                    description='Enter your email below to login to your account'
                    form={<LoginForm />}
                />
            </div>
        </div>
    )
}
