export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-lowest w-full py-10 md:py-12 px-6 md:px-8" role="contentinfo">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 max-w-7xl mx-auto font-body text-sm tracking-wide">
        <div className="text-outline">
          <span>&copy; {currentYear} Roberto Nicoletti</span>
        </div>
        <nav aria-label="Links do rodapé">
          <ul className="flex gap-6 md:gap-8">
            <li>
              <a
                className="text-outline hover:text-primary transition-colors opacity-80 hover:opacity-100"
                href="https://github.com/robertourias"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                className="text-outline hover:text-primary transition-colors opacity-80 hover:opacity-100"
                href="https://www.linkedin.com/in/robertourias/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}