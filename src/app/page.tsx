import Link from "next/link";

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center items-center p-8'>
      <div className='max-w-3xl text-center space-y-8'>
        <h1 className='text-4xl md:text-5xl font-bold text-blue-600'>Welcome to JobFair</h1>
        <p className='text-lg md:text-xl text-gray-700 leading-relaxed'>
          JobFair เป็นแพลตฟอร์มสำหรับการนัดหมายงานและการค้นหาบริษัทที่ตรงกับความสามารถและความสนใจของคุณ
          เข้าร่วมกับเราเพื่อค้นหาโอกาสงานจากบริษัทชั้นนำที่เหมาะกับคุณและเชื่อมโยงกับผู้ว่าจ้างที่ใช่
        </p>
        <div className='space-x-4'>
          <Link href='/booking'>
            <button className='px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition'>
              เริ่มค้นหาโอกาสงาน
            </button>
          </Link>
          <Link href='/company'>
            <button className='px-6 py-3 bg-gray-200 text-blue-600 rounded-md font-medium hover:bg-gray-300 transition'>
              ดูรายชื่อบริษัท
            </button>
          </Link>
        </div>
      </div>
      <div className='mt-16 w-full max-w-5xl flex flex-wrap justify-center gap-8'>
        <div className='text-center p-6 bg-white shadow-lg rounded-lg w-64'>
          <h2 className='text-2xl font-semibold text-blue-600'>ค้นหางาน</h2>
          <p className='text-gray-700 mt-2'>ค้นหาโอกาสงานที่เหมาะกับคุณจากบริษัทหลากหลายที่ร่วมเข้าร่วมกับเรา</p>
        </div>
        <div className='text-center p-6 bg-white shadow-lg rounded-lg w-64'>
          <h2 className='text-2xl font-semibold text-blue-600'>ค้นหาบริษัท</h2>
          <p className='text-gray-700 mt-2'>สำรวจบริษัทต่างๆ และเรียนรู้เกี่ยวกับโอกาสและวิสัยทัศน์ของแต่ละองค์กร</p>
        </div>
        <div className='text-center p-6 bg-white shadow-lg rounded-lg w-64'>
          <h2 className='text-2xl font-semibold text-blue-600'>ลงทะเบียนผู้สมัคร</h2>
          <p className='text-gray-700 mt-2'>สมัครสมาชิกและสร้างโปรไฟล์เพื่อเพิ่มโอกาสในการหางานที่เหมาะกับคุณ</p>
        </div>
      </div>
    </div>
  );
}
