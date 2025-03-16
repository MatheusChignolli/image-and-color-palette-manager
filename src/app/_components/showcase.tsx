/* COMPONENT DESCRIPTION
 *
 * Landing page sections to show application modules:
 * - Image module.
 * - Color pallette module.
 *
 */

function Showcase() {
  return (
    <>
      <section className="grid grid-cols-2 px-10 py-20">
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-4xl font-bold">Smart Image Organization, Simplified</h3>
          <h4 className="text-2xl font-medium mt-1">
            Find, sort, and manage your images effortlessly.
          </h4>
          <p className="text-lg mt-8">
            No more clutter—our intelligent image manager automatically categorizes, tags,
            and organizes your visuals. Whether for work or personal use, access your
            images instantly with AI-powered search and smart filtering.
          </p>
        </div>
        <div className="col-span-2 md:col-span-1">GIF</div>
        {/* TODO: CREATE CTA TO IMAGES */}
      </section>
      <section className="grid grid-cols-2 px-10 py-20">
        <div className="col-span-2 md:col-span-1">
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
        </div>
        <div className="col-span-2 md:col-span-1">GIF</div>
        {/* TODO: CREATE CTA TO COLOR PALLETTE */}
      </section>
    </>
  )
}

export default Showcase
