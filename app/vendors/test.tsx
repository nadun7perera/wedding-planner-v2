// src/pages/vendors/list.tsx
import { useEffect }               from 'react'
import { useAuthState }            from 'react-firebase-hooks/auth'
import { auth }                    from '../firebase'
import { useRouter }               from 'next/navigation'
import VendorList                  from './page'

export default function VendorListPage() {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.replace('/login')
  }, [user, loading, router])

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Vendor List</h1>
      <VendorList />
    </div>
  )
}
