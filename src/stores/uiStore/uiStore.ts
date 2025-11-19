import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark';
export type ModalType = 'createTask' | 'editTask' | 'deleteConfirm' | null;

interface ModalState {
  type: ModalType;
  data?: any;
}

interface UIState {
  // Theme
  theme: ThemeMode;
  
  // Modal
  modal: ModalState;
  
  // Sidebar
  isSidebarOpen: boolean;
  
  // Loading states
  globalLoading: boolean;
  loadingText: string | null;
  
  // Notifications
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
  }>;
  
  // Actions
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
  
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
  
  setGlobalLoading: (loading: boolean, text?: string | null) => void; // Исправьте тип
  
  addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set, get) => ({
      // Initial state
      theme: (localStorage.getItem('theme') as ThemeMode) || 'light',
      modal: { type: null },
      isSidebarOpen: false,
      globalLoading: false,
      loadingText: null,
      notifications: [],
      
      // Theme actions
      setTheme: (theme: ThemeMode) => {
        localStorage.setItem('theme', theme);
        set({ theme });
      },
      
      toggleTheme: () => {
        const { theme } = get();
        const newTheme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        set({ theme: newTheme });
      },
      
      // Modal actions
      openModal: (type: ModalType, data?: any) => {
        set({ modal: { type, data } });
      },
      
      closeModal: () => {
        set({ modal: { type: null } });
      },
      
      // Sidebar actions
      setSidebarOpen: (isSidebarOpen: boolean) => {
        set({ isSidebarOpen });
      },
      
      toggleSidebar: () => {
        const { isSidebarOpen } = get();
        set({ isSidebarOpen: !isSidebarOpen });
      },
      
      // Loading actions
      setGlobalLoading: (globalLoading: boolean, text: string | null = null) => {
        set({ globalLoading, loadingText: text });
      },
      
      // Notification actions
      addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newNotification = { ...notification, id };
        set((state) => ({
          notifications: [...state.notifications, newNotification]
        }));
        
        // Auto-remove notification after duration
        if (notification.duration !== 0) {
          const duration = notification.duration || 5000;
          setTimeout(() => {
            get().removeNotification(id);
          }, duration);
        }
      },
      
      removeNotification: (id: string) => {
        set((state) => ({
          notifications: state.notifications.filter(notification => notification.id !== id)
        }));
      },
      
      clearNotifications: () => {
        set({ notifications: [] });
      },
    }),
    {
      name: 'ui-store',
    }
  )
);