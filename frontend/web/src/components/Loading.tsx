import '../styles/loading.css';

type LoadingProps = {
  open: boolean;
};

export default function Loading({ open }: LoadingProps) {
  if (!open) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-box">
        <span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </div>
    </div>
  );
}
