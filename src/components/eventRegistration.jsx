import React from 'react'
import { ExpandableCardDemo } from './ui/ExpandableCardDemo' 

function eventRegistration() {
  return (
    <main className="bg-background text-foreground p-10 space-y-16">
      <section>
        <h1 className="text-3xl w-full text-center md:text-4xl py-2 lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Events Registration</h1>
        <ExpandableCardDemo />
      </section>
    </main>
  )
}

export default eventRegistration
