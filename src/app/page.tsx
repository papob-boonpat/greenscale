import GreenScaleLanding from '@/components/main-page'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "GreenScale",
  description: "Advanced solutions for showcase.",
}
const HomePage = () => {
  return (
    <GreenScaleLanding />
  )
}

export default HomePage