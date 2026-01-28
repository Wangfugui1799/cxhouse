import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-wood-100 py-12 mt-16">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">🏡</span>
                            <span className="font-semibold text-lg text-text-primary">辰奚小院</span>
                        </Link>
                        <p className="text-text-secondary text-sm leading-relaxed">
                            让心灵在这里找到归属<br />
                            一处温馨的栖息之所
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-text-primary mb-4">快速链接</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-text-secondary hover:text-warm-orange transition-colors text-sm">
                                    首页
                                </Link>
                            </li>
                            <li>
                                <Link to="/room" className="text-text-secondary hover:text-warm-orange transition-colors text-sm">
                                    房间详情
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-text-secondary hover:text-warm-orange transition-colors text-sm">
                                    联系我们
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-text-primary mb-4">联系方式</h4>
                        <ul className="space-y-2 text-sm text-text-secondary">
                            <li className="flex items-center gap-2">
                                <span>📞</span>
                                <a href="tel:138-8888-8888" className="hover:text-warm-orange transition-colors">
                                    138-8888-8888
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📧</span>
                                <a href="mailto:hello@youranminsu.com" className="hover:text-warm-orange transition-colors">
                                    hello@youranminsu.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📍</span>
                                <span>杭州市西湖区龙井路88号</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-wood-200 mt-8 pt-6 text-center">
                    <p className="text-text-muted text-sm">
                        © {new Date().getFullYear()} 辰奚小院 · 保留所有权利
                    </p>
                </div>
            </div>
        </footer>
    )
}
