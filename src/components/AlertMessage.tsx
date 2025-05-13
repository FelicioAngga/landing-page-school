// components/AlertMessage.tsx
import React from 'react';
import { Alert } from 'antd';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

interface AlertMessageProps {
  visible: boolean;
  message: string;
  description?: string;
  type?: AlertType;
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  visible,
  message,
  description,
  type = 'info',
  onClose,
}) => {
  return (
    <div
      className={`
        transition-all duration-300 ease-in-out transform
        ${visible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}
      `}
    >
      <Alert
        message={message}
        description={description}
        type={type}
        showIcon
        closable
        onClose={onClose}
      />
    </div>
  );
};

export default AlertMessage;
