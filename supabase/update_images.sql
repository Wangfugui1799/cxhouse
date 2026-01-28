-- =============================================
-- 更新 images 表 - 使用 Supabase Storage URL
-- 在 Supabase Dashboard -> SQL Editor 中执行此脚本
-- 
-- 注意：执行此脚本前，请先在 Storage 中上传图片到 media/images/ 目录
-- =============================================

-- 先删除旧的图片记录
DELETE FROM images;

-- 获取 room_info 的 id
DO $$
DECLARE
  room_uuid UUID;
BEGIN
  SELECT id INTO room_uuid FROM room_info LIMIT 1;
  
  -- 插入新的图片记录（使用 Supabase Storage 公开 URL）
  INSERT INTO images (room_id, file_url, file_name, sort_order, is_cover) VALUES
  (room_uuid, 'https://doqsafycrragscfdmsxy.supabase.co/storage/v1/object/public/media/images/1.jpg', '民宿外观', 1, true),
  (room_uuid, 'https://doqsafycrragscfdmsxy.supabase.co/storage/v1/object/public/media/images/2.jpg', '温馨客厅', 2, false),
  (room_uuid, 'https://doqsafycrragscfdmsxy.supabase.co/storage/v1/object/public/media/images/3.jpg', '舒适卧室', 3, false),
  (room_uuid, 'https://doqsafycrragscfdmsxy.supabase.co/storage/v1/object/public/media/images/4.jpg', '精致装饰', 4, false),
  (room_uuid, 'https://doqsafycrragscfdmsxy.supabase.co/storage/v1/object/public/media/images/5.jpg', '阳台景观', 5, false),
  (room_uuid, 'https://doqsafycrragscfdmsxy.supabase.co/storage/v1/object/public/media/images/6.jpg', '独立卫浴', 6, false),
  (room_uuid, 'https://doqsafycrragscfdmsxy.supabase.co/storage/v1/object/public/media/images/7.jpg', '休闲角落', 7, false),
  (room_uuid, 'https://doqsafycrragscfdmsxy.supabase.co/storage/v1/object/public/media/images/8.jpg', '窗边风景', 8, false),
  (room_uuid, 'https://doqsafycrragscfdmsxy.supabase.co/storage/v1/object/public/media/images/9.jpg', '夜间氛围', 9, false);
END $$;

-- 验证插入结果
SELECT * FROM images ORDER BY sort_order;
