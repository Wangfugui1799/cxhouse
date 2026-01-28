import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // 模拟登录 - 实际项目中使用 Supabase Auth
        // 测试账号：admin@minsu.com / admin123
        if (email === 'admin@minsu.com' && password === 'admin123') {
            localStorage.setItem('admin_token', 'mock_token_' + Date.now())
            localStorage.setItem('admin_email', email)
            navigate('/admin/dashboard')
        } else {
            setError('邮箱或密码错误')
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-cream-100 flex items-center justify-center px-6">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <span className="text-5xl">🏡</span>
                    <h1 className="text-2xl font-bold text-text-primary mt-4">后台管理</h1>
                    <p className="text-text-muted mt-2">悠然小居 · 内容管理系统</p>
                </div>

                {/* Login Card */}
                <div className="card">
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">
                                邮箱
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-card border border-cream-300 focus:border-warm-orange focus:ring-2 focus:ring-warm-orange/20 outline-none transition-all"
                                placeholder="admin@minsu.com"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-2">
                                密码
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-card border border-cream-300 focus:border-warm-orange focus:ring-2 focus:ring-warm-orange/20 outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-card">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? '登录中...' : '登录'}
                        </button>
                    </form>

                    {/* Demo Hint */}
                    <div className="mt-6 p-4 bg-cream-200 rounded-card">
                        <p className="text-text-muted text-sm text-center">
                            <span className="font-medium">演示账号：</span><br />
                            邮箱：admin@minsu.com<br />
                            密码：admin123
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <a href="/" className="text-text-muted text-sm hover:text-warm-orange transition-colors">
                        ← 返回首页
                    </a>
                </div>
            </div>
        </div>
    )
}
