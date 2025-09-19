import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '../types'

export async function loadUsersHelper(
  currentUserId: string | undefined,
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const storedUsers = await AsyncStorage.getItem('@MedicalApp:users')
    if (storedUsers) {
      const allUsers: User[] = JSON.parse(storedUsers)
      // Filtra o usuário atual da lista
      const filteredUsers = allUsers.filter((u) => u.id !== currentUserId)
      setUsers(filteredUsers)
    }
  } catch (error) {
    console.error('Erro ao carregar usuários:', error)
  } finally {
    setLoading(false)
  }
}

export async function handleDeleteUserHelper(
  userId: string,
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  currentUserId: string | undefined
) {
  try {
    const storedUsers = await AsyncStorage.getItem('@MedicalApp:users')
    if (storedUsers) {
      const allUsers: User[] = JSON.parse(storedUsers)
      const updatedUsers = allUsers.filter((u) => u.id !== userId)
      await AsyncStorage.setItem(
        '@MedicalApp:users',
        JSON.stringify(updatedUsers)
      )
      await loadUsersHelper(currentUserId, setUsers, setLoading)
    }
  } catch (error) {
    console.error('Erro ao deletar usuário:', error)
  }
}

export function getRoleTextHelper(role: string) {
  switch (role) {
    case 'admin':
      return 'Administrador'
    case 'doctor':
      return 'Médico'
    case 'patient':
      return 'Paciente'
    default:
      return role
  }
}
