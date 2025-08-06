import Navbar from '../src/components/Navbar'

const brands = [
  {
    name: 'Savage X Fenty',
    category: 'Lingerie & Loungewear',
    sizes: 'XS-4X',
    specialty: 'Inclusive sizing, diverse models',
    link: 'https://www.savagex.com'
  },
  {
    name: 'Eloquii',
    category: 'Plus Size Fashion',
    sizes: '14-28',
    specialty: 'Professional and casual wear',
    link: 'https://www.eloquii.com'
  },
  {
    name: 'Orange Culture',
    category: 'African Contemporary',
    sizes: 'XS-XL',
    specialty: 'Modern African prints and cuts',
    link: 'https://orangeculture.com'
  },
  {
    name: 'Maki Oh',
    category: 'Luxury African Fashion',
    sizes: 'XS-L',
    specialty: 'High-end African-inspired designs',
    link: 'https://makioh.com'
  },
  {
    name: 'Lisa Folawiyo',
    category: 'African Couture',
    sizes: 'XS-XL',
    specialty: 'Embellished African prints',
    link: 'https://lisafolawiyo.com'
  },
  {
    name: 'Fashion Nova Curve',
    category: 'Trendy Fashion',
    sizes: '1X-3X',
    specialty: 'Affordable trendy pieces',
    link: 'https://www.fashionnova.com/collections/curve'
  },
  {
    name: 'Universal Standard',
    category: 'Contemporary',
    sizes: '10-40',
    specialty: 'Size-inclusive luxury basics',
    link: 'https://www.universalstandard.com'
  },
  {
    name: 'Good American',
    category: 'Denim & Basics',
    sizes: '00-24',
    specialty: 'Body-positive denim',
    link: 'https://www.goodamerican.com'
  },
  {
    name: 'Chromat',
    category: 'Swimwear & Activewear',
    sizes: 'XS-4X',
    specialty: 'Architectural designs for all bodies',
    link: 'https://chromat.co'
  },
  {
    name: 'Adunni & Grace',
    category: 'African Bridal & Evening',
    sizes: 'XS-3XL',
    specialty: 'Luxury African wedding dresses',
    link: 'https://www.instagram.com/adunniandgrace/'
  },
  {
    name: 'Clan',
    category: 'African Streetwear',
    sizes: 'XS-XXL',
    specialty: 'Contemporary African street fashion',
    link: 'https://www.instagram.com/clan_ng/'
  }
]

export default function Brands() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Recommended Brands</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover brands that celebrate diversity and cater to all body types and skin tones
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {brand.name}
                </h3>
                <p className="text-gray-600 mb-3">{brand.category}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Size Range:</span>
                    <span className="text-sm font-medium">{brand.sizes}</span>
                  </div>
                  <div className="text-sm text-gray-700">
                    <strong>Specialty:</strong> {brand.specialty}
                  </div>
                </div>
                
                <a 
                  href={brand.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full btn-primary text-sm text-center block"
                >
                  Visit Brand
                </a>
              </div>
            ))}
          </div>
          
          <div className="card mt-12">
            <h2 className="text-xl font-semibold mb-4">Why These Brands?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-primary mb-2">Inclusive Sizing</h3>
                <p className="text-gray-600 text-sm">
                  Extended size ranges to fit every body type
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-secondary mb-2">Diverse Representation</h3>
                <p className="text-gray-600 text-sm">
                  Models and campaigns that celebrate all skin tones
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-accent mb-2">Quality & Style</h3>
                <p className="text-gray-600 text-sm">
                  Fashion-forward pieces that don't compromise on fit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}