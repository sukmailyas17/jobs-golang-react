"use client";
import { useState } from 'react'
import Image from 'next/image';
import { CardProps } from '@/types';
import CustomButton from './CustomButton';
import { CardDetails } from '.';

interface DataCardProps {
    data: CardProps
}

const Card = ({ data }: DataCardProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const {
        position,
        image_url,
        description } = data;
    return (
        <div className='car-card group'>
            <div className='car-card__content'>
                <h2 className='car-card__content-title font-extrabold'>
                    {position}
                </h2>
            </div>
            <div className='relative w-full h-40 my-3 object-contain'>
                <img src={image_url} alt='image'
                    className='object-contain items-center mx-auto' width={170} />
            </div>
            <p className='flex mt-6 text-[32px] font-extrabold'>
                <span className='self-start text-[14px] font-semibold line-clamp-2'>{description}</span>
            </p>
            <div className='relative flex w-full mt-2'>
                <div className='car-card__btn-container'>
                    <CustomButton title="view detail"
                        btnType='button'
                        containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
                        textStyles="text-white text-[14px] leading-[17px] font-bold"
                        rightIcon="/right-arrow.svg"
                        handleClick={() => setIsOpen(true)}
                    />

                </div>
            </div>
            <CardDetails
                isOpen={isOpen} closeModal={() => setIsOpen(false)}
                data={data}
            />
        </div>
    )
}

export default Card