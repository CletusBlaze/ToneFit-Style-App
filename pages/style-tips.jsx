import Navbar from '../src/components/Navbar'
import { useStore } from '../src/store/useStore'
import { analyzeColorHarmony } from '../src/utils/colorTheory'

const styleTipsDatabase = {
  Pear: {
    general: [
      "Highlight your upper body with bright colors and patterns",
      "Choose tops with horizontal stripes or embellishments",
      "Opt for A-line or straight-leg bottoms",
      "Wear statement jewelry to draw attention upward"
    ],
    colors: {
      warm: ["Coral and peach tones on top", "Golden accessories", "Warm earth tones"],
      cool: ["Jewel tones for upper body", "Silver accessories", "Cool blues and purples"]
    },
    avoid: ["Hip-hugging bottoms", "Tapered pants", "Bottom-heavy patterns"]
  },
  Apple: {
    general: [
      "Create a defined waistline with belts and wraps",
      "Choose V-necks and scoop necklines",
      "Opt for empire waist dresses",
      "Layer with long cardigans or jackets"
    ],
    colors: {
      warm: ["Warm flowing fabrics", "Golden belts", "Earth tone layers"],
      cool: ["Cool draped fabrics", "Silver belts", "Jewel tone layers"]
    },
    avoid: ["Tight-fitting tops", "High necklines", "Clingy fabrics"]
  },
  Rectangle: {
    general: [
      "Create curves with peplum tops and belted waists",
      "Add volume with ruffles and textures",
      "Layer different lengths and textures",
      "Use contrasting colors to define your waist"
    ],
    colors: {
      warm: ["Warm contrasting colors", "Golden belts", "Textured warm fabrics"],
      cool: ["Cool contrasting tones", "Silver details", "Structured cool colors"]
    },
    avoid: ["Straight, boxy silhouettes", "Monochromatic outfits", "Loose-fitting clothes"]
  },
  Hourglass: {
    general: [
      "Emphasize your natural waistline",
      "Choose fitted tops and bottoms",
      "Opt for wrap dresses and belted styles",
      "Maintain balanced proportions"
    ],
    colors: {
      warm: ["Warm fitted styles", "Golden waist details", "Balanced warm tones"],
      cool: ["Cool fitted silhouettes", "Silver waist accents", "Balanced cool colors"]
    },
    avoid: ["Oversized, shapeless clothing", "Boxy jackets", "Loose, flowing fabrics"]
  }
}

export default function StyleTips() {
  const { user } = useStore()
  
  if (!user.bodyShape || !user.skinTone) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen py-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="card">
              <h1 className="text-3xl font-bold mb-4">Complete Your Profile</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                To get personalized style tips, please complete your body shape and skin tone analysis.
              </p>
              <a href="/measurement" className="btn-primary">
                Start Analysis
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const bodyShape = user.bodyShape.type
  const skinTone = user.skinTone
  const tips = styleTipsDatabase[bodyShape]
  const colorHarmony = analyzeColorHarmony(skinTone, bodyShape)

  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Your Personal Style Guide
            </h1>
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className="bg-purple-100 dark:bg-purple-900 px-4 py-2 rounded-full">
                <span className="text-purple-800 dark:text-purple-200 font-medium">
                  {bodyShape} Shape
                </span>
              </div>
              <div className="bg-pink-100 dark:bg-pink-900 px-4 py-2 rounded-full">
                <span className="text-pink-800 dark:text-pink-200 font-medium">
                  {skinTone.name}
                </span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* General Style Tips */}
            <div className="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 border-2 border-purple-200 dark:border-purple-700">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">✨</div>
                <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                  Style Tips for {bodyShape}
                </h2>
              </div>
              
              <div className="space-y-4">
                {tips.general.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 dark:text-gray-300">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Recommendations */}
            <div className="card bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900 dark:to-pink-800 border-2 border-pink-200 dark:border-pink-700">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🎨</div>
                <h2 className="text-2xl font-bold text-pink-800 dark:text-pink-200">
                  Perfect Colors for You
                </h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-pink-700 dark:text-pink-300 mb-2">Best Colors:</h3>
                  <div className="flex space-x-2 mb-4">
                    {colorHarmony.bestColors.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  {tips.colors[skinTone.type].map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 dark:text-gray-300">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* What to Avoid */}
          <div className="card bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900 dark:to-orange-900 border-2 border-red-200 dark:border-red-700 mb-8">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">⚠️</div>
              <h2 className="text-2xl font-bold text-red-800 dark:text-red-200">
                Styles to Avoid
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-red-700 dark:text-red-300 mb-3">Clothing Styles:</h3>
                <div className="space-y-2">
                  {tips.avoid.map((avoid, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 dark:text-gray-300">{avoid}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-red-700 dark:text-red-300 mb-3">Colors to Limit:</h3>
                <div className="flex space-x-2 mb-4">
                  {colorHarmony.avoidColors.slice(0, 4).map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-gray-300 opacity-60"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  These colors may wash you out or clash with your undertones
                </p>
              </div>
            </div>
          </div>

          {/* Personalized Advice */}
          <div className="card bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900 dark:to-teal-900 border-2 border-green-200 dark:border-green-700">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">💡</div>
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">
                Your Personal Style Formula
              </h2>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                {colorHarmony.bodyShapeAdvice}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {colorHarmony.description}
              </p>
            </div>
            
            <div className="mt-6 text-center">
              <button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-3 px-8 rounded-xl transition-all transform hover:scale-105">
                Apply These Tips 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}