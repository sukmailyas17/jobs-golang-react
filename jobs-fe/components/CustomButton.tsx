"use client";
import { CustomButtonProps } from "@/types";
import Image from "next/image"

const CustomButton = ({ title, containerStyles, handleClick, btnType, textStyles, rightIcon }: CustomButtonProps) => {
    return (
        <button
            disabled={false}
            type={btnType}
            className={`custom-btn ${containerStyles}`}
            onClick={handleClick}
        >
            <span className={`flex-1 ${textStyles}`}>
                {title}
            </span>
            {rightIcon && (
                <div className="relative w-6 h-6">
                    <Image alt="image" fill src={rightIcon} className="object-contain" />
                </div>
            )}
        </button>
    )
}

export default CustomButton