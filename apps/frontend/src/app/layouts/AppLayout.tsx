import { Outlet } from 'react-router-dom'
import { AppHeader } from '@/widgets/header/AppHeader'
import { AppFooter } from '@/widgets/footer/AppFooter'

export const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />

      <main className="flex-1 p-4">
        <Outlet />
      </main>

      <AppFooter />
    </div>
  )
}