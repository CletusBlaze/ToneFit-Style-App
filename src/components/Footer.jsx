import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ToneFitStyle</h3>
            <p className="text-gray-400">
              Dress smart. Feel confident. Own your tone.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400 dark:text-gray-500">
              <li><Link href="/measurement" className="hover:text-white dark:hover:text-gray-200">Body Shape Analysis</Link></li>
              <li><Link href="/skintone" className="hover:text-white dark:hover:text-gray-200">Skin Tone Matching</Link></li>
              <li><Link href="/outfit-builder" className="hover:text-white dark:hover:text-gray-200">Outfit Builder</Link></li>
              <li><Link href="/ai-stylist" className="hover:text-white dark:hover:text-gray-200">AI Stylist</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400 dark:text-gray-500">
              <li><Link href="/brands" className="hover:text-white dark:hover:text-gray-200">Brand Partners</Link></li>
              <li><Link href="/upload-clothes" className="hover:text-white dark:hover:text-gray-200">Upload Clothes</Link></li>
              <li><Link href="/settings" className="hover:text-white dark:hover:text-gray-200">Settings</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">📘</a>
              <a href="#" className="text-gray-400 hover:text-white">📷</a>
              <a href="#" className="text-gray-400 hover:text-white">🐦</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Cletus Blaze. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}