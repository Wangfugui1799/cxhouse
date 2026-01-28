// 模拟数据 - 用于 UI 开发阶段
export const mockRoomInfo = {
    id: '1',
    room_name: '辰奚小院',
    slogan: '让心灵在这里找到归属',
    description: `
    <p>这是一间充满温馨气息的民宿，采用北欧简约风格设计。整间房间面积约45平方米，拥有独立卫浴、智能家居设备和观景阳台。</p>
    <p><strong>房间特色：</strong></p>
    <ul>
      <li>落地窗：270°全景视野，清晨可欣赏日出美景</li>
      <li>榻榻米茶室：静谧角落，品茶读书的理想空间</li>
      <li>猫咪友好：欢迎携带宠物入住</li>
      <li>智能家居：语音控制灯光、窗帘、空调</li>
    </ul>
    <p><strong>设施配置：</strong></p>
    <ul>
      <li>舒适大床 (1.8m × 2m)</li>
      <li>独立卫浴（干湿分离）</li>
      <li>迷你厨房（冰箱、微波炉、咖啡机）</li>
      <li>高速 WiFi</li>
      <li>投影仪 + 音响系统</li>
    </ul>
  `,
    created_at: '2024-01-01',
    updated_at: '2024-01-15'
}

export const mockImages = [
    { id: '1', file_url: '/images/1.jpg', file_name: '民宿外观', sort_order: 1, is_cover: true },
    { id: '2', file_url: '/images/2.jpg', file_name: '温馨客厅', sort_order: 2, is_cover: false },
    { id: '3', file_url: '/images/3.jpg', file_name: '舒适卧室', sort_order: 3, is_cover: false },
    { id: '4', file_url: '/images/4.jpg', file_name: '精致装饰', sort_order: 4, is_cover: false },
    { id: '5', file_url: '/images/5.jpg', file_name: '阳台景观', sort_order: 5, is_cover: false },
    { id: '6', file_url: '/images/6.jpg', file_name: '独立卫浴', sort_order: 6, is_cover: false },
    { id: '7', file_url: '/images/7.jpg', file_name: '休闲角落', sort_order: 7, is_cover: false },
    { id: '8', file_url: '/images/8.jpg', file_name: '窗边风景', sort_order: 8, is_cover: false },
    { id: '9', file_url: '/images/9.jpg', file_name: '夜间氛围', sort_order: 9, is_cover: false },
]

export const mockVideos = [
    {
        id: '1',
        file_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
        file_name: '房间全景漫游',
        file_size: 245,
        is_primary: true,
        sort_order: 1
    },
    {
        id: '2',
        file_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
        file_name: '卧室介绍',
        file_size: 180,
        is_primary: false,
        sort_order: 2
    },
    {
        id: '3',
        file_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400',
        file_name: '阳台日落实拍',
        file_size: 120,
        is_primary: false,
        sort_order: 3
    },
]

export const mockContactInfo = {
    id: '1',
    phone: '138-8888-8888',
    wechat_qr_url: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WeChat:minsu_host',
    email: 'hello@youranminsu.com',
    address: '浙江省杭州市西湖区龙井路88号',
    map_lat: 30.2527,
    map_lng: 120.1099,
    social_media: [
        { platform: '小红书', url: 'https://xiaohongshu.com/user/xxx', icon: '📕' },
        { platform: '抖音', url: 'https://douyin.com/user/xxx', icon: '🎵' },
        { platform: 'Instagram', url: 'https://instagram.com/xxx', icon: '📸' },
    ],
    updated_at: '2024-01-15'
}
