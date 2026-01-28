import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockRoomInfo, mockImages, mockVideos, mockContactInfo } from '../../data/mockData'

export default function AdminDashboard() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('room')
    const [roomInfo, setRoomInfo] = useState(mockRoomInfo)
    const [images, setImages] = useState(mockImages)
    const [videos, setVideos] = useState(mockVideos)
    const [contactInfo, setContactInfo] = useState(mockContactInfo)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    // 检查登录状态
    useEffect(() => {
        const token = localStorage.getItem('admin_token')
        if (!token) {
            navigate('/admin')
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_email')
        navigate('/admin')
    }

    const handleSave = async () => {
        setIsSaving(true)
        // 模拟保存延迟
        await new Promise(resolve => setTimeout(resolve, 1000))
        setMessage({ type: 'success', text: '保存成功！' })
        setIsSaving(false)
        setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    }

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)
        const newImages = files.map((file, idx) => ({
            id: `new_${Date.now()}_${idx}`,
            file_url: URL.createObjectURL(file),
            file_name: file.name,
            sort_order: images.length + idx + 1,
            is_cover: false
        }))
        setImages([...images, ...newImages])
    }

    const handleDeleteImage = (id) => {
        setImages(images.filter(img => img.id !== id))
    }

    const handleSetCover = (id) => {
        setImages(images.map(img => ({
            ...img,
            is_cover: img.id === id
        })))
    }

    const tabs = [
        { id: 'room', label: '📝 房间信息', icon: '📝' },
        { id: 'images', label: '📸 图片管理', icon: '📸' },
        { id: 'videos', label: '🎬 视频管理', icon: '🎬' },
        { id: 'contact', label: '📞 联系方式', icon: '📞' },
    ]

    return (
        <div className="min-h-screen bg-cream-100">
            {/* Header */}
            <header className="bg-white shadow-soft sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🏡</span>
                        <span className="font-semibold text-lg text-text-primary">后台管理</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href="/"
                            target="_blank"
                            className="text-text-muted hover:text-warm-orange transition-colors text-sm"
                        >
                            👁️ 预览网站
                        </a>
                        <button
                            onClick={handleLogout}
                            className="text-text-muted hover:text-red-500 transition-colors text-sm"
                        >
                            退出登录
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-card-lg shadow-card p-4 sticky top-24">
                            <nav className="space-y-2">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full text-left px-4 py-3 rounded-card transition-all ${activeTab === tab.id
                                                ? 'bg-warm-orange text-white font-medium'
                                                : 'hover:bg-cream-200 text-text-secondary'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Message */}
                        {message.text && (
                            <div className={`mb-6 p-4 rounded-card ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        {/* Room Info Tab */}
                        {activeTab === 'room' && (
                            <div className="card">
                                <h2 className="text-xl font-semibold text-text-primary mb-6">房间信息编辑</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-2">
                                            房间名称
                                        </label>
                                        <input
                                            type="text"
                                            value={roomInfo.room_name}
                                            onChange={(e) => setRoomInfo({ ...roomInfo, room_name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-card border border-cream-300 focus:border-warm-orange focus:ring-2 focus:ring-warm-orange/20 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-2">
                                            标语 (Slogan)
                                        </label>
                                        <input
                                            type="text"
                                            value={roomInfo.slogan}
                                            onChange={(e) => setRoomInfo({ ...roomInfo, slogan: e.target.value })}
                                            className="w-full px-4 py-3 rounded-card border border-cream-300 focus:border-warm-orange focus:ring-2 focus:ring-warm-orange/20 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-2">
                                            详细描述 (支持HTML)
                                        </label>
                                        <textarea
                                            value={roomInfo.description}
                                            onChange={(e) => setRoomInfo({ ...roomInfo, description: e.target.value })}
                                            rows={12}
                                            className="w-full px-4 py-3 rounded-card border border-cream-300 focus:border-warm-orange focus:ring-2 focus:ring-warm-orange/20 outline-none transition-all font-mono text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Images Tab */}
                        {activeTab === 'images' && (
                            <div className="card">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-text-primary">
                                        图片管理 <span className="text-text-muted font-normal">({images.length}/20张)</span>
                                    </h2>
                                    <label className="btn-primary cursor-pointer">
                                        📤 上传图片
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <p className="text-text-muted text-sm mb-4">
                                    💡 提示：点击图片可设为封面，拖拽可调整顺序（MVP版仅支持删除）
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {images.map((image) => (
                                        <div key={image.id} className="relative group aspect-[4/3] rounded-card overflow-hidden">
                                            <img
                                                src={image.file_url}
                                                alt={image.file_name}
                                                className="w-full h-full object-cover"
                                            />
                                            {image.is_cover && (
                                                <span className="absolute top-2 left-2 px-2 py-1 bg-warm-orange text-white text-xs font-medium rounded-full">
                                                    封面
                                                </span>
                                            )}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleSetCover(image.id)}
                                                    className="p-2 bg-white rounded-full text-sm hover:bg-warm-orange hover:text-white transition-colors"
                                                    title="设为封面"
                                                >
                                                    ⭐
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteImage(image.id)}
                                                    className="p-2 bg-white rounded-full text-sm hover:bg-red-500 hover:text-white transition-colors"
                                                    title="删除"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Videos Tab */}
                        {activeTab === 'videos' && (
                            <div className="card">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-text-primary">
                                        视频管理 <span className="text-text-muted font-normal">({videos.length}/5个)</span>
                                    </h2>
                                    <label className="btn-primary cursor-pointer">
                                        📤 上传视频
                                        <input
                                            type="file"
                                            accept="video/*"
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <p className="text-text-muted text-sm mb-4">
                                    💡 单个视频最大500MB，支持MP4/MOV格式
                                </p>
                                <div className="space-y-4">
                                    {videos.map((video) => (
                                        <div key={video.id} className="flex items-center gap-4 p-4 bg-cream-100 rounded-card">
                                            <div className="w-32 h-20 rounded overflow-hidden flex-shrink-0">
                                                <img src={video.thumbnail} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-text-primary">{video.file_name}</p>
                                                <p className="text-text-muted text-sm">{video.file_size}MB</p>
                                            </div>
                                            {video.is_primary && (
                                                <span className="px-3 py-1 bg-warm-orange text-white text-sm rounded-full">
                                                    主视频
                                                </span>
                                            )}
                                            <div className="flex gap-2">
                                                <button className="p-2 hover:bg-cream-200 rounded transition-colors">
                                                    ▶️
                                                </button>
                                                <button className="p-2 hover:bg-red-100 rounded transition-colors text-red-500">
                                                    🗑️
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Contact Tab */}
                        {activeTab === 'contact' && (
                            <div className="card">
                                <h2 className="text-xl font-semibold text-text-primary mb-6">联系方式设置</h2>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-text-secondary mb-2">
                                                电话号码
                                            </label>
                                            <input
                                                type="text"
                                                value={contactInfo.phone}
                                                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                                                className="w-full px-4 py-3 rounded-card border border-cream-300 focus:border-warm-orange focus:ring-2 focus:ring-warm-orange/20 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-text-secondary mb-2">
                                                邮箱
                                            </label>
                                            <input
                                                type="email"
                                                value={contactInfo.email}
                                                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                                                className="w-full px-4 py-3 rounded-card border border-cream-300 focus:border-warm-orange focus:ring-2 focus:ring-warm-orange/20 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-2">
                                            地址
                                        </label>
                                        <input
                                            type="text"
                                            value={contactInfo.address}
                                            onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                                            className="w-full px-4 py-3 rounded-card border border-cream-300 focus:border-warm-orange focus:ring-2 focus:ring-warm-orange/20 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-secondary mb-2">
                                            微信二维码
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <div className="w-32 h-32 bg-white rounded-card shadow-soft p-2">
                                                <img src={contactInfo.wechat_qr_url} alt="微信二维码" className="w-full h-full object-contain" />
                                            </div>
                                            <label className="btn-secondary cursor-pointer">
                                                更换二维码
                                                <input type="file" accept="image/*" className="hidden" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Save Button */}
                        <div className="mt-6 flex justify-end gap-4">
                            <a
                                href="/"
                                target="_blank"
                                className="btn-secondary"
                            >
                                👁️ 预览效果
                            </a>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="btn-primary disabled:opacity-50"
                            >
                                {isSaving ? '保存中...' : '💾 保存更改'}
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
