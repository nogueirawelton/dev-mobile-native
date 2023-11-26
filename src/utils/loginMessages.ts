export enum LoginMessages {
  'auth/invalid-login-credentials' = 'Usuário ou senha incorretos!',
  'auth/email-already-in-use' = 'Já existe um usuário com este email!',
  'auth/weak-password' = 'Senha fraca, utilize uma com mais caracteres!',
  'auth/invalid-email' = 'Utilize um email válido!',
}

export type LoginMessage = keyof typeof LoginMessages;
