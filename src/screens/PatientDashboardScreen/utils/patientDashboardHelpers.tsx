import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appointment } from '../types'
import { AuthContextData } from '../../../types/auth'

export async function loadAppointmentsHelper(
  user: AuthContextData['user'],
  setAppointments: (appointments: Appointment[]) => void,
  setLoading: (loading: boolean) => void
) {
  try {
    const storedAppointments = await AsyncStorage.getItem(
      '@MedicalApp:appointments'
    )
    if (storedAppointments) {
      const allAppointments: Appointment[] = JSON.parse(storedAppointments)
      const userAppointments = allAppointments.filter(
        (appointment) => appointment.patientId === user?.id
      )
      setAppointments(userAppointments)
    }
  } catch (error) {
    console.error('Erro ao carregar consultas:', error)
  } finally {
    setLoading(false)
  }
}

export const getStatusText = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'Confirmada'
    case 'cancelled':
      return 'Cancelada'
    default:
      return 'Pendente'
  }
}
