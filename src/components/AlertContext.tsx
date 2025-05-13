import React, { createContext, useContext, useState } from 'react';
import AlertMessage, { AlertType } from './AlertMessage';

interface AlertState {
  visible: boolean;
  message: string;
  description?: string;
  type: AlertType;
}

interface AlertContextProps {
  showAlert: (params: {
    message: string;
    description?: string;
    type?: AlertType;
  }) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<AlertState>({
    visible: false,
    message: '',
    description: '',
    type: 'info',
  });

  const showAlert = ({ message, description, type = 'info' }: Partial<AlertState>) => {
    setAlert({ visible: true, message: message || "", description, type });
    setTimeout(() => setAlert((prev) => ({ ...prev, visible: false })), 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert.visible && (
        <div className="fixed top-4 right-0 z-50 w-full max-w-md px-4">
          <AlertMessage
            visible={alert.visible}
            message={alert.message}
            description={alert.description}
            type={alert.type}
            closable
            onClose={() => setAlert((prev) => ({ ...prev, visible: false }))}
          />
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within an AlertProvider');
  return context;
};
