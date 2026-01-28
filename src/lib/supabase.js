import { createClient } from '@supabase/supabase-js'

// Supabase 配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase 配置缺失，请检查 .env 文件')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

// ============================================
// 数据获取函数
// ============================================

// 获取房间信息
export async function getRoomInfo() {
    const { data, error } = await supabase
        .from('room_info')
        .select('*')
        .single()

    if (error) {
        console.error('获取房间信息失败:', error)
        return null
    }
    return data
}

// 获取图片列表
export async function getImages(roomId = null) {
    let query = supabase
        .from('images')
        .select('*')
        .order('sort_order', { ascending: true })

    if (roomId) {
        query = query.eq('room_id', roomId)
    }

    const { data, error } = await query

    if (error) {
        console.error('获取图片列表失败:', error)
        return []
    }
    return data || []
}

// 获取视频列表
export async function getVideos(roomId = null) {
    let query = supabase
        .from('videos')
        .select('*')
        .order('sort_order', { ascending: true })

    if (roomId) {
        query = query.eq('room_id', roomId)
    }

    const { data, error } = await query

    if (error) {
        console.error('获取视频列表失败:', error)
        return []
    }
    return data || []
}

// 获取联系方式
export async function getContactInfo() {
    const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .single()

    if (error) {
        console.error('获取联系方式失败:', error)
        return null
    }
    return data
}

// ============================================
// 数据更新函数（后台管理）
// ============================================

// 更新房间信息
export async function updateRoomInfo(id, updates) {
    const { data, error } = await supabase
        .from('room_info')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return data
}

// 更新联系方式
export async function updateContactInfo(id, updates) {
    const { data, error } = await supabase
        .from('contact_info')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return data
}

// ============================================
// 图片管理函数
// ============================================

// 上传图片到 Storage
export async function uploadImage(file, roomId) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${roomId}/${Date.now()}.${fileExt}`

    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(`images/${fileName}`, file)

    if (uploadError) throw uploadError

    // 获取公开 URL
    const { data: urlData } = supabase.storage
        .from('media')
        .getPublicUrl(`images/${fileName}`)

    // 插入数据库记录
    const { data, error } = await supabase
        .from('images')
        .insert({
            room_id: roomId,
            file_url: urlData.publicUrl,
            file_name: file.name,
            sort_order: Date.now(),
            is_cover: false
        })
        .select()
        .single()

    if (error) throw error
    return data
}

// 删除图片
export async function deleteImage(id, fileUrl) {
    // 从 Storage 删除文件
    const path = fileUrl.split('/media/')[1]
    if (path) {
        await supabase.storage.from('media').remove([path])
    }

    // 从数据库删除记录
    const { error } = await supabase
        .from('images')
        .delete()
        .eq('id', id)

    if (error) throw error
}

// 设置封面图片
export async function setImageAsCover(id, roomId) {
    // 先取消所有封面
    await supabase
        .from('images')
        .update({ is_cover: false })
        .eq('room_id', roomId)

    // 设置新封面
    const { error } = await supabase
        .from('images')
        .update({ is_cover: true })
        .eq('id', id)

    if (error) throw error
}

// ============================================
// 视频管理函数
// ============================================

// 上传视频到 Storage
export async function uploadVideo(file, roomId, thumbnail = null) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${roomId}/${Date.now()}.${fileExt}`

    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(`videos/${fileName}`, file)

    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage
        .from('media')
        .getPublicUrl(`videos/${fileName}`)

    const { data, error } = await supabase
        .from('videos')
        .insert({
            room_id: roomId,
            file_url: urlData.publicUrl,
            file_name: file.name,
            file_size: Math.round(file.size / 1024 / 1024),
            thumbnail: thumbnail,
            is_primary: false,
            sort_order: Date.now()
        })
        .select()
        .single()

    if (error) throw error
    return data
}

// 删除视频
export async function deleteVideo(id, fileUrl) {
    const path = fileUrl.split('/media/')[1]
    if (path) {
        await supabase.storage.from('media').remove([path])
    }

    const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id)

    if (error) throw error
}

// 设置主视频
export async function setVideoAsPrimary(id, roomId) {
    await supabase
        .from('videos')
        .update({ is_primary: false })
        .eq('room_id', roomId)

    const { error } = await supabase
        .from('videos')
        .update({ is_primary: true })
        .eq('id', id)

    if (error) throw error
}

// ============================================
// 认证函数
// ============================================

// 登录
export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) throw error
    return data
}

// 登出
export async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
}

// 获取当前用户
export async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

// 监听认证状态变化
export function onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
}
