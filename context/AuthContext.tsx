'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '@/lib/firebase/config'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'

export interface UserProfile {
  id: string
  firebase_uid: string
  phone: string
  name: string | null
  email: string | null
  role: 'student' | 'tutor' | 'admin'
  avatar_url?: string | null
  created_at?: string
  class?: string | null
}

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  selectedClass: string
  setSelectedClass: (cls: string) => void
  loading: boolean
  isLoginModalOpen: boolean
  openLoginModal: () => void
  closeLoginModal: () => void
  setProfile: (profile: UserProfile | null) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [selectedClass, setSelectedClassState] = useState<string>('Class 8')
  const [loading, setLoading] = useState(true)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  // Initialize selected class from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ansh_selected_class')
      if (stored) {
        setSelectedClassState(stored)
      }
    } catch (e) {
      // ignore
    }
  }, [])

  const setSelectedClass = (cls: string) => {
    setSelectedClassState(cls)
    try {
      localStorage.setItem('ansh_selected_class', cls)
    } catch (e) {
      // ignore
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setUser(fbUser)
      if (fbUser) {
        // Sync or retrieve existing profile from backend
        try {
          const res = await fetch('/api/auth/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              firebaseUid: fbUser.uid,
              phoneNumber: fbUser.phoneNumber,
            }),
          })
          if (res.ok) {
            const data = await res.json()
            setProfile(data.profile)
          }
        } catch (e) {
          console.error('Failed to sync profile on auth state change:', e)
        }
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const openLoginModal = () => setIsLoginModalOpen(true)
  const closeLoginModal = () => setIsLoginModalOpen(false)

  const logout = async () => {
    try {
      await signOut(auth)
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      setProfile(null)
    } catch (e) {
      console.error('Logout error:', e)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        selectedClass,
        setSelectedClass,
        loading,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        setProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
