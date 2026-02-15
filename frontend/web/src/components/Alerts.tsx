import '../styles/alerts.css';
import { useTranslation } from 'react-i18next';

export type AlertType = 'success' | 'error' | 'warning';

interface AlertProps {
  open: boolean;
  type: AlertType;
  message: string;
  onClose: () => void;
}

export default function Alert({
  open,
  type,
  message,
  onClose,
}: AlertProps) {
  const { t } = useTranslation();

  if (!open) return null;

  const titles: Record<AlertType, string> = {
    success: t('success'),
    error: t('error'),
    warning: t('warning'),
  };

  return (
    <div className="alert-overlay">
      <div className={`alert-box ${type}`}>
        <h3>{titles[type]}</h3>
        <p>{message}</p>

        <button onClick={onClose}>
          {t('ok')}
        </button>
      </div>
    </div>
  );
}
