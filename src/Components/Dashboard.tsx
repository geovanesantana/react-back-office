import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const { currentUser } = useAuth()
  const name = currentUser?.email.split('@')[0]

  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      <h1 className="text-gray-700 text-xl font-medium mb-1 capitalize">
        Hello {name} <span className="text-2xl">👋</span>
      </h1>
      <p className="text-gray-500 text-sm font-normal">
        A list of users retrieved from a reqres API.
      </p>
    </div>
  )
}
