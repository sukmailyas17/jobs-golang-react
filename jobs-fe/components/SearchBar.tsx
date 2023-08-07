"use client";

import { models } from "@/constant";
import Image from "next/image"
import SearchManufacturer from "./SearchManufacturer";
import React, { useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { Combobox, Transition } from '@headlessui/react'


const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
        <Image
            src="/magnifying-glass.svg"
            alt="magnifying glass"
            width={40}
            height={40}
        />
    </button>
)

const SearchBar = ({ title }: { title: string }) => {
    const [manufacturer, setManufacturer] = useState('')
    const [model, setModel] = useState('')
    const router = useRouter();
    const [query, setQuery] = useState('');
    const filteredManufacturers =
        query === "" ? models : models.filter((item) => (
            item.toLowerCase().replace(/\s+/g, "")
                .includes(query.toLowerCase().replace(/\s+/g, ""))
        ))
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (manufacturer === '' && model === '') {
            setManufacturer
        }
        updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase())
    }
    const updateSearchParams = (model: string, manufacturer: string) => {
        const searchParams = new URLSearchParams(window.location.search);
        if (model) {
            searchParams.set('model', model)
        } else {
            searchParams.delete('model')
        }

        if (manufacturer) {
            searchParams.set('manufacturer', manufacturer)
        } else {
            searchParams.delete('manufacturer')
        }
        const newPathname = `${window.location.pathname}?${searchParams.toString()}`
        router.push(newPathname)
    }
    return (
        <form className='searchbar' onSubmit={handleSearch}>
            <div className="searchbar__item">
                <SearchManufacturer manufacturer={manufacturer} setManufacturer={setManufacturer} />
                <SearchButton
                    otherClasses="sm:hidden"
                />
            </div>
            <div className="searchbar__item">
                {" "}
                <Combobox value={model} onChange={setModel} >
                    <div className='relative w-full'>
                        <Combobox.Button className={"absolute top-[14px]"}>
                            <Image
                                src="/checklist.svg"
                                alt={title}
                                width={20}
                                height={20}
                                className="ml-4"
                            />
                        </Combobox.Button>
                        <Combobox.Input
                            className="search-manufacturer__input"
                            placeholder='Position Level'
                            displayValue={(model: string) => model}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Transition as={Fragment}
                            leave='transition ease-in duration-100'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                            afterLeave={() => setQuery('')}
                        >
                            <Combobox.Options>
                                {filteredManufacturers.map((item) => (
                                    <Combobox.Option
                                        key={item}
                                        className={({ active }) => `
                                        relative search-manufacturer__option
                                        ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}
                                    `}
                                        value={item}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                    {item}
                                                </span>
                                                {selected ? (
                                                    <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'}`}>
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                )
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
                <SearchButton otherClasses="sm:hidden" />
            </div>
            <SearchButton otherClasses="max-sm:hidden" />
        </form>
    );
};

export default SearchBar