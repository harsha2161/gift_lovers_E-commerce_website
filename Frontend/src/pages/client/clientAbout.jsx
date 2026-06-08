import { Link } from "react-router-dom";
import { FaHeart, FaGift, FaLeaf, FaSmile } from "react-icons/fa";

export default function ClientAboutPage() {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-gray-50">
      
     
      <div className="h-[60vh] w-full relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="about_hero.jpg" 
            alt="About Us Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <span className="text-emerald-300 font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            Delivering Joy, One Gift at a Time.
          </h1>
          <p className="text-lg md:text-xl text-gray-200 drop-shadow-md font-medium">
            At Gift Lovers, we believe that the perfect gift has the power to bring people closer, create lasting memories, and express what words cannot.
          </p>
        </div>
      </div>

    
      <div className="w-full py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <img 
              src="hero_image1.jpg" 
              alt="Our Mission" 
              className="rounded-2xl shadow-xl w-full h-[400px] "
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              We started Gift Lovers with a simple idea: to make gifting effortless, meaningful, and beautiful. Whether you're celebrating a milestone, expressing gratitude, or simply want to brighten someone's day, we curate gifts that speak from the heart.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Every item in our collection is handpicked with love, ensuring that it meets our high standards of quality, aesthetics, and thoughtfulness. We handle the details so you can focus on the joy of giving.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="w-full py-20 px-6 bg-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We are committed to providing an exceptional experience from the moment you browse to the moment they unwrap.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-6">
                <FaHeart size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Curated with Love</h3>
              <p className="text-gray-500">Every product is selected to ensure it brings a smile and warmth to your loved ones.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-6">
                <FaGift size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Beautiful Packaging</h3>
              <p className="text-gray-500">We believe presentation matters. Our gifts arrive beautifully wrapped and ready to impress.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-6">
                <FaLeaf size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Eco-Friendly</h3>
              <p className="text-gray-500">We strive to use sustainable materials because caring for the planet is caring for our future.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-6">
                <FaSmile size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Customer Happiness</h3>
              <p className="text-gray-500">Your satisfaction is our priority. We are here to make your gifting journey seamless.</p>
            </div>
          </div>
        </div>
      </div>


      <div className="w-full py-20 px-6 bg-white text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Ready to spread some joy?</h2>
        <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
          Explore our collection and find the perfect gift today.
        </p>
        <Link to="/products" className="inline-block px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg text-lg">
          Shop the Collection
        </Link>
      </div>

    </div>
  )
}
