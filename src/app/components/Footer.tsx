export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-lowest w-full py-10 md:py-12 px-6 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 max-w-7xl mx-auto font-body text-sm tracking-wide">
        <div className="text-outline">
          © {currentYear} Roberto Nicoletti
        </div>
        <div className="flex gap-6 md:gap-8">
          <a
            className="text-outline hover:text-primary transition-colors opacity-80 hover:opacity-100"
            href="#"
          >
            GitHub
          </a>
          <a
            className="text-outline hover:text-primary transition-colors opacity-80 hover:opacity-100"
            href="#"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}