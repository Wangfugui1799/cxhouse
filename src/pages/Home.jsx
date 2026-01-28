import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import { getRoomInfo, getVideos, getContactInfo } from '../lib/supabase'
import { mockRoomInfo, mockVideos, mockContactInfo } from '../data/mockData'

export default function Home() {
    const videoRef = useRef(null)
    const [isVideoPlaying, setIsVideoPlaying] = useState(true)
    const [isMuted, setIsMuted] = useState(true)
    const [isHeaderTransparent, setIsHeaderTransparent] = useState(true)

    // 数据状态
    const [roomInfo, setRoomInfo] = useState(mockRoomInfo)
    const [videos, setVideos] = useState(mockVideos)
    const [contactInfo, setContactInfo] = useState(mockContactInfo)
    const [loading, setLoading] = useState(true)

    // 加载数据
    useEffect(() => {
        async function fetchData() {
            try {
                const [roomData, videosData, contactData] = await Promise.all([
                    getRoomInfo(),
                    getVideos(),
                    getContactInfo()
                ])

                if (roomData) setRoomInfo(roomData)
                if (videosData?.length > 0) setVideos(videosData)
                if (contactData) setContactInfo(contactData)
            } catch (error) {
                console.error('加载数据失败:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const primaryVideo = videos.find(v => v.is_primary) || videos[0]

    // 监听滚动，改变导航栏样式
    useEffect(() => {
        const handleScroll = () => {
            setIsHeaderTransparent(window.scrollY < 100)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const togglePlay = () => {
        if (videoRef.current) {
            if (isVideoPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsVideoPlaying(!isVideoPlaying)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    return (
        <div className="min-h-screen bg-cream-100">
            <Header transparent={isHeaderTransparent} />

            {/* Hero Section - 全屏视频 */}
            <section className="relative h-screen w-full overflow-hidden">
                {/* 视频背景 */}
                <div className="absolute inset-0">
                    {primaryVideo?.file_url ? (
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            src={primaryVideo.file_url}
                            autoPlay
                            loop
                            muted={isMuted}
                            playsInline
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-wood-300 to-warm-orange flex items-center justify-center">
                            <span className="text-6xl">🏡</span>
                        </div>
                    )}
                    {/* 渐变遮罩 */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                </div>

                {/* 内容 */}
                <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
                        {roomInfo.room_name}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        {roomInfo.slogan}
                    </p>
                    <Link
                        to="/room"
                        className="btn-primary text-lg animate-fade-in"
                        style={{ animationDelay: '0.4s' }}
                    >
                        📖 查看房间详情
                    </Link>
                </div>

                {/* 视频控制按钮 */}
                {primaryVideo?.file_url && (
                    <div className="absolute bottom-8 right-8 flex gap-3">
                        <button
                            onClick={togglePlay}
                            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
                        >
                            {isVideoPlaying ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>
                        <button
                            onClick={toggleMute}
                            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
                        >
                            {isMuted ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                                </svg>
                            )}
                        </button>
                    </div>
                )}

                {/* 向下滚动提示 */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* 快速联系 Section */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="section-title text-center mb-12">📞 快速联系</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 电话 */}
                        <a
                            href={`tel:${contactInfo.phone}`}
                            className="card flex items-center gap-4 hover:scale-105"
                        >
                            <div className="w-14 h-14 rounded-full bg-warm-orange/10 flex items-center justify-center text-2xl">
                                ☎️
                            </div>
                            <div>
                                <p className="text-text-muted text-sm">电话咨询</p>
                                <p className="font-semibold text-text-primary">{contactInfo.phone}</p>
                            </div>
                        </a>

                        {/* 微信 */}
                        <Link
                            to="/contact"
                            className="card flex items-center gap-4 hover:scale-105"
                        >
                            <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center text-2xl">
                                💬
                            </div>
                            <div>
                                <p className="text-text-muted text-sm">微信咨询</p>
                                <p className="font-semibold text-text-primary">扫码添加</p>
                            </div>
                        </Link>

                        {/* 位置 */}
                        <Link
                            to="/contact"
                            className="card flex items-center gap-4 hover:scale-105"
                        >
                            <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-2xl">
                                📍
                            </div>
                            <div>
                                <p className="text-text-muted text-sm">查看位置</p>
                                <p className="font-semibold text-text-primary">导航前往</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 特色亮点 Section */}
            <section className="py-16 bg-cream-100">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="section-title text-center mb-12">✨ 房间亮点</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: '🌅', title: '落地窗', desc: '270°全景视野' },
                            { icon: '🍵', title: '榻榻米茶室', desc: '静谧阅读空间' },
                            { icon: '🐱', title: '宠物友好', desc: '欢迎携宠入住' },
                            { icon: '🎬', title: '影音设备', desc: '投影仪+音响' },
                        ].map((item, idx) => (
                            <div key={idx} className="card text-center">
                                <div className="text-4xl mb-3">{item.icon}</div>
                                <h3 className="font-semibold text-text-primary mb-1">{item.title}</h3>
                                <p className="text-text-muted text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link to="/room" className="btn-secondary">
                            查看更多详情 →
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
