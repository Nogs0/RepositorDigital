import { defineStore } from 'pinia';
import axios, { isAxiosError } from 'axios';
import router from '@/router'; // Importe o router para redirecionamento
import type { AuthState, LoginDto, RegisterResultDto, LoginResultDto, RegisterDto, AuthResultDto } from '@/types/auth';
import { ca, fa } from 'vuetify/locale';

function getInitialState(): AuthState {
    const token = localStorage.getItem('token') ?? "";
    const tokenType = localStorage.getItem('tokenType') ?? "";
    const admin = localStorage.getItem('admin') == "true";
    const isLoading = false;
    const error = "";

    if (!token) {
        return {
            token: null,
            tokenType: null,
            admin: false,
            isLoading,
            error
        };
    }

    return {
        token,
        tokenType,
        admin,
        isLoading,
        error
    }
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => getInitialState(),
    getters: {
        isAuthenticated: (state): boolean => !!state.token
    },
    actions: {
        async login(credentials: LoginDto): Promise<AuthResultDto> {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await axios.post<LoginResultDto>('/auth/login', credentials);

                this.token = response.data.access_token;
                this.tokenType = response.data.token_type;
                this.admin = response.data.usuario.admin;

                localStorage.setItem('token', this.token ?? "");
                localStorage.setItem('tokenType', this.tokenType ?? "");
                localStorage.setItem('admin', this.admin ? "true" : "false");

                axios.defaults.headers.common['Authorization'] = `${this.tokenType} ${this.token}`;

                // Redireciona para a área logada
                await router.push('/app');
                return {
                    success: true
                }
            } catch (error) {
                console.error('Login failed:', error);
                this.token = null;
                this.admin = false;
                this.tokenType = null;
                this.logout(false);

                let message = 'Ocorreu um erro inesperado. Tente novamente.';

                if (isAxiosError(error) && error.response?.data?.message) {
                    message = error.response.data.message;
                }

                return {
                    success: false,
                    message: message
                }
            }
            finally {
                this.isLoading = false;
            }
        },

        logout(redirect = true): void {
            this.token = null;
            this.tokenType = null;
            this.admin = false;

            localStorage.clear();

            delete axios.defaults.headers.common['Authorization'];

            if (redirect) {
                router.push('/login');
            }
        },
        async register(dto: RegisterDto): Promise<AuthResultDto> {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await axios.post<RegisterResultDto>('/auth/register', dto);

                // Redireciona para o login
                await router.push('/');
                return { success: true }
            } catch (error) {
                console.error('Register failed:', error);

                let message = 'Ocorreu um erro inesperado. Tente novamente.';

                if (isAxiosError(error) && error.response?.data?.message) {
                    message = error.response.data.message;
                }
                return {
                    success: false,
                    message: message
                }
            }
            finally {
                this.isLoading = false;
            }
        }
    },
});