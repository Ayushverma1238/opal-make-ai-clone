import Link from 'next/link'
import React from 'react'

const CredentialConnection = () => {
  return (
    <div className='p-6 space-y-6'>
        <h1 className='text-xl font-semibold text-gray-700'>Connections</h1>

        <div className='w-[90%] p-6 mx-auto'>
            <p className='text-center text-gray-500 font-medium'>You haven't created any connections yet </p>

            <div className='w-full bg-white border rounded-xl p-10 mt-10 flex flex-col gap-5 items-center border-gray-300'>
                <img className='h-20 w-30 object-cover' src="https://cdn.candu.ai/cdn-cgi/image/width=120px,dpr=2/https://media.candulabs.com/1908/templa.png" alt="roundedimage" />
                <h1 className='font-semibold text-gray-700 text-sm text-center'>Connect more than 2000+ apps</h1>
                <p className='font-medium text-sm text-center text-gray-500 wrap-break-word'>Connections are authorized third-party apps that you grant access permission to use with Make. Connections are the first step when building your scenario. Open the Scenario Builder and start adding modules of apps you want to connect.</p>
                <button className='px-3 py-1 bg-purple-700 text-sm text-white font-semibold rounded-lg'>Open scenario builder</button>
            </div>

        </div>
        <h1 className='text-sm text-center text-gray-500'>Learn more about <Link href="#" className='text-purple-500 hover:underline font-semibold'>Connections</Link></h1>
    </div>
  )
}

export default CredentialConnection