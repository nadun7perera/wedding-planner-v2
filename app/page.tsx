import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center">
//       {/* Main photo */}
//       <div className="max-w-4xl w-full px-4">
//         <Image
//           src="/Nadun_Ova_1.jpg"  // replace with your actual image path
//           alt="Nadun and Ovadanee"
//           width={1200}
//           height={800}
//           className="rounded-md"
//           priority
//         />
//       </div>
//     </div>
//   );
// }

// components/WeddingPage.jsx (or similar)

export default function WeddingPage() {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#f8fcf8] group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7f3e7] px-10 py-3">
          <div className="flex items-center gap-4 text-[#0e1b0e]">
            <div className="size-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_6_319)">
                  <path
                    d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_6_319">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-[#0e1b0e] text-lg font-bold leading-tight tracking-[-0.015em]">
              Weddify
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-[#0e1b0e] text-sm font-medium leading-normal" href="#">
                Dashboard
              </a>
              <a className="text-[#0e1b0e] text-sm font-medium leading-normal" href="#">
                Vendors
              </a>
              <a className="text-[#0e1b0e] text-sm font-medium leading-normal" href="#">
                Budget
              </a>
              <a className="text-[#0e1b0e] text-sm font-medium leading-normal" href="#">
                Guests
              </a>
              <a className="text-[#0e1b0e] text-sm font-medium leading-normal" href="#">
                Checklist
              </a>
              <a className="text-[#0e1b0e] text-sm font-medium leading-normal" href="#">
                Inspiration
              </a>
            </div>
            <button
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#e7f3e7] text-[#0e1b0e] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
            >
              <div className="text-[#0e1b0e]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
                </svg>
              </div>
            </button>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBAlq4O6Ir3uUoMi29EtiAkkiWxsy-lcrMnbDuqwh9E33nIZxM7bsmvIR-ezkoi-QqJZnrjcPbKMQiHXWzaDJ5D2h_HK1sxAUHqk2zdBmnJHK2ypIjG8nWehWmsuqsEUgHL6BjHvyVfXQe3scKQbolstrrIqsHGZ3d5s20tXsZqpwOoxC_uyb-SENyi-OB91I00BNWlE0zyUIRgZKJgbPvoVF6IOVU_TXWDAXVVnNte1b37C3hG5PSNv0oQQHhWMGiVSkfBjkKCcrg")',
              }}
            ></div>
          </div>
        </header> */}



        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="text-center py-6 px-4 sm:px-6 md:px-8 border-gray-200">
              <h1 className="text-3xl sm:text-4xl font-serif tracking-wider">OVADANEE + NADUN</h1>
              <p className="mt-1 text-sm sm:text-base text-gray-500 uppercase">July 23/24, 2025 • Colombo, SL</p>
            </div>
            <div className="container">
              <div className="px-4 py-3">
                <div
                  className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-[#f8fcf8] rounded-xl min-h-250"
                  style={{
                    backgroundImage:
                      'url(/Nadun_Ova_1.jpg)',
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

