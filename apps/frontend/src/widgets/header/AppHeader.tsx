import { useNavigate } from "react-router-dom"
import { AppButton } from "@/shared/ui/AppButton"

export const AppHeader = () => {
  const navigate = useNavigate()
  function handlerLogOut() {
    localStorage.removeItem('dahilace-token')
    navigate('/login')
  }
  return (
    <header className="p-4 bg-gray-700 text-white">
      <h1>I am header</h1>
      <AppButton onClick={handlerLogOut} variant="danger">Logout</AppButton>
    </header>
  )
}