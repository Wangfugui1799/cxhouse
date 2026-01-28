-- =============================================
-- 更新民宿名称为 "辰奚小院"
-- 在 Supabase Dashboard -> SQL Editor 中执行此脚本
-- =============================================

-- 更新 room_info 表中的房间名称
UPDATE room_info
SET room_name = '辰奚小院'
WHERE room_name = '悠然小居';

-- 验证更新结果
SELECT * FROM room_info;
