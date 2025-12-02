export interface AuthState {
  token: string | null;
  tokenType: string | null;
  admin: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthResultDto {
  success: boolean;
  message?: string | null;
}

export interface RegisterResultDto {
  mensagem: string,
  usuario: {
    usuario_id: number,
    username: string,
    email: string,
    ativo: boolean,
    admin: boolean,
    criado_em: string,
    ultimo_login: string | null
  }
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  admin: boolean;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResultDto {
  access_token: string,
  token_type: string,
  usuario: {
    usuario_id: number,
    username: string,
    email: string,
    ativo: boolean,
    admin: boolean,
    criado_em: string,
    ultimo_login: string | null
  }
}
