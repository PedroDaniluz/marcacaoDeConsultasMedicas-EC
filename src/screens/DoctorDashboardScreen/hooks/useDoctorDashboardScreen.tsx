import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../../contexts/AuthContext'
import { Appointment, DoctorDashboardScreenProps } from '../types'
import { useState } from 'react'

export function useDoctorDashboardScreen() {
  const { user, signOut } = useAuth()
  const navigation = useNavigation<DoctorDashboardScreenProps['navigation']>()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  return {
    user,
    signOut,
    navigation,
    appointments,
    setAppointments,
    loading,
    setLoading,
  }
}
