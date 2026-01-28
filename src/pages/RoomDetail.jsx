import { useState, useEffect } from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import { getRoomInfo, getImages, getVideos } from '../lib/supabase'
import { mockRoomInfo, mockImages, mockVideos } from '../data/mockData'

export default function RoomDetail() {
    const [selectedImage, setSelectedImage] = useState(null)
    const [currentVideoId, setCurrentVideoId] = useState(null)
    const [loading, setLoading] = useState(true)

    // 数据状态
    const [roomInfo, setRoomInfo] = useState(mockRoomInfo)
    const [images, setImages] = useState(mockImages)
    const [videos, setVideos] = useState(mockVideos)

    // 加载数据
    useEffect(() => {
        async function fetchData() {
            try {
                const [roomData, imagesData, videosData] = await Promise.all([
                    getRoomInfo(),
                    getImages(),
                    getVideos()
                ])

                if (roomData) setRoomInfo(roomData)
                if (imagesData?.length > 0) setImages(imagesData)
                if (videosData?.length > 0) {
                    setVideos(videosData)
                    setCurrentVideoId(videosData[0]?.id)
                }
            } catch (error) {
                console.error('加载数据失败:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (videos.length > 0 && !currentVideoId) {
            setCurrentVideoId(videos[0]?.id)
        }
    }, [videos, currentVideoId])

    const currentVideo = videos.find(v => v.id === currentVideoId) || videos[0]

    return (
        <div className="min-h-screen bg-cream-100">
            <Header />

            {/* 页面顶部间距 */}
            <div className="pt-24" />

            {/* 房间标题 */}
            <section className="max-w-6xl mx-auto px-6 mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
                    {roomInfo.room_name}
                </h1>
                <p className="text-lg text-text-secondary">{roomInfo.slogan}</p>
            </section>

            {/* 图片画廊 */}
            <section className="max-w-6xl mx-auto px-6 mb-16">
                <h2 className="section-title flex items-center gap-2">
                    <span>📸</span> 图片画廊
                    <span className="text-base font-normal text-text-muted">({images.length}张)</span>
                </h2>

                {images.length > 0 ? (
                    <div className="gallery-grid">
                        {images.map((image, idx) => (
                            <div
                                key={image.id}
                                className="relative aspect-[4/3] rounded-card overflow-hidden cursor-pointer group"
                                onClick={() => setSelectedImage(idx)}
                            >
                                <img
                                    src={image.file_url}
                                    alt={image.file_name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                                {image.is_cover && (
                                    <span className="absolute top-2 left-2 px-2 py-1 bg-warm-orange text-white text-xs font-medium rounded-full">
                                        封面
                                    </span>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white text-sm truncate">{image.file_name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-text-muted">
                        <p>暂无图片</p>
                    </div>
                )}
            </section>

            {/* 图片灯箱 */}
            {selectedImage !== null && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* 上一张 */}
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation()
                            setSelectedImage(prev => (prev - 1 + images.length) % images.length)
                        }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* 图片 */}
                    <img
                        src={images[selectedImage].file_url}
                        alt={images[selectedImage].file_name}
                        className="max-w-full max-h-[85vh] object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* 下一张 */}
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation()
                            setSelectedImage(prev => (prev + 1) % images.length)
                        }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* 计数器 */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                        {selectedImage + 1} / {images.length}
                    </div>
                </div>
            )}

            {/* 视频展示 */}
            <section className="max-w-6xl mx-auto px-6 mb-16">
                <h2 className="section-title flex items-center gap-2">
                    <span>🎬</span> 视频展示
                    <span className="text-base font-normal text-text-muted">({videos.length}个)</span>
                </h2>

                {videos.length > 0 ? (
                    <>
                        {/* 主视频播放器 */}
                        <div className="video-container mb-6">
                            <video
                                key={currentVideo?.id}
                                src={currentVideo?.file_url}
                                controls
                                className="w-full h-full"
                                poster={currentVideo?.thumbnail}
                            />
                        </div>

                        {/* 视频缩略图列表 */}
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                            {videos.map((video) => (
                                <div
                                    key={video.id}
                                    className={`relative aspect-video rounded-card overflow-hidden cursor-pointer group transition-all duration-300 ${video.id === currentVideoId
                                            ? 'ring-4 ring-warm-orange scale-105'
                                            : 'hover:scale-105'
                                        }`}
                                    onClick={() => setCurrentVideoId(video.id)}
                                >
                                    {video.thumbnail ? (
                                        <img
                                            src={video.thumbnail}
                                            alt={video.file_name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-cream-300 flex items-center justify-center">
                                            <span className="text-2xl">🎬</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                        <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-text-primary ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    {video.is_primary && (
                                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-warm-orange text-white text-xs font-medium rounded">
                                            主视频
                                        </span>
                                    )}
                                    <p className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent text-white text-xs truncate">
                                        {video.file_name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12 text-text-muted">
                        <p>暂无视频</p>
                    </div>
                )}
            </section>

            {/* 房间介绍 */}
            <section className="max-w-6xl mx-auto px-6 mb-16">
                <h2 className="section-title flex items-center gap-2">
                    <span>📝</span> 房间介绍
                </h2>

                <div className="card">
                    <div
                        className="prose prose-lg max-w-none text-text-secondary
                       prose-headings:text-text-primary prose-strong:text-text-primary
                       prose-ul:list-disc prose-ul:pl-6 prose-li:my-1"
                        dangerouslySetInnerHTML={{ __html: roomInfo.description || '暂无介绍' }}
                    />
                </div>
            </section>

            <Footer />
        </div>
    )
}
