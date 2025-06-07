export default function ContactPage() {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <section className="w-full min-h-[70vh] bg-slate-900 lg:px-60 py-16 text-center">
          <h1 className="text-4xl text-amber-500 md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-base lg:text-xl text-white mb-10 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have a question, feedback, or a suggestion—drop us a message.
          </p>
          <form className="max-w-xl mx-auto text-left space-y-6">
            <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"/>
            <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"/>
            <textarea placeholder="Your Message" rows={5} className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-500" />
            <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold px-6 py-3 rounded-lg transition">
              Send Message
            </button>
          </form>
        </section>
      </div>
    )
  }
  