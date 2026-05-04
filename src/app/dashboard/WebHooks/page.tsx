import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CredentialConnection = () => {
  return (
    <div className='p-6 space-y-6'>
        <h1 className='text-xl font-semibold text-gray-700'>Webhooks</h1>

        <div className='w-[90%] p-6 mx-auto'>
            <p className='text-center text-gray-500 font-medium'>You haven't created any webhooks yet</p>

            <div className='w-full bg-white border rounded-xl p-10 mt-10 flex flex-col gap-5 items-center border-gray-300'>
                <Image className='h-30 w-30 object-cover' src="https://cdn.candu.ai/cdn-cgi/image/width=120px,dpr=2/https://media.candulabs.com/1908/webhooks.png" alt="roundedimage" />
                <h1 className='font-semibold text-gray-700 text-sm text-center'>Send data to trigger scenarios instantly</h1>
                <p className='font-medium text-sm text-center text-gray-500 wrap-break-word'>Webhooks allow you to send data to Make over HTTP by creating a URL that you call from an external app or service, or from another Make scenario. Use webhooks module inside the Scenario Builder to create a webhook that triggers the execution of scenarios.</p>
                <button className='px-3 py-1 bg-purple-700 text-sm text-white font-semibold rounded-lg'>Open scenario builder</button>
            </div>

        </div>
        <h1 className='text-sm text-center text-gray-500'>Learn more about using <Link href="#" className='text-purple-500 hover:underline font-semibold'>Webhooks</Link></h1>
    </div>
  )
}

export default CredentialConnection