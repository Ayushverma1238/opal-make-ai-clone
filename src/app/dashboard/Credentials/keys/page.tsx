import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const CredentialKeys = () => {
  return (
    <div className='p-6 space-y-6'>
        <h1 className='text-xl font-semibold text-gray-700'>Keys</h1>

        <div className='w-[90%] p-6 mx-auto'>
            <p className='text-center text-gray-500 font-medium'>You haven't created any key yet </p>

            <div className='w-full bg-white border rounded-xl p-10 mt-10 flex flex-col gap-5 items-center border-gray-300'>
                <Image height={120} width={120} className='h-30 w-30 object-cover' src="https://cdn.candu.ai/cdn-cgi/image/width=120px,dpr=2/https://media.candulabs.com/1908/keys.png" alt="roundedimage" />
                <h1 className='font-semibold text-gray-700 text-center'>Manage public and private keys easily</h1>
                <p className='font-medium text-sm text-center text-gray-500 wrap-break-word'>The keychain in Make will help you administer public and private keys. If a module requires a public or private key, you can add it to the keychain in the module setting.</p>
                <button className='px-3 py-1 bg-purple-700 text-sm text-white font-semibold rounded-lg'>Open scenario builder</button>
            </div>

        </div>
        <h1 className='text-sm text-center text-gray-500'>Learn more about using <Link href="#" className='text-purple-500 hover:underline font-semibold'>Keys</Link></h1>
    </div>
  )
}

export default CredentialKeys