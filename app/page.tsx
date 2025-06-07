
export default function Page(){
  return (
    <div className="h-screen bg-slate-950">
      
      <section className="w-full min-h-[70vh] bg-slate-900 lg:px-60 py-16 text-center">
        <h1 className=" text-4xl text-yellow-300 md:text-6xl font-bold mb-4">Unleash Your Voice. Create Your Blog</h1>
        <p className="text-base lg:text-xl text-white mb-6">
        Share your stories, ideas, and expertise with the world. Blogify makes blogging simple and beautiful.
        </p>
        <div className="flex gap-6 w-full justify-center">
          <button className="bg-slate-950 text-white px-6 py-2 rounded-lg">
            Start blogging now
          </button>
          <button className="bg-transparent border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-slate-950 transition">
            Learn more
          </button>
        </div>
        
      </section>
      <section className="w-full py-16 text-center">
        <h1 className=" text-4xl text-yellow-300 md:text-6xl font-bold mb-4">Featured blogs </h1>
      </section>
    </div>
  )
}