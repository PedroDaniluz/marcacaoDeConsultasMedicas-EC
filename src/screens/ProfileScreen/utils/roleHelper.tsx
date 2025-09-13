export const getRoleText = (role: string) => {
  switch (role) {
    case 'admin':
      return 'Administrador'
    case 'doctor':
      return 'Médico'
    case 'patient':
      return 'Paciente'
    default:
      return role
  }
}
