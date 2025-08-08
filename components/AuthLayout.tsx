// components/AuthLayout.tsx
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
        {/* Left Side */}
        <div className="md:w-1/2 w-full bg-white px-6 md:px-10 py-8 md:py-12 flex flex-col justify-center">
          {/* Logo */}
          <div className="mb-6">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">
              <span>©</span>
            </div>
          </div>

          {/* Text Content */}
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

          {/* Image */}
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

        {/* Right Side */}
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

// // components/AuthLayout.tsx
// import Image from "next/image";
// import Link from "next/link";
// import { Typewriter } from "react-simple-typewriter";

// export default function AuthLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6">
//       <div className="w-[98%] max-w-[1090px] bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden min-h-[85vh]">
//         {/* Left Side */}
//         <div className="md:w-1/2 w-full bg-white px-6 md:px-10 py-8 md:py-12 flex flex-col justify-center">
//           {/* Logo */}
//           <div className="mb-6">
//             <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">
//               <span>©</span>
//             </div>
//           </div>

//           {/* Text + Typewriter */}
//           <div className="text-left mb-8">
//             <p className="text-sm text-gray-500">Hi, welcome back.</p>
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug mt-1 h-[72px]">
//               <Typewriter
//                 words={[
//                   "Start your Crypto Portfolio today!",
//                   "Buy & Sell Crypto with Credit Card",
//                   "Get paid instantly via Bank Transfer",
//                   "... and many more to come!",
//                 ]}
//                 loop={0}
//                 cursor
//                 cursorStyle="|"
//                 typeSpeed={60}
//                 deleteSpeed={40}
//                 delaySpeed={2000}
//               />
//             </h2>
//           </div>

//           {/* Image */}
//           <div className="relative w-60 h-60 mx-auto">
//             <Image
//               src="/assets/cryptitan-character.png"
//               alt="Character"
//               layout="fill"
//               objectFit="contain"
//               priority
//             />
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="md:w-1/2 w-full px-6 md:px-10 py-10 flex flex-col justify-center">
//           <div className="flex justify-end text-sm text-gray-600 mb-6">
//             Don’t have an account?{" "}
//             <Link
//               href="/auth/register"
//               className="ml-1 text-green-600 hover:underline"
//             >
//               Get started
//             </Link>
//           </div>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }
