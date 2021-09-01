import { request } from './request'

// 推荐歌单
export function GetRecommendPlaylist (limit) {
  return request({
    url: '/personalized',
    params: {
      limit
    }
  })
}

// 获取轮播图
export function GetLatestAlbum () {
  return request({
    url: '/banner?type=0'
  })
}

// 获取最新音乐
export function GetLatestSong () {
  return request({
    url: '/personalized/newsong'
  })
}

// 获取获取歌词
export function GetLyric (id) {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}

// 获取音乐播放地址
export function GetSongUrl (id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}

// 获取热门歌手
export function GetGotSinger () {
  return request({
    url: '/top/artists?offset=0&limit=30'
  })
}
//  获取排行榜单
export function getniceSongList () {
  return request({
    url: '/toplist'
  })
}
//  获取排行榜单详情
export function getSongDetails () {
  return request({
    url: '/playlist/detail?id='
  })
}

// 获取热门歌单分类
export function GetHotPlaylist () {
  return request({
    url: '/playlist/hot'
  })
}
// 获取全部歌单 /playlist/catlist
export function GetAllPlaylist () {
  return request({
    url: '/playlist/catlist'
  })
}
// 获取歌单列表
export function GetPlaylistContent (order, cat, limit, offset) {
  return request({
    url: '/top/playlist',
    params: {
      order,
      cat,
      limit,
      offset
    }
  })
}
