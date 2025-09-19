import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../../contexts/AuthContext'
import { RegisterScreenProps } from '../types'
import { useState } from 'react'

export function useRegisterScreen() {
  const { register } = useAuth()
  const navigation = useNavigation<RegisterScreenProps['navigation']>()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState<'PACIENTE' | 'ADMIN'>('PACIENTE')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  return {
    register,
    navigation,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    userType,
    setUserType,
    loading,
    setLoading,
    error,
    setError,
  }
}
