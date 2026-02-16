interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export default function Sidebar({isOpen, setIsOpen}: SidebarProps) {
    return (
        <>
        {/* Overlay (mobile only) */}
        {isOpen && (
            <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            />
        )}
        <div className={`
          fixed md:static z-50
          w-64 bg-gray-900 text-white h-full
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0`}>
            <div className="p-4 text-xl font-bold border-b border-gray-700">
                My Dashboard
            </div>

            <nav className="p-4 space-y-2">
                <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
                    Dashboard
                </a>
                <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
                    Users
                </a>
                <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
                    Settings
                </a>
            </nav>
        </div>
        </>
    );
}