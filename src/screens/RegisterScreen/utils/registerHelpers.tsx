import { AuthContextData } from '../../../types/auth'
import { RegisterScreenProps } from '../types'

export async function handleRegisterHelper(
  setLoading: (loading: boolean) => void,
  setError: (error: string) => void,
  name: string,
  email: string,
  password: string,
  userType: 'PACIENTE' | 'ADMIN',
  navigation: RegisterScreenProps['navigation'],
  register: AuthContextData['register']
) {
  try {
    setLoading(true)
    setError('')

    if (!name || !email || !password) {
      setError('Por favor, preencha todos os campos')
      return
    }

    await register({
      name,
      email,
      password,
      userType,
    })

    // Após o registro bem-sucedido, navega para o login
    navigation.navigate('Login')
  } catch {
    setError('Erro ao criar conta. Tente novamente.')
  } finally {
    setLoading(false)
  }
}
