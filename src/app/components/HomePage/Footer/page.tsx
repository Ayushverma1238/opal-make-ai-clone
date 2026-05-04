"use client"
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="bg-linear-to-br from-[#230044] to-[#3b0071] py-8">
      <div className=" w-[85%] mx-auto text-center">
        <div className="flex flex-col md:flex-row items-center justify-between py-20 gap-6">
          <h1 className='text-3xl font-bold text-white'>Realize your business’s full potential</h1>
          <div className="flex gap-6">
            <button className="py-4 rounded-xl px-6 bg-linear-to-r ring ring-white from-gray-800 to-gray-600">
              <Link className="text-lg" href="#">
                Talk to sales
              </Link>
            </button>
            <Link
              href="/register"
              className="inline-block py-4 px-6 rounded-xl text-lg text-white
                      bg-linear-to-r from-purple-700 to-pink-600
                      ring-1 ring-white
                      hover:shadow-[0_10px_30px_rgba(168,85,247,0.5),0_10px_30px_rgba(236,72,153,0.5)] transition duration-200"
            >
              Get Started Free
            </Link>
            
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="left flex flex-col items-start w-[40%] gap-4">
                <h2 className='text-white font-semibold'>Subscribe to new updates*</h2>
                <input type="email" placeholder="Your email address" className="py-3 px-5 w-[70%] text-gray-400 placeholder:text-gray-500 bg-white rounded-xl outline-none" />
                <p className="text-gray-200  text-start">
                  * By submitting this form, you confirm that you agree to the storing and processing of your personal data as described in our <a className='underline'> Privacy Notice.</a>
                </p>
                <Link href="/subscribe" className="text-white flex gap-1 font-bold hover:scale-105 hover:underline">
                  SUBSCRIBE <MoveRight/>
                </Link>
            </div>
            <div className="right w-[60%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 transition-all duration-200">
                <div className="flex flex-col items-start gap-4">
                    <h1 className="text-gray-300 font-bold">Make</h1>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Product</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Make + AI</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Make AI Agents</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Apps</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Make Grid</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Pricing</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Get Demo</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Enterprise</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Status</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Waves</Link>
                </div>

                <div className="flex flex-col items-start gap-4">
                    <h1 className="text-gray-300 font-bold">Solutions</h1>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">How-to-guides</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Success stories</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Templates</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Partner directory</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Idea exchange</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Automation Tools</Link>
                </div>

                <div className="flex flex-col items-start gap-4">
                    <h1 className="text-gray-300 font-bold">Resources</h1>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Make Academy</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Make Community</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Help Center</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Developers Hub</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Blog</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Webinars</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Affliate</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Partners</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Secutiry</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">On-prem agents</Link>
                </div>
                <div className="flex flex-col items-start gap-4">
                    <h1 className="text-gray-300 font-bold">Company</h1>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">About</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Craeers</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Contact us</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Press</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Terms & conditions</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Privacy and GDPR</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Disclaimer</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Bug Bounty</Link>
                    <Link href="#" className="text-gray-400 font-semibold text-sm hover:text-white">Ethics & Compliance</Link>
            </div>
            </div>
            
            
        </div>
        <div className="flex justify-between items-center py-20 gap-4">
                <p className="text-gray-200 font-semibold">© 2026 Opal. All rights reserved.</p>
                <div className="flex gap-4">
                    <Link href="#" className="text-gray-200 text-3xl hover:text-white"><FaFacebook /></Link>
                    <Link href="#" className="text-gray-200 text-3xl hover:text-white"><FaInstagram /></Link>
                    <Link href="#" className="text-gray-200 text-3xl hover:text-white"><FaTwitter /></Link>
                    <Link href="#" className="text-gray-200 text-3xl hover:text-white"><FaLinkedin /></Link>
                    <Link href="#" className="text-gray-200 text-3xl hover:text-white"><FaYoutube /></Link>
                </div>
            </div>
      </div>
    </div>
  );
};

export default Footer;
