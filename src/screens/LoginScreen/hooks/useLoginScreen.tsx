import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../../contexts/AuthContext'
import { LoginScreenProps } from '../types'
import { useState } from 'react'

export function useLoginScreen() {
  const { signIn } = useAuth()
  const navigation = useNavigation<LoginScreenProps['navigation']>()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  return {
    signIn,
    navigation,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setLoading,
    error,
    setError,
  }
}
