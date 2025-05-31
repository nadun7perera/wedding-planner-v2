export default function WeddingPage() {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#f8fcf8] group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
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