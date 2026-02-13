import '../styles/alerts.css';

export type AlertType = 'success' | 'error' | 'warning';

interface AlertProps {
  open: boolean;
  type: AlertType;
  message: string;
  onClose: () => void;
}

const titles: Record<AlertType, string> = {
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
};

export default function Alert({
  open,
  type,
  message,
  onClose,
}: AlertProps) {
  if (!open) return null;

  return (
    <div className="alert-overlay">
      <div className={`alert-box ${type}`}>
        <h3>{titles[type]}</h3>
        <p>{message}</p>

        <button onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
