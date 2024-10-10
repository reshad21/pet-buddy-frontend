import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};


type TAuthor = {
    _id: string;
    email: string;
    password?: string;
    name: string;
    img: string;
    mobileNumber: string;
    role: string;
    status: string;
    followers: string[];
    following: string[];
    posts: string[];
    __v: number;
};

export type IPost = {
    _id: string;
    author: TAuthor;
    postImage?: string;
    title: string;
    content: string;
    category: string;
    isPremium: boolean;
    images: string[];
    upvotes: number;
    downvotes: number;
    comments: string[];
};


export interface ICategory {
    _id: string;
    name: string;
    postCount: number;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IUser {
    _id?: string;
    name: string;
    role: string;
    email: string;
    status: string;
    mobileNumber?: string;
    profilePhoto: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}