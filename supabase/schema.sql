-- =============================================
-- 民宿展示官网 V1 - Supabase 数据库表结构
-- 在 Supabase Dashboard -> SQL Editor 中执行此脚本
-- =============================================

-- 1. 房间信息表
CREATE TABLE IF NOT EXISTS room_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_name TEXT NOT NULL DEFAULT '民宿名称',
  slogan TEXT DEFAULT '让心灵在这里找到归属',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 图片表
CREATE TABLE IF NOT EXISTS images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES room_info(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT,
  sort_order INTEGER DEFAULT 0,
  is_cover BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 视频表
CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES room_info(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  thumbnail TEXT,
  file_name TEXT,
  file_size INTEGER,
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 联系方式表
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT,
  wechat_qr_url TEXT,
  email TEXT,
  address TEXT,
  map_lat DECIMAL(10, 7),
  map_lng DECIMAL(10, 7),
  social_media JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. 为 room_info 添加更新时间触发器
DROP TRIGGER IF EXISTS update_room_info_updated_at ON room_info;
CREATE TRIGGER update_room_info_updated_at
  BEFORE UPDATE ON room_info
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 7. 为 contact_info 添加更新时间触发器
DROP TRIGGER IF EXISTS update_contact_info_updated_at ON contact_info;
CREATE TRIGGER update_contact_info_updated_at
  BEFORE UPDATE ON contact_info
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 插入初始数据
-- =============================================

-- 插入默认房间信息
INSERT INTO room_info (room_name, slogan, description) VALUES (
  '悠然小居',
  '让心灵在这里找到归属',
  '<p>这是一间充满温馨气息的民宿，采用北欧简约风格设计。整间房间面积约45平方米，拥有独立卫浴、智能家居设备和观景阳台。</p>
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
</ul>'
);

-- 插入默认联系方式
INSERT INTO contact_info (phone, email, address, map_lat, map_lng, social_media) VALUES (
  '138-8888-8888',
  'hello@youranminsu.com',
  '浙江省杭州市西湖区龙井路88号',
  30.2527,
  120.1099,
  '[{"platform": "小红书", "url": "https://xiaohongshu.com/user/xxx", "icon": "📕"}, {"platform": "抖音", "url": "https://douyin.com/user/xxx", "icon": "🎵"}, {"platform": "Instagram", "url": "https://instagram.com/xxx", "icon": "📸"}]'
);

-- =============================================
-- 启用 Row Level Security (RLS)
-- =============================================

-- 启用 RLS
ALTER TABLE room_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- 允许所有人读取（公开访问前端展示）
CREATE POLICY "Allow public read access on room_info" ON room_info
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on images" ON images
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on videos" ON videos
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on contact_info" ON contact_info
  FOR SELECT USING (true);

-- 允许认证用户进行写操作（后台管理）
CREATE POLICY "Allow authenticated users to modify room_info" ON room_info
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to modify images" ON images
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to modify videos" ON videos
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to modify contact_info" ON contact_info
  FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- 创建 Storage Bucket（需要在 Supabase Dashboard 手动创建）
-- =============================================
-- 1. 进入 Supabase Dashboard -> Storage
-- 2. 创建名为 "media" 的 bucket
-- 3. 设置为 public bucket（允许公开访问图片/视频）

-- 完成！表结构已创建成功
SELECT 'Database setup completed!' AS status;
