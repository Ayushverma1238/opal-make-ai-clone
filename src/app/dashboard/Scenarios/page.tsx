import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
  redirect('/dashboard/Scenarios/all')
}

export default page