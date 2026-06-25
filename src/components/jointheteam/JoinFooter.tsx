export default function JoinFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-white/10 transition-colors duration-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="text-xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
          Denzo Studios
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300 text-center">
          Denzo Studios &copy; {currentYear}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
