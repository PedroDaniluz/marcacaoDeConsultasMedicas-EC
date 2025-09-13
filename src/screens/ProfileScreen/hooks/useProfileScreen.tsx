import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../../contexts/AuthContext'
import { ProfileScreenProps } from '../types'

export function useProfileScreen() {
  const { user, signOut } = useAuth()
  const navigation = useNavigation<ProfileScreenProps['navigation']>()
  return { user, signOut, navigation }
}
