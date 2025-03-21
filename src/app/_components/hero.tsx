import Link from 'next/link'

import paths from '@/constants/paths'

function Hero() {
  return (
    <section className="hero min-h-[calc(100vh-64px)]">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold">Your Content, Perfectly Organized</h1>
          <p className="py-6">
            Effortlessly manage, categorize, and retrieve your content with our AI-powered
            organizer. Stay focused, collaborate seamlessly, and never lose track of
            important information again.
          </p>
          <Link href={paths.imageNew}>
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
