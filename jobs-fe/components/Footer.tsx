import Link from "next/link"
import Image from "next/image"
import { footerLinks } from "@/constant"

const Footer = () => {
    return (
        <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
            <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
                <div className="flex flex-col justify-start items-start gap-6">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={118}
                        height={18}
                        className="object-contain"
                    />
                    <p className="text-base text-gray-700">
                        sukma 2023
                        All rights reserved &copy;
                    </p>
                </div>
                <div className="footer__links">
                    {footerLinks.map((link) => (
                        <div key={link.title} className="footer__link">
                            <h3 className="font-bold">{link.title}</h3>
                            {link.links.map((item) => (
                                <Link
                                    key={item.caption}
                                    href={item.url}
                                >
                                    <Image src={item.icon}
                                        alt="logo"
                                        width={40}
                                        height={40}
                                        className="object-contain" />
                                    {item.caption}
                                </Link>
                            ))}
                        </div>
                    ))}

                </div>
            </div>
        </footer>
    )
}

export default Footer