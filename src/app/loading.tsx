function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-gray-500 mt-4">Loading, please wait...</p>
    </div>
  )
}

export default LoadingPage
