import React from 'react';
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  InformationCircleIcon, 
  XCircleIcon 
} from '@heroicons/react/24/outline';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose?: () => void;
}

export default function Alert({ type, title, message, onClose }: AlertProps) {
  const styles = {
    success: 'bg-success/10 text-success border-success/20',
    error: 'bg-danger/10 text-danger border-danger/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    info: 'bg-accent/10 text-accent border-accent/20'
  };

  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: ExclamationCircleIcon,
    info: InformationCircleIcon
  };

  const Icon = icons[type];

  return (
    <div className={`rounded-lg border p-4 ${styles[type]}`}>
      <div className="flex items-start">
        <Icon className="h-5 w-5 mt-0.5 mr-3" />
        <div className="flex-1">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="mt-1 text-sm opacity-90">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 inline-flex shrink-0 opacity-50 hover:opacity-100 transition-opacity"
          >
            <XCircleIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}