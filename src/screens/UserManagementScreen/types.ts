import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/navigation'

export type UserManagementScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserManagement'>
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'doctor' | 'patient'
}

export interface StyledProps {
  role: string
}
