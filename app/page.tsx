import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center">
      {/* Main photo */}
      <div className="max-w-4xl w-full px-4">
        <Image
          src="/Nadun_Ova_1.jpg"  // replace with your actual image path
          alt="Nadun and Ovadanee"
          width={1200}
          height={800}
          className="rounded-md"
          priority
        />
      </div>
    </div>
  );
}
