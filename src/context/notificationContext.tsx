import { createContext, useContext} from 'react';
import { notification } from 'antd';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleFilled,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import { NotificationProviderProps } from '../types/interfaces';

export interface NotificationContextType {
  openNotification: (
    type: 'success' | 'error' | 'info' | 'warning',
    message: string,
    description: string,
  ) => void;
}


const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const openNotification = (
    type: 'success' | 'error' | 'info' | 'warning',
    message: string,
    description: string
  ) => {
    const iconMap = {
      success: <CheckCircleFilled style={{ color: '#52c41a' }} />,
      error: <CloseCircleFilled style={{ color: '#ff4d4f' }} />,
      info: <InfoCircleFilled style={{ color: '#1890ff' }} />,
      warning: <ExclamationCircleFilled style={{ color: '#faad14' }} />,
    };
  
    notification[type]({
      message,
      description,
      placement: 'top',
      icon: iconMap[type],
    });
  };

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
