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

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appointment } from '../types'

export async function loadAppointmentsHelper(
  userId: string | undefined,
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const storedAppointments = await AsyncStorage.getItem(
      '@MedicalApp:appointments'
    )
    if (storedAppointments) {
      const allAppointments: Appointment[] = JSON.parse(storedAppointments)
      const doctorAppointments = allAppointments.filter(
        (appointment) => appointment.doctorId === userId
      )
      setAppointments(doctorAppointments)
    }
  } catch (error) {
    console.error('Erro ao carregar consultas:', error)
  } finally {
    setLoading(false)
  }
}

export async function handleUpdateStatusHelper(
  appointmentId: string,
  newStatus: 'confirmed' | 'cancelled',
  userId: string | undefined,
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const storedAppointments = await AsyncStorage.getItem(
      '@MedicalApp:appointments'
    )
    if (storedAppointments) {
      const allAppointments: Appointment[] = JSON.parse(storedAppointments)
      const updatedAppointments = allAppointments.map((appointment) => {
        if (appointment.id === appointmentId) {
          return { ...appointment, status: newStatus }
        }
        return appointment
      })
      await AsyncStorage.setItem(
        '@MedicalApp:appointments',
        JSON.stringify(updatedAppointments)
      )
      await loadAppointmentsHelper(userId, setAppointments, setLoading)
    }
  } catch (error) {
    console.error('Erro ao atualizar status:', error)
  }
}
