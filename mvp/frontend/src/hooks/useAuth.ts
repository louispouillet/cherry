import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * Hook personnalisé pour vérifier la validité du token à chaque action
 * Redirige vers /login si le token est invalide ou expiré
 */
export const useAuth = () => {
  const navigate = useNavigate();

  const checkTokenValidity = async (): Promise<boolean> => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('No token found, redirecting to login');
      navigate('/login');
      return false;
    }

    try {
      // Vérifier la validité du token en appelant une route protégée
      await axios.get('http://localhost:3000/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch (error: any) {
      console.error('Token validation failed:', error);
      
      // Si le token est invalide ou expiré
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return false;
      }
      
      return false;
    }
  };

  // Vérifier le token au chargement de la page
  useEffect(() => {
    checkTokenValidity();
  }, []);

  return { checkTokenValidity };
};

/**
 * Fonction helper pour wrapper les actions avec vérification de token
 */
export const withTokenCheck = async (
  action: () => Promise<void>,
  checkTokenValidity: () => Promise<boolean>
): Promise<void> => {
  const isValid = await checkTokenValidity();
  if (isValid) {
    await action();
  }
};
