import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/index'
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUserData,
} from '../store/usersSlice'
import { User } from '../types'
import { EToastTypes, useToast } from '../contexts/ToastContext'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const PAGE_SIZE = 6

export default function UserList() {
  const dispatch = useDispatch<any>()
  const { showTypedToast } = useToast()
  const [page, setPage] = useState(1)
  const [initializing, setInitializing] = useState(true)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const users = useSelector((state: RootState) => state.users.data)
  const totalUsers = useSelector((state: RootState) => state.users.total)
  const loading = useSelector((state: RootState) => state.users.loading)
  const error = useSelector((state: RootState) => state.users.error)
  const [showAddUserFields, setShowAddUserFields] = useState(false)
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    avatar: './truphone-logo.png',
  })
  const addUserDisabled = !newUser.first_name || !newUser.email

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchUsers(page))
      setInitializing(false)
    }
    fetchData()
  }, [dispatch, page])

  const handleEdit = (user: User) => {
    setEditingUser(user)
  }

  const handleSave = () => {
    if (editingUser) {
      dispatch(updateUserData(editingUser))
      setEditingUser(null)
      showTypedToast(EToastTypes.SUCCESS, 'User updated successfully')
    }
  }

  const handleCancel = () => {
    setEditingUser(null)
  }

  const handleDelete = (user: User) => {
    dispatch(deleteUser(user))
    showTypedToast(EToastTypes.SUCCESS, 'User deleted successfully')
  }

  const toggleAddUserFields = () => {
    setShowAddUserFields((prevState) => !prevState)
  }

  const handleAddUser = () => {
    dispatch(addUser(newUser))
    setNewUser({
      id: 0,
      first_name: '',
      last_name: '',
      email: '',
      avatar: './truphone-logo.png',
    })
    setShowAddUserFields(false)
    showTypedToast(EToastTypes.SUCCESS, 'User created successfully')
  }

  const handlePrevPage = () => {
    setPage((prevPage: number) => Math.max(prevPage - 1, 1))
  }

  const handleNextPage = () => {
    const totalPages = Math.ceil(totalUsers / PAGE_SIZE)
    setPage((prevPage: number) => Math.min(prevPage + 1, totalPages))
  }

  const renderPagination = () => {
    const totalPages = Math.ceil(totalUsers / PAGE_SIZE)
    const prevDisabled = page === 1
    const nextDisabled = page === totalPages

    return (
      <nav
        className="flex items-center justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Page{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {page}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalPages}
          </span>
        </span>
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <button
              onClick={handlePrevPage}
              disabled={prevDisabled}
              className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className={`h-5 w-5 text-current`} />
            </button>
          </li>
          <li>
            <button
              onClick={handleNextPage}
              disabled={nextDisabled}
              className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className={`h-5 w-5 text-current`} />
            </button>
          </li>
        </ul>
      </nav>
    )
  }

  const renderLoadingState = () => {
    return Array.from({ length: 6 }).map(() => (
      <tr
        key={Math.random()}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td className="items-center px-6 py-4">
          <div className="flex space-x-4 animate-pulse items-center">
            <div className="rounded-full bg-gray-200 h-10 w-10"></div>
            <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          </div>
        </td>
        <td className="items-center px-6 py-4">
          <div className="flex space-x-4">
            <div className="w-32 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </td>
        <td className="items-center px-6 py-4">
          <div className="flex space-x-4">
            <div className="w-20 h-3 bg-gray-300 rounded-full dark:bg-gray-600"></div>
            <div className="w-20 h-3 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </td>
      </tr>
    ))
  }

  return (
    <>
      <div className="text-right mt-6 sm:mt-2 ">
        <button
          onClick={toggleAddUserFields}
          className="inline-flex items-center text-white bg-black hover:bg-black/80 transition-all duration-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
        >
          Add User
        </button>
      </div>

      <div className="relative overflow-x-auto shadow sm:rounded-lg bg-white ring-1 border-blue-500 ring-gray-200 dark:ring-gray-700 mt-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading || initializing ? (
              renderLoadingState()
            ) : (
              <>
                {showAddUserFields && (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 last:border-none">
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={newUser.avatar}
                        alt={newUser.first_name}
                      />
                      <div className="pl-3">
                        <div className="flex text-base font-semibold">
                          <input
                            type="text"
                            className="mr-2 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-bg-blue-700 focus:border-bg-blue-700 block min-w-min p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={newUser.first_name}
                            onChange={(e) =>
                              setNewUser({
                                ...newUser,
                                first_name: e.target.value,
                              })
                            }
                          />
                          <input
                            type="text"
                            className="mr-2 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-bg-blue-700 focus:border-bg-blue-700 block min-w-min p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={newUser.last_name}
                            onChange={(e) =>
                              setNewUser({
                                ...newUser,
                                last_name: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <input
                        type="email"
                        className="mr-2 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-bg-blue-700 focus:border-bg-blue-700 block min-w-min p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={newUser.email}
                        onChange={(e) =>
                          setNewUser({ ...newUser, email: e.target.value })
                        }
                      />
                    </td>

                    <td className="px-6 py-4 sm:space-x-3">
                      <button
                        onClick={handleAddUser}
                        disabled={addUserDisabled}
                        className="font-medium text-green-700 dark:text-green-500 hover:underline disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        Create User
                      </button>
                    </td>
                  </tr>
                )}
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 last:border-none"
                  >
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={user.avatar}
                        alt={user.first_name}
                      />
                      <div className="pl-3">
                        <div className="flex text-base font-semibold">
                          {editingUser?.id === user.id ? (
                            <input
                              type="text"
                              className="mr-2 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-bg-blue-700 focus:border-bg-blue-700 block min-w-min p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={editingUser.first_name}
                              onChange={(e) =>
                                setEditingUser({
                                  ...editingUser,
                                  first_name: e.target.value,
                                })
                              }
                            />
                          ) : (
                            user.first_name
                          )}{' '}
                          {editingUser?.id === user.id ? (
                            <input
                              type="text"
                              className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-bg-blue-700 focus:border-bg-blue-700 block min-w-min p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={editingUser.last_name}
                              onChange={(e) =>
                                setEditingUser({
                                  ...editingUser,
                                  last_name: e.target.value,
                                })
                              }
                            />
                          ) : (
                            user.last_name
                          )}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      {editingUser?.id === user.id ? (
                        <input
                          type="text"
                          className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-bg-blue-700 focus:border-bg-blue-700 block min-w-min p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={editingUser.email}
                          onChange={(e) =>
                            setEditingUser({
                              ...editingUser,
                              email: e.target.value,
                            })
                          }
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="px-6 py-4 sm:space-x-3">
                      {editingUser?.id === user.id ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="font-medium text-green-700 dark:text-green-500 hover:underline"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(user)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(user)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      {renderPagination()}
    </>
  )
}
