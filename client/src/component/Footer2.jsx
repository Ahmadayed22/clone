

import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export function Footer2() {
    return (
        <Footer container className="bg-slate-900">
            <div className="w-full text-white">
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <div className="text-white">
                        <h1 className="text-3xl">Furniro</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                        <div className="">
                            <Footer.Title title="about" className="text-white" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#" className="text-white">Flowbite</Footer.Link>
                                <Footer.Link href="#" className="text-white">Tailwind CSS</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Follow us" className="text-white" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#" className="text-white">Github</Footer.Link>
                                <Footer.Link href="#" className="text-white">Discord</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Legal" className="text-white" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#" className="text-white">Privacy Policy</Footer.Link>
                                <Footer.Link href="#" className="text-white">Terms &amp; Conditions</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider className="bg-gray-700" /> {/* Added a lighter color for the divider */}
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href="#" by="Flowbite™" year={2022} className="text-white" />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <Footer.Icon href="#" icon={BsFacebook} className="text-white" />
                        <Footer.Icon href="#" icon={BsInstagram} className="text-white" />
                        <Footer.Icon href="#" icon={BsTwitter} className="text-white" />
                        <Footer.Icon href="#" icon={BsGithub} className="text-white" />
                        <Footer.Icon href="#" icon={BsDribbble} className="text-white" />
                    </div>
                </div>
            </div>
        </Footer>
    );
}