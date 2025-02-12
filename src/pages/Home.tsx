import Button from '@mui/material/Button'

function Home() {

  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <img src='/home.png' alt='home' className="h-150" />
      <p className="text-lg md:text-2xl text-gray-300 mb-8 text-center max-w-2xl -my-65">
        Your adventure begins here. Generate custom trips and track your country visits all in one place.
      </p>
      <div className="flex gap-3">
        <Button 
          color="secondary"
          className="hover:scale-105" 
          size='large'
          onClick={() => window.location.href = "/create"}
        >
          Get Started
        </Button>
      </div>
    </div>
  )
}

export default Home