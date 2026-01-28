import { useState, useEffect } from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import { getContactInfo } from '../lib/supabase'
import { mockContactInfo } from '../data/mockData'

export default function Contact() {
    const [contactInfo, setContactInfo] = useState(mockContactInfo)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getContactInfo()
                if (data) setContactInfo(data)
            } catch (error) {
                console.error('加载联系方式失败:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    // 解析 social_media（可能是字符串或数组）
    const socialMedia = typeof contactInfo.social_media === 'string'
        ? JSON.parse(contactInfo.social_media)
        : (contactInfo.social_media || [])

    return (
        <div className="min-h-screen bg-cream-100">
            <Header />

            {/* 页面顶部间距 */}
            <div className="pt-24" />

            {/* 页面标题 */}
            <section className="max-w-6xl mx-auto px-6 mb-12 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
                    📞 联系我们
                </h1>
                <p className="text-lg text-text-secondary">期待与您相遇</p>
            </section>

            {/* 联系方式卡片 */}
            <section className="max-w-4xl mx-auto px-6 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* 电话 */}
                    <a
                        href={`tel:${contactInfo.phone}`}
                        className="card flex flex-col items-center text-center p-8 hover:scale-105 transition-transform"
                    >
                        <div className="w-20 h-20 rounded-full bg-warm-orange/10 flex items-center justify-center text-4xl mb-4">
                            ☎️
                        </div>
                        <h3 className="font-semibold text-text-primary text-lg mb-2">电话咨询</h3>
                        <p className="text-warm-orange font-medium text-xl">{contactInfo.phone}</p>
                        <p className="text-text-muted text-sm mt-2">点击直接拨打</p>
                    </a>

                    {/* 微信 */}
                    <div className="card flex flex-col items-center text-center p-8">
                        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center text-4xl mb-4">
                            💬
                        </div>
                        <h3 className="font-semibold text-text-primary text-lg mb-2">微信咨询</h3>
                        {contactInfo.wechat_qr_url ? (
                            <div className="w-40 h-40 bg-white rounded-lg p-2 shadow-soft">
                                <img
                                    src={contactInfo.wechat_qr_url}
                                    alt="微信二维码"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ) : (
                            <div className="w-40 h-40 bg-cream-200 rounded-lg flex items-center justify-center">
                                <span className="text-text-muted">暂无二维码</span>
                            </div>
                        )}
                        <p className="text-text-muted text-sm mt-3">长按识别或截图保存</p>
                    </div>

                    {/* 邮箱 */}
                    <a
                        href={`mailto:${contactInfo.email}`}
                        className="card flex flex-col items-center text-center p-8 hover:scale-105 transition-transform"
                    >
                        <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center text-4xl mb-4">
                            📧
                        </div>
                        <h3 className="font-semibold text-text-primary text-lg mb-2">邮件联系</h3>
                        <p className="text-blue-600 font-medium">{contactInfo.email}</p>
                        <p className="text-text-muted text-sm mt-2">点击发送邮件</p>
                    </a>

                    {/* 社交媒体 */}
                    <div className="card flex flex-col items-center text-center p-8">
                        <div className="w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center text-4xl mb-4">
                            🔗
                        </div>
                        <h3 className="font-semibold text-text-primary text-lg mb-4">社交媒体</h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {socialMedia.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-cream-200 rounded-full flex items-center gap-2 hover:bg-wood-100 transition-colors"
                                >
                                    <span>{social.icon}</span>
                                    <span className="text-text-secondary text-sm">{social.platform}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 地址和地图 */}
            <section className="max-w-4xl mx-auto px-6 mb-16">
                <div className="card">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center text-2xl flex-shrink-0">
                            📍
                        </div>
                        <div>
                            <h3 className="font-semibold text-text-primary text-lg mb-1">地址</h3>
                            <p className="text-text-secondary">{contactInfo.address}</p>
                            {contactInfo.map_lat && contactInfo.map_lng && (
                                <a
                                    href={`https://uri.amap.com/marker?position=${contactInfo.map_lng},${contactInfo.map_lat}&name=辰奚小院`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-warm-orange text-sm mt-2 hover:underline"
                                >
                                    在高德地图中打开 →
                                </a>
                            )}
                        </div>
                    </div>

                    {/* 嵌入地图 */}
                    {contactInfo.map_lat && contactInfo.map_lng && (
                        <div className="w-full h-80 rounded-card overflow-hidden bg-cream-200">
                            <iframe
                                src={`https://www.openstreetmap.org/export/embed.html?bbox=${contactInfo.map_lng - 0.01}%2C${contactInfo.map_lat - 0.01}%2C${contactInfo.map_lng + 0.01}%2C${contactInfo.map_lat + 0.01}&layer=mapnik&marker=${contactInfo.map_lat}%2C${contactInfo.map_lng}`}
                                className="w-full h-full border-0"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    )}
                </div>
            </section>

            {/* 温馨提示 */}
            <section className="max-w-4xl mx-auto px-6 mb-16">
                <div className="bg-wood-100 rounded-card-lg p-6 md:p-8">
                    <h3 className="font-semibold text-text-primary text-lg mb-4 flex items-center gap-2">
                        <span>💡</span> 温馨提示
                    </h3>
                    <ul className="space-y-2 text-text-secondary">
                        <li className="flex items-start gap-2">
                            <span className="text-warm-orange">•</span>
                            <span>入住时间：14:00 后 | 退房时间：12:00 前</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-warm-orange">•</span>
                            <span>建议提前1-2天预约，节假日请提前一周咨询</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-warm-orange">•</span>
                            <span>可免费停车，车位有限请提前告知</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-warm-orange">•</span>
                            <span>欢迎携带宠物，请提前沟通</span>
                        </li>
                    </ul>
                </div>
            </section>

            <Footer />
        </div>
    )
}
