import React, { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'

interface IToastProviderProps {
  children: JSX.Element
}

const ToastContext = React.createContext({})

export function useToast(): any {
  return useContext(ToastContext)
}

export enum EToastTypes {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export function ToastProvider({ children }: IToastProviderProps): JSX.Element {
  function showTypedToast(
    type: EToastTypes,
    message: string = '',
    autoClose = 5000,
    hideProgressBar = false,
    closeOnClick = true,
    pauseOnHover = true,
    draggable = true,
    progress = undefined
  ): void {
    toast[type](message, {
      position: 'bottom-right',
      autoClose: autoClose,
      hideProgressBar: hideProgressBar,
      closeOnClick: closeOnClick,
      pauseOnHover: pauseOnHover,
      draggable: draggable,
      progress: progress,
    })
  }

  function showToast(
    message: string = '',
    autoClose = 5000,
    hideProgressBar = false,
    closeOnClick = true,
    pauseOnHover = true,
    draggable = true,
    progress = undefined
  ) {
    toast(message, {
      position: 'bottom-right',
      autoClose: autoClose,
      hideProgressBar: hideProgressBar,
      closeOnClick: closeOnClick,
      pauseOnHover: pauseOnHover,
      draggable: draggable,
      progress: progress,
    })
  }

  function showError(message: string, code?: string) {
    toast.error(!!code ? `${code} - ${message}` : message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
  const value = {
    showError,
    showTypedToast,
    showToast,
  }

  return (
    <ToastContext.Provider value={value}>
      <ToastContainer
        toastClassName={
          'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
        }
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {children}
    </ToastContext.Provider>
  )
}
