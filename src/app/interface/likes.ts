// src/interfaces/like.interfaces.ts

export interface LikeRequest {
    id: string,
    quantity: number,
    post_id:number
}
  
export interface LikeResponse {
    likes_count: number
    message: string,
    likes: [
        {
            id: number,
            quantity: number,
            post_id: number
        }
    ]
}
  