import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../../contexts/AuthContext'
import { Appointment, PatientDashboardScreenProps } from '../types'
import { useState } from 'react'

export function usePatientDashboardScreen() {
  const { user, signOut } = useAuth()
  const navigation = useNavigation<PatientDashboardScreenProps['navigation']>()
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
