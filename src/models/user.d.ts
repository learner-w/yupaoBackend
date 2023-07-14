export type userType = {
    id? :number;
    userName?:string;
    userAccount:string;
    avatarUrl:string;
    gender?:number;
    profile?: string;
    tags?: string[];
    phone?:string;
    email?:string;
    userStatus?:number;
    userRole?:number;
    planetCode?:string;
    createTime?:Date;
    avatar?:Blob;
};