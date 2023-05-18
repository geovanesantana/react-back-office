import { useRef, useState } from 'react'
import { AiFillExclamationCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { EToastTypes, useToast } from '@/contexts/ToastContext'
import Logo from './Atoms/Logo'
import { ETypes, MessageCard } from './Atoms/MessageCard'

export default function UpdateProfile() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmRef = useRef<HTMLInputElement>(null)
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const { showTypedToast } = useToast()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()
    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      return setError('Passwords do not match')
    }

    const promises = []
    setLoading(true)
    setError('')

    if (emailRef.current?.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current?.value))
    }
    if (passwordRef.current?.value) {
      promises.push(updatePassword(passwordRef.current?.value))
    }

    Promise.all(promises)
      .then(() => {
        navigate('/')
        showTypedToast(EToastTypes.SUCCESS, 'Profile updated Successfully')
      })
      .catch(() => {
        setError('Failed to update account')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Logo className="mx-auto h-10 text-gray-900" />
            <h1 className="mt-6 text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Update Profile
            </h1>
          </div>
          <MessageCard message={error} type={ETypes.DANGER} visible={!!error} />
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="email-address"
              >
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                ref={emailRef}
                defaultValue={currentUser.email}
                required
                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-bg-blue-700 focus:border-bg-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email address"
              />
            </div>

            <div>
              <h3 className="py-1 text-sm text-gray-500 flex items-center ">
                <AiFillExclamationCircle className="mr-1" />
                Leave blank to keep the same
              </h3>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                ref={passwordRef}
                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-bg-blue-700 focus:border-bg-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Password"
              />
            </div>
            <div className="pb-2">
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                ref={passwordConfirmRef}
                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-bg-blue-700 focus:border-bg-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Confirm Password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-black hover:bg-black/80 transition-all duration-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
