import { Member } from "./user";
import { MeLiked } from './product';

export interface BoArticle {
  _id: string;
  art_subject: string;
  art_content: string;
  art_image?: string | null;
  bo_id: string; 
  art_status: string;
  art_likes: number;
  art_views: number;
  mb_id: string;
  createdAt: Date;
  updatedAt: Date;
  member_data: Member;
  me_liked: MeLiked[]; 
}