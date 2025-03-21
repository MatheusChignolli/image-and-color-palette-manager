import Link from 'next/link'

import paths from '@/constants/paths'

function Showcase() {
  return (
    <>
      <section className="grid grid-cols-2 px-10 py-20">
        <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col justify-center h-full">
          <h3 className="text-4xl font-bold">Smart Image Organization, Simplified</h3>
          <h4 className="text-2xl font-medium mt-1">
            Find, sort, and manage your images effortlessly.
          </h4>
          <p className="text-lg mt-8">
            No more clutter—our intelligent image manager automatically categorizes, tags,
            and organizes your visuals. Whether for work or personal use, access your
            images instantly with AI-powered search and smart filtering.
          </p>
          <Link href={paths.imageNew} className="mt-2">
            <button className="btn btn-primary">Start adding images</button>
          </Link>
        </div>
        <div className="col-span-2 md:col-span-1">
          <video
            src="/image-manager.mp4"
            autoPlay
            loop
            muted
            className="w-[800px] h-auto object-cover rounded-xl shadow-xl"
          />
        </div>
      </section>
      <section className="grid grid-cols-2 px-10 py-20">
        <div className="col-span-2 md:col-span-1 flex flex-col justify-center h-full">
          <h3 className="text-4xl font-bold">Your Perfect Color Palette, Instantly</h3>
          <h4 className="text-2xl font-medium mt-1">
            Create, organize, and refine color schemes with ease.
          </h4>
          <p className="text-lg mt-8">
            Effortlessly manage and experiment with colors using our intuitive palette
            manager. Save your favorite combinations, generate harmonious schemes, and
            apply them seamlessly to your projects. Whether you`re a designer, developer,
            or creator, find the perfect colors in seconds.
          </p>
          <Link href={paths.colorPaletteNew} className="mt-2">
            <button className="btn btn-primary">Start adding colors</button>
          </Link>
        </div>
        <div className="col-span-2 md:col-span-1">
          <video
            src="/color-palette-manager.mp4"
            autoPlay
            loop
            muted
            className="w-[800px] h-auto object-cover rounded-xl shadow-xl"
          />
        </div>
        {/* TODO: CREATE CTA TO COLOR PALLETTE */}
      </section>
    </>
  )
}

export default Showcase
