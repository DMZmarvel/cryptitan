import Image from "next/image";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

interface AuthLayoutProps {
  children: React.ReactNode;
  leftTitle?: string;
  leftSubtitle?: string;
  leftImage?: string;
  rightTopText?: string;
  rightTopLink?: string;
  rightTopLinkText?: string;
}

export default function AuthLayout({
  children,
  leftTitle = "Start your Crypto Portfolio today!|Buy & Sell Crypto with Credit Card|Get paid instantly via Bank Transfer|... and many more to come!",
  leftSubtitle = "Hi, welcome back.",
  leftImage = "/assets/cryptitan-character.png",
  rightTopText = "Don’t have an account?",
  rightTopLink = "/auth/register",
  rightTopLinkText = "Get started",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6">
      <div className="w-[95%] max-w-[1080px] bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden min-h-[85vh]">
        <div className="md:w-1/2 w-full bg-white px-6 md:px-10 py-8 md:py-12 flex flex-col justify-center">
          <div className="mb-6">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">
              <span>©</span>
            </div>
          </div>

          <div className="text-left mb-6">
            {leftSubtitle && (
              <p className="text-sm  text-gray-500">{leftSubtitle}</p>
            )}
            {leftTitle && (
              <h2 className="text-2xl h-[100px] md:text-3xl font-bold text-gray-800 leading-snug mt-1">
                {leftTitle.includes("|") ? (
                  <Typewriter
                    words={leftTitle.split("|")}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={60}
                    deleteSpeed={40}
                    delaySpeed={2000}
                  />
                ) : (
                  leftTitle
                )}
              </h2>
            )}
          </div>

          {leftImage && (
            <div className="relative w-60 h-60 mx-auto">
              <Image
                src={leftImage}
                alt="Illustration"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          )}
        </div>

        <div className="md:w-1/2 w-full px-6 md:px-10 py-10 flex flex-col justify-center">
          <div className="flex justify-end text-sm text-gray-600 mb-6">
            {rightTopText}{" "}
            <Link
              href={rightTopLink}
              className="ml-1 text-green-600 hover:underline"
            >
              {rightTopLinkText}
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
