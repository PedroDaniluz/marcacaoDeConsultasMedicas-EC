import React from 'react'
import { Button } from 'react-native-elements'
import Header from '../../components/Header'
import { ViewStyle } from 'react-native'
import {
  Avatar,
  Container,
  Email,
  Name,
  ProfileCard,
  RoleBadge,
  RoleText,
  ScrollView,
  SpecialtyText,
  styles,
  Title,
} from './styles'
import { getRoleText } from './utils/roleHelper'
import { useProfileScreen } from './hooks/useProfileScreen'

const ProfileScreen: React.FC = () => {
  const { user, signOut, navigation } = useProfileScreen()

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Meu Perfil</Title>

        <ProfileCard>
          <Avatar
            source={{ uri: user?.image || 'https://via.placeholder.com/150' }}
          />
          <Name>{user?.name}</Name>
          <Email>{user?.email}</Email>
          <RoleBadge role={user?.role || ''}>
            <RoleText>{getRoleText(user?.role || '')}</RoleText>
          </RoleBadge>

          {user?.role === 'doctor' && (
            <SpecialtyText>Especialidade: {user?.specialty}</SpecialtyText>
          )}
        </ProfileCard>

        <Button
          title="Voltar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

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

export default ProfileScreen
