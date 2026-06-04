import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaLock, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import Loading from "../../components/loading";

export default function ClientProfile() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    
    // Form states
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        password: ""
    });
    const [isSaving, setIsSaving] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/v1/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
                setFormData({
                    firstName: response.data.firstName || "",
                    lastName: response.data.lastName || "",
                    address: response.data.address || "",
                    phoneNumber: response.data.phoneNumber || "",
                    password: ""
                });
            } catch (error) {
                console.error("Failed to fetch user data", error);
                toast.error("token expired. Please login again.");
                localStorage.removeItem("token");
                navigate("/login");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    function handleInputChange(e){
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function handleSave  (e) {
        e.preventDefault();
        
        if (user.password !== "google" && !formData.password) {
            toast.error("Please enter your password to save changes");
            return;
        }

        setIsSaving(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                import.meta.env.VITE_BACKEND_URL + "/api/v1/users/update-profile", 
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            toast.success("Profile updated successfully!");
            setUser(response.data.data);
            setIsEditing(false);
            setFormData({ ...formData, password: "" }); // Clear password field
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!user) return null;

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-gray-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center font-sans">
            <div className="max-w-4xl w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 flex flex-col md:flex-row">
                
                {/* Left Sidebar - Profile Overview */}
                <div className="md:w-1/3 bg-gradient-to-b from-emerald-700 to-emerald-900 p-8 text-white flex flex-col items-center justify-center relative overflow-hidden">
                    
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="relative group cursor-pointer mb-6">
                            <img src={user.img} alt="Profile" 
                                className="w-40 h-40 rounded-full object-cover border-4 border-white/30 shadow-xl group-hover:border-white transition-all duration-300 bg-white" 
                            />
                        </div>
                        
                        <h2 className="text-3xl font-black mb-1 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200">
                            {user.firstName} {user.lastName}
                        </h2>
                        <span className="px-4 py-1 mt-2 bg-emerald-800/50 backdrop-blur-sm rounded-full text-sm font-semibold uppercase tracking-wider text-emerald-100 border border-emerald-600">
                            {user.role}
                        </span>
                    </div>
                </div>

                {/* Right Content - Profile Details / Edit Form */}
                <div className="md:w-2/3 p-8 lg:p-12">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-800">
                            {isEditing ? "Edit Profile" : "Profile Details"}
                        </h3>
                        {!isEditing ? (
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl font-bold transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                                <FaEdit /> Edit
                            </button>
                        ) : (
                            <button 
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData({ ...formData, password: "" }); // Reset password field
                                }}
                                className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 text-gray-600 hover:bg-gray-200 rounded-xl font-bold transition-all duration-300"
                            >
                                <FaTimes /> Cancel
                            </button>
                        )}
                    </div>

                    {!isEditing ? (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <DetailItem icon={<FaUser className="text-emerald-500" />} label="First Name" value={user.firstName} />
                                <DetailItem icon={<FaUser className="text-emerald-500" />} label="Last Name" value={user.lastName} />
                            </div>
                            <DetailItem icon={<FaEnvelope className="text-emerald-500" />} label="Email Address" value={user.email} />
                            <DetailItem icon={<FaPhone className="text-emerald-500" />} label="Phone Number" value={user.phoneNumber || "Not provided"} />
                            <DetailItem icon={<FaMapMarkerAlt className="text-emerald-500" />} label="Address" value={user.address || "Not provided"} />
                        </div>
                    ) : (
                        <form onSubmit={handleSave} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <InputField icon={<FaUser />} label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                                <InputField icon={<FaUser />} label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                            </div>
                            
                            <InputField icon={<FaPhone />} label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Enter your phone number" />
                            
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-600 ml-1">Address</label>
                                <div className="relative">
                                    <div className="absolute top-3 left-4 text-gray-400">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <textarea 
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter your full address"
                                        className="w-full h-24 pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                                    />
                                </div>
                            </div>

                            {user.password !== "google" && (
                                <div className="p-5 bg-orange-50 border border-orange-100 rounded-2xl mt-6 space-y-3">
                                    <h4 className="font-bold text-orange-800 flex items-center gap-2">
                                        <FaLock /> Authentication Required
                                    </h4>
                                    <p className="text-sm text-orange-700">Please enter your current password to confirm these changes.</p>
                                    <InputField icon={<FaLock />} type="password" label="Current Password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Enter password to save" required />
                                </div>
                            )}

                            <div className="pt-4 flex justify-end">
                                <button 
                                    type="submit" 
                                    disabled={isSaving}
                                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all duration-300 ${isSaving ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 hover:-translate-y-1 hover:shadow-emerald-600/30'}`}
                                >
                                    {isSaving ? (
                                        <><div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div> Saving...</>
                                    ) : (
                                        <><FaSave /> Save Changes</>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all group">
        <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
            {icon}
        </div>
        <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
            <p className="font-semibold text-gray-800">{value}</p>
        </div>
    </div>
);

const InputField = ({ icon, label, type = "text", ...props }) => (
    <div className="space-y-1">
        <label className="text-sm font-semibold text-gray-600 ml-1">{label}</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                {icon}
            </div>
            <input 
                type={type}
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                {...props}
            />
        </div>
    </div>
);