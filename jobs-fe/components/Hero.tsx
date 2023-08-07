"use client";
import Image from "next/image"
import CustomButton from './CustomButton'

const Hero = () => {
    const media = '/hero.png'
    const timeStamp = new Date().getTime()
    const handleScroll = () => {

    }
    return (
        <div className="hero">
            <div className="flex-1 pt-36 padding-x">
                <h1 className="hero__title">
                    Join Our Team
                </h1>
                <p className="hero__subtitle">
                    Looking to be the best? explore with us
                </p>
                <CustomButton
                    title="Explore"
                    containerStyles="bg-primary-blue text-white rounded-full mt-10"
                    handleClick={handleScroll}
                    btnType="button"
                />
                <div className="hero__image-container">
                    <div className="hero__image">
                        <Image src={`${media}?${timeStamp}`} alt=" hero" fill className="object-contain" />
                        <div className="hero__image-overlay" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero