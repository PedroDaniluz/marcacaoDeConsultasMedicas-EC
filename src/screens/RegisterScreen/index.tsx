import { Input, Button } from 'react-native-elements'
import { ViewStyle } from 'react-native'
import {
  Container,
  ErrorText,
  SectionTitle,
  styles,
  Title,
  UserTypeButton,
  UserTypeContainer,
  UserTypeText,
} from './styles'
import { useRegisterScreen } from './hooks/useRegisterScreen'
import { handleRegisterHelper } from './utils/registerHelpers'

const RegisterScreen: React.FC = () => {
  const {
    register,
    navigation,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    userType,
    setUserType,
    loading,
    setLoading,
    error,
    setError,
  } = useRegisterScreen()

  const handleRegister = () =>
    handleRegisterHelper(
      setLoading,
      setError,
      name,
      email,
      password,
      userType,
      navigation,
      register
    )

  return (
    <Container>
      <Title>Cadastro de Usuário</Title>

      <Input
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        containerStyle={styles.input}
      />

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={styles.input}
      />

      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={styles.input}
      />

      <SectionTitle>Tipo de Usuário</SectionTitle>
      <UserTypeContainer>
        <UserTypeButton
          selected={userType === 'PACIENTE'}
          onPress={() => setUserType('PACIENTE')}
        >
          <UserTypeText selected={userType === 'PACIENTE'}>
            👤 Paciente
          </UserTypeText>
        </UserTypeButton>

        <UserTypeButton
          selected={userType === 'ADMIN'}
          onPress={() => setUserType('ADMIN')}
        >
          <UserTypeText selected={userType === 'ADMIN'}>
            🔧 Administrador
          </UserTypeText>
        </UserTypeButton>
      </UserTypeContainer>

      {error ? <ErrorText>{error}</ErrorText> : null}

      <Button
        title="Cadastrar"
        onPress={handleRegister}
        loading={loading}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyle}
      />

      <Button
        title="Voltar para Login"
        onPress={() => navigation.navigate('Login')}
        containerStyle={styles.backButton as ViewStyle}
        buttonStyle={styles.backButtonStyle}
      />
    </Container>
  )
}

export default RegisterScreen
