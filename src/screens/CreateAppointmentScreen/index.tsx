import React from 'react'
import { ScrollView, ViewStyle } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Header from '../../components/Header'
import DoctorList from '../../components/DoctorList'
import TimeSlotList from '../../components/TimeSlotList'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appointment } from './types'
import { Container, ErrorText, SectionTitle, styles, Title } from './styles'
import { useCreateAppointmentScreen } from './hooks/useCreateAppointmentScreen'
import { convertUsersToDoctors } from './utils/convertToDoctors'

const CreateAppointmentScreen: React.FC = () => {
  const {
    user,
    navigation,
    date,
    setDate,
    selectedTime,
    setSelectedTime,
    selectedDoctor,
    setSelectedDoctor,
    loading,
    setLoading,
    error,
    setError,
    doctors,
    loadingDoctors,
  } = useCreateAppointmentScreen()

  const handleCreateAppointment = async () => {
    try {
      setLoading(true)
      setError('')

      if (!date || !selectedTime || !selectedDoctor) {
        setError('Por favor, preencha a data e selecione um médico e horário')
        return
      }

      // Recupera consultas existentes
      const storedAppointments = await AsyncStorage.getItem(
        '@MedicalApp:appointments'
      )
      const appointments: Appointment[] = storedAppointments
        ? JSON.parse(storedAppointments)
        : []

      // Cria nova consulta
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        patientId: user?.id || '',
        patientName: user?.name || '',
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        date,
        time: selectedTime,
        specialty: selectedDoctor.specialty,
        status: 'pending',
      }

      // Adiciona nova consulta à lista
      appointments.push(newAppointment)

      // Salva lista atualizada
      await AsyncStorage.setItem(
        '@MedicalApp:appointments',
        JSON.stringify(appointments)
      )

      alert('Consulta agendada com sucesso!')
      navigation.goBack()
    } catch {
      setError('Erro ao agendar consulta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Agendar Consulta</Title>

        <Input
          placeholder="Data (DD/MM/AAAA)"
          value={date}
          onChangeText={setDate}
          containerStyle={styles.input}
          keyboardType="numeric"
        />

        <SectionTitle>Selecione um Horário</SectionTitle>
        <TimeSlotList
          onSelectTime={setSelectedTime}
          selectedTime={selectedTime}
        />

        <SectionTitle>Selecione um Médico</SectionTitle>
        {loadingDoctors ? (
          <ErrorText>Carregando médicos...</ErrorText>
        ) : (
          <DoctorList
            doctors={convertUsersToDoctors(doctors)}
            onSelectDoctor={setSelectedDoctor}
            selectedDoctorId={selectedDoctor?.id}
          />
        )}

        {error ? <ErrorText>{error}</ErrorText> : null}

        <Button
          title="Agendar"
          onPress={handleCreateAppointment}
          loading={loading}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          title="Cancelar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.cancelButton}
        />
      </ScrollView>
    </Container>
  )
}

export default CreateAppointmentScreen
