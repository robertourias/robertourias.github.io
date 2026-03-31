export default function Contact() {
  return (
    <section className="py-20 px-8 bg-white dark:bg-zinc-900">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-black dark:text-zinc-50 mb-4">
          Contact
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Feel free to reach out!
        </p>
        <a
          href="mailto:email@example.com"
          className="inline-block px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full font-medium"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}