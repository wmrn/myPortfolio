// オブジェクトの型を定義
export interface Item {
    src: string;
    alt?: string;
}

export interface ItemDetail {
    title: string;
    type: string;
    des: string;
    tech: string;
    img_list: Item[];
    youtube: string;
    code: string;
}