import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../../contexts/AuthContext'
import { User, UserManagementScreenProps } from '../types'
import { useState } from 'react'

export function useUserManagementScreen() {
  const { user } = useAuth()
  const navigation = useNavigation<UserManagementScreenProps['navigation']>()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  return {
    user,
    navigation,
    users,
    setUsers,
    loading,
    setLoading,
  }
}
