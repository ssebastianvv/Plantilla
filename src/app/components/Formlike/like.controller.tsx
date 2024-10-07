import { LikeRequest, LikeResponse } from '../../interface/likes';
import { URL_BASE } from "@/endpoint";
 const Base_URL = `${URL_BASE}auth/products/:id/like`
export const addLike = async (likeRequest: LikeRequest): Promise<LikeResponse> => {
  try {
    const response = await fetch(`${Base_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(likeRequest),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding like:', error);
    throw error;
  }
};

export const getLikesForPost = async (postId: number): Promise<LikeResponse> => { 
  try {
    const response = await fetch(`${Base_URL}post_id=${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching likes for post:', error);
    throw error;
  }
};
