"use client";
import { CardProps } from '@/types';
import React from 'react'
import Image from 'next/image';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CustomButton from './CustomButton';



interface CardDetailsProps {
    isOpen: boolean;
    closeModal: () => void;
    data: CardProps;
}

const CardDetails = ({ isOpen, closeModal, data }: CardDetailsProps) => {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-25' />
                    </Transition.Child>
                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-70'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-70'
                            >
                                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh]
                                 overflow-y-auto transform rounded-2xl bg-white p-6 text-left
                                  shadow-2xl transition-all flex flex-col gap-5">
                                    <button
                                        type='button'
                                        className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 
                                        rounded-full'
                                        onClick={closeModal}
                                    >
                                        <Image
                                            src="/close.svg"
                                            alt="close"
                                            width={20}
                                            height={20}
                                            className='object-contain'
                                        />
                                    </button>
                                    <div className='flex-1 flex flex-col gap-3'>
                                        <div className='relative w-full h-40 bg-pattern 
                                        bg-cover bg-center rounded-lg'>
                                            <img src={data.image_url} alt='image'
                                                className='object-contain items-center mx-auto' width={140} />
                                        </div>
                                        <div className='flex-1 flex flex-col gap-2'>
                                            <h2 className='font-semibold text-xl capitalize text-center'>
                                                {data.position}
                                            </h2>
                                            <div className='mt-3 flex flex-wrap gap-4'>
                                                {Object.entries(data)
                                                    .filter(([key, _]) =>
                                                        key !== "id" && key !== "updatedAt"
                                                        && key !== "image_url" && key !== "level"
                                                        && key !== "position" && key !== "createdAt"
                                                    )
                                                    .map(([key, value]) => (
                                                        <div className='flex justify-between gap-5 w-full text-right' key={key}>
                                                            <h4 className='text-grey capitalize'>&nbsp;&nbsp;{key.split("_").join(" ").replace("Level Text", "Level")}</h4>
                                                            <p className='text-black-100 font-semibold text-justify'>{value}&nbsp;&nbsp;</p>
                                                        </div>
                                                    ))}

                                                <CustomButton title="Apply"
                                                    btnType='button'
                                                    containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
                                                    textStyles="text-white text-[14px] leading-[17px] font-bold"
                                                    handleClick={() => { }}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default CardDetails