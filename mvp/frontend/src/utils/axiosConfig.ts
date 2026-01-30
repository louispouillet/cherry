import axios from 'axios';

/**
 * Configure un intercepteur Axios pour gérer automatiquement l'authentification
 * et rediriger vers login si le token est invalide
 */
export const setupAxiosInterceptors = (navigate: (path: string) => void) => {
    // Intercepteur de requête - Ajoute automatiquement le token
    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Intercepteur de réponse - Gère les erreurs d'authentification
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            // Si l'erreur est 401 (Unauthorized), le token est invalide
            if (error.response?.status === 401) {
                console.warn('Token invalid or expired, redirecting to login');
                localStorage.removeItem('token');
                navigate('/login');
            }
            return Promise.reject(error);
        }
    );
};
