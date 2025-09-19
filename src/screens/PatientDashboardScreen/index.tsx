import React from 'react'
import { ScrollView, ViewStyle, TextStyle } from 'react-native'
import { Button, ListItem, Text } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'
import Header from '../../components/Header'
import {
  AppointmentCard,
  Container,
  EmptyText,
  LoadingText,
  StatusBadge,
  StatusText,
  styles,
  Title,
} from './styles'
import { usePatientDashboardScreen } from './hooks/usePatientDashboardScreen'
import {
  getStatusText,
  loadAppointmentsHelper,
} from './utils/patientDashboardHelpers'

const PatientDashboardScreen: React.FC = () => {
  const {
    user,
    signOut,
    navigation,
    appointments,
    setAppointments,
    loading,
    setLoading,
  } = usePatientDashboardScreen()

  const loadAppointments = () =>
    loadAppointmentsHelper(user, setAppointments, setLoading)

  // Carrega as consultas quando a tela estiver em foco
  useFocusEffect(
    React.useCallback(() => {
      loadAppointments()
    }, [])
  )

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Minhas Consultas</Title>

        <Button
          title="Agendar Nova Consulta"
          onPress={() => navigation.navigate('CreateAppointment')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          title="Meu Perfil"
          onPress={() => navigation.navigate('Profile')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        {loading ? (
          <LoadingText>Carregando consultas...</LoadingText>
        ) : appointments.length === 0 ? (
          <EmptyText>Nenhuma consulta agendada</EmptyText>
        ) : (
          appointments.map((appointment) => (
            <AppointmentCard key={appointment.id}>
              <ListItem.Content>
                <ListItem.Title style={styles.patientName as TextStyle}>
                  Paciente: {appointment.patientName}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.dateTime as TextStyle}>
                  {appointment.date} às {appointment.time}
                </ListItem.Subtitle>
                <Text style={styles.doctorName as TextStyle}>
                  {appointment.doctorName}
                </Text>
                <Text style={styles.specialty as TextStyle}>
                  {appointment.specialty}
                </Text>
                <StatusBadge status={appointment.status}>
                  <StatusText status={appointment.status}>
                    {getStatusText(appointment.status)}
                  </StatusText>
                </StatusBadge>
              </ListItem.Content>
            </AppointmentCard>
          ))
        )}

        <Button
          title="Sair"
          onPress={signOut}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.logoutButton}
        />
      </ScrollView>
    </Container>
  )
}

export default PatientDashboardScreen
