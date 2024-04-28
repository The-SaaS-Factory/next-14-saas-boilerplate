import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Check if a user has completed onboarding
  // If yes, redirect them to /dashboard
  if (auth().sessionClaims?.metadata?.onboardingComplete === true) {
    redirect('/home')
  }

  return <>{children}</>
}