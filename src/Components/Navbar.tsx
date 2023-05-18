import { Disclosure, Menu } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { FiEdit2, FiLogOut } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import DropdownMenu, { IMenuOption } from './Atoms/DropdownMenu'
import { toggleDarkMode, selectDarkMode } from '../store/darkModeSlice'
import { useDispatch, useSelector } from 'react-redux'
import Logo from './Atoms/Logo'

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const dispatch = useDispatch()
  const { logout } = useAuth()
  const { showError } = useToast()
  const isDarkMode = useSelector(selectDarkMode)

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode())
  }

  const [navigation, setNavigation] = useState([
    { name: 'Dashboard', href: '/', current: false },
  ])

  useEffect(() => {
    const newObj = navigation.map((e) => {
      return {
        name: e.name,
        href: e.href,
        current: e.href === window.location.pathname,
      }
    })
    setNavigation(newObj)
  }, [window.location.pathname])

  const navigate = useNavigate()

  const menuOptions: Array<IMenuOption> = [
    {
      icon: <FiEdit2 />,
      label: 'Edit Profile',
      onClick: () => navigate('/update-profile'),
    },
    {
      icon: <FiLogOut />,
      label: `Log Out`,
      onClick: () => handleLogout(),
    },
  ]

  async function handleLogout(): Promise<void> {
    try {
      await logout()
      navigate('/login')
    } catch (err) {
      showError(err)
    }
  }

  const ProfilePicture = (
    <Menu.Button
      className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-400"
      data-testid="menu-profile"
    >
      <span className="sr-only">Open user menu</span>
      <img className="h-8 w-8 rounded-full" src="./avatar.png" alt="" />
    </Menu.Button>
  )
  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-800 shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400 dark:text-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <Logo className="h-7 text-gray-900 dark:text-white" />
                  </Link>
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8 h-16">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? 'border-slate-500 text-gray-900 dark:text-gray-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:border-slate-500 dark:hover:text-gray-400',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="absolute gap-4 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button onClick={handleDarkModeToggle} data-testid="dark-mode">
                  {isDarkMode ? (
                    <SunIcon className="h-6 w-6 text-white stroke-2" />
                  ) : (
                    <MoonIcon className="h-6 w-6 text-gray-700 stroke-2" />
                  )}
                </button>

                <DropdownMenu
                  dropDownButtonComponent={ProfilePicture}
                  options={menuOptions}
                />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-slate-50 border-slate-500 text-slate-700 dark:text-gray-400 dark:bg-gray-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:hover:border-slate-500 dark:hover:text-gray-400',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
