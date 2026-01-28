import { Link } from 'react-router-dom'

export default function Header({ transparent = false }) {
    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${transparent ? 'bg-transparent' : 'bg-white/90 backdrop-blur-md shadow-soft'
            }`}>
            <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-2xl">🏡</span>
                    <span className={`font-semibold text-lg ${transparent ? 'text-white' : 'text-text-primary'}`}>
                        辰奚小院
                    </span>
                </Link>

                {/* Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        to="/"
                        className={`font-medium transition-colors hover:text-warm-orange ${transparent ? 'text-white/90' : 'text-text-secondary'
                            }`}
                    >
                        首页
                    </Link>
                    <Link
                        to="/room"
                        className={`font-medium transition-colors hover:text-warm-orange ${transparent ? 'text-white/90' : 'text-text-secondary'
                            }`}
                    >
                        房间详情
                    </Link>
                    <Link
                        to="/contact"
                        className={`font-medium transition-colors hover:text-warm-orange ${transparent ? 'text-white/90' : 'text-text-secondary'
                            }`}
                    >
                        联系我们
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2 rounded-lg hover:bg-cream-200 transition-colors">
                    <svg className={`w-6 h-6 ${transparent ? 'text-white' : 'text-text-primary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </nav>
        </header>
    )
}
