import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";
import { addCart } from "../../utils/cart";
import { FaShoppingCart, FaBolt, FaShieldAlt, FaUndo, FaTruck } from "react-icons/fa";
import { MdOutlineLocalOffer } from "react-icons/md";

export default function ProductOverviewPage() {

  const params = useParams();
  const productId = params.id;

  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    setStatus("loading");
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/v1/products/" + productId).then(
      (response) => {
        const productData = response.data.data;
        productData.lablePrice = productData.labelPrice; // Polyfill for cart components
        setProduct(productData);
        setStatus("success");

      }).catch((error) => {

        // console.error(error);
        setStatus("error");
        toast.error("Error fetching product details");
      })

  }, [setStatus]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong.</h2>

        <button onClick={() => navigate("/products")}
          className="px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors">
          Back to Products
        </button>

      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">


      <nav className="text-sm font-medium text-gray-500 mb-8 flex items-center gap-2">
        <button onClick={() => navigate("/")} className="hover:text-emerald-600 transition-colors">Home</button>
        <span>/</span>
        <button onClick={() => navigate("/products")} className="hover:text-emerald-600 transition-colors">Products</button>
        <span>/</span>
        <span className="text-gray-900">{product.productName}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

        {/* Left Column: Image Slider */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full max-w-[500px] lg:max-w-none">
            <ImageSlider images={product.img} />
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col pt-4 lg:pt-0">

          {/* Header Section */}
          <div className="border-b border-gray-100 pb-6 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full tracking-wide">
                IN STOCK
              </span>
              <span className="text-sm text-gray-400 font-mono">SKU: {product.productId}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-2">
              {product.productName}
            </h1>

            {product.altName && product.altName.length > 0 && (
              <p className="text-lg text-gray-500 font-medium flex items-center gap-2 flex-wrap">
                {product.altName.map((name, index) => (
                  <span key={index} className="flex items-center gap-2">
                    {index > 0 && <span className="text-gray-300">|</span>}
                    {name}
                  </span>
                ))}
              </p>
            )}
          </div>

          {/* Pricing Section */}
          <div className="mb-8">
            <div className="flex items-end gap-3 mb-2">

              <span className="text-4xl md:text-5xl font-black text-emerald-600">
                Rs. {product.lablePrice.toFixed(2)}
              </span>

            </div>

            <p className="text-gray-500 text-sm flex items-center gap-1"><MdOutlineLocalOffer className="text-emerald-500" />
              Price inclusive of all taxes.</p>

          </div>

          {/* Description moved to bottom */}
          {/* Actions Section */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">

            <button onClick={() => { addCart(product, 1); toast.success("Added to cart!"); }}
              className="flex-1 flex justify-center items-center gap-2 bg-white border-2 border-emerald-600 text-emerald-600
            px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-colors shadow-sm">
              <FaShoppingCart className="text-xl" />Add to Cart

            </button>

            <button onClick={() => {
              navigate("/checkout", {
                state: {
                  cart: [{
                    productId: product.productId,
                    productName: product.productName,
                    img: product.img[0],
                    lablePrice: product.lablePrice,
                    qty: 1,
                  }]
                }
              });
            }}
              className="flex-1 flex justify-center items-center gap-2 bg-emerald-600 text-white px-8 py-4 
              rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all hover:shadow-lg hover:-translate-y-1">

              <FaBolt className="text-xl" />
              Buy Now
            </button>

          </div>


        </div>
      </div>

      {/* Description Section - Bottom Middle */}
      <div className="mt-20 w-full max-w-4xl mx-auto px-4">
        <div className="bg-gray-50/50 rounded-3xl p-8 sm:p-12 text-center border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Product Description</h3>
          <p className="text-gray-600 leading-relaxed text-lg max-w-3xl mx-auto whitespace-pre-wrap">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}