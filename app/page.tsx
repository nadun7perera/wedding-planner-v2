export default function WeddingPage() {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#f8fcf8] overflow-x-hidden font-['Plus_Jakarta_Sans','Noto_Sans',sans-serif]"
    >
      <div className="flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5 px-4 sm:px-6 md:px-8 lg:px-40">
          <div className="flex flex-col w-full max-w-[960px]">
            <div className="text-center py-6 border-b border-gray-200">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-wider">
                OVADANEE + NADUN
              </h1>
              <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-500 uppercase">
                July 23/24, 2025 • Colombo, SL
              </p>
            </div>

            {/* Image section */}
            <div className="mt-4">
              <div className="overflow-hidden rounded-xl">
                <img
                  src="/Nadun_Ova_1.jpg"
                  alt="Wedding"
                  className="w-full aspect-[16/9] object-contain object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
