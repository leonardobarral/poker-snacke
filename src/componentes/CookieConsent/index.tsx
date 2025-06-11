import { useAppSelector } from '../../hooks';
import { updateCookieConsent } from '../../Server/updateCookieConsent';
import styles from './style.module.css';

interface Props {
  onAccept: () => void;
}

export default function CookieConsent({ onAccept }: Props) {
  const userData = useAppSelector(state => state.user.userData);

  const handleAccept = async () => {
    if (userData) {
      try {
        await updateCookieConsent(userData.id, true);
      } catch (err) {
        console.error('Erro ao salvar consentimento:', err);
      }
    }
    onAccept();
  };

  return (
    <div className={styles.banner}>
      <p>
        Este site utiliza cookies para aprimorar sua experiência. Ao continuar
        navegando, você concorda com nossa política de privacidade.
      </p>
      <button onClick={handleAccept}>Aceitar</button>
    </div>
  );
}
