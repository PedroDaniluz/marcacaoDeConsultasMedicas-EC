import React from 'react'
import { ScrollView, ViewStyle, TextStyle } from 'react-native'
import { Button, ListItem, Text } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'
import Header from '../../components/Header'
import {
  AppointmentCard,
  ButtonContainer,
  Container,
  EmptyText,
  LoadingText,
  StatusBadge,
  StatusText,
  styles,
  Title,
} from './styles'
import {
  getStatusText,
  handleUpdateStatusHelper,
  loadAppointmentsHelper,
} from './utils/doctorDashboardHelpers'
import { useDoctorDashboardScreen } from './hooks/useDoctorDashboardScreen'

const DoctorDashboardScreen: React.FC = () => {
  const {
    user,
    signOut,
    navigation,
    appointments,
    setAppointments,
    loading,
    setLoading,
  } = useDoctorDashboardScreen()

  const loadAppointments = () =>
    loadAppointmentsHelper(user?.id, setAppointments, setLoading)

  const handleUpdateStatus = (
    appointmentId: string,
    newStatus: 'confirmed' | 'cancelled'
  ) =>
    handleUpdateStatusHelper(
      appointmentId,
      newStatus,
      user?.id,
      setAppointments,
      setLoading
    )

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
                  Paciente: {appointment.patientName || 'Nome não disponível'}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.dateTime as TextStyle}>
                  {appointment.date} às {appointment.time}
                </ListItem.Subtitle>
                <Text style={styles.specialty as TextStyle}>
                  {appointment.specialty}
                </Text>
                <StatusBadge status={appointment.status}>
                  <StatusText status={appointment.status}>
                    {getStatusText(appointment.status)}
                  </StatusText>
                </StatusBadge>
                {appointment.status === 'pending' && (
                  <ButtonContainer>
                    <Button
                      title="Confirmar"
                      onPress={() =>
                        handleUpdateStatus(appointment.id, 'confirmed')
                      }
                      containerStyle={styles.actionButton as ViewStyle}
                      buttonStyle={styles.confirmButton}
                    />
                    <Button
                      title="Cancelar"
                      onPress={() =>
                        handleUpdateStatus(appointment.id, 'cancelled')
                      }
                      containerStyle={styles.actionButton as ViewStyle}
                      buttonStyle={styles.cancelButton}
                    />
                  </ButtonContainer>
                )}
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

export default DoctorDashboardScreen
