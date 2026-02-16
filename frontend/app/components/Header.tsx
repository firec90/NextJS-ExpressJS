interface HeaderProps {
  setIsOpen: (value: boolean) => void;
}

export default function Header({ setIsOpen }: HeaderProps) {
    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            {/* Hamburger (mobile only) */}
            <button onClick={() => setIsOpen(true)} className="md:hidden text-gray-700">
                ☰
            </button>
            <h1 className="text-lg font-semibold">Dashboard</h1>

            <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm text-gray-600">Halo, Admin</span>
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
        </header>
    );
}