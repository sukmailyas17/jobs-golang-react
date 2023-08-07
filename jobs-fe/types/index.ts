import {MouseEventHandler} from "react";
export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?:
    MouseEventHandler<HTMLButtonElement>;
    btnType:"button"|"submit"
    textStyles?:string
    rightIcon?:string
    isDisabled?:boolean
}

export interface SearchManufacturerProps {
    manufacturer:string;
    setManufacturer:(manufacturer:string)=>void
}

export interface CardProps{
    id: number,
    position: string,
    level: string,
    level_text: string,
    image_url: string,
    qualification: string,
    experience: string,
    skills: string,
    benefit:string,
    description:string,
    type:string,
    createdAt:string,
    updatedAt:string,
}

export interface FilterProps{
    manufacturer: string,
    model: string,
}