import React, { useContext, useState, useMemo, useEffect } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { useAdminProduct } from "../hooks/admin/useAdminProduct";
import { useAdminCategory } from "../hooks/admin/useAdminCategory";
import { getBackendImageUrl } from "../utils/backendImage";
import { useFetchOrdersByUser } from "../hooks/useCreateOrder";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import UserSidebar from "../components/auth/UserSlideBar";
import { Plus, ChevronRight, ShoppingCart, Mail, MapPin, User, CheckCircle } from "lucide-react";
import MyOrderCard from "../components/auth/OrderCard";
import NotificationDropdown from "../components/auth/NotificationDropDown";
import { useCart } from "../auth/CartContext";
import OrderDetailsModal from "../components/auth/OrderDetailsModal";
import { useDeleteOrder } from "../hooks/useCreateOrder";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import { useNotifications } from "../hooks/useNotification";

export default function UserDashboard() {
  const { user } = useContext(AuthContext);
  const { products, isLoading: loadingProducts } = useAdminProduct();
  const { categories, isLoading: loadingCategories } = useAdminCategory();
  const { data: orders = [], isLoading: loadingOrders } = useFetchOrdersByUser(user?._id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, onCheckout } = useCart();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const deleteOrderMutation = useDeleteOrder();
  const [orderStatus, setOrderStatus] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  // Initialize profileForm with all fields, including favoriteTeam
  const [profileForm, setProfileForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    address: user?.address || "",
    favoriteTeam: user?.favoriteTeam || ""
  });
  const { login } = useContext(AuthContext);
  const [profileSaved, setProfileSaved] = useState(false);

  // Product search and category filter state
  const [productSearch, setProductSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Highlight effect for last added cart item
  const [highlightedId, setHighlightedId] = useState(null);
  const handleAddToCart = (jersey) => {
    addToCart(jersey);
    toast.success("Added to cart!");
  };
  useEffect(() => {
    if (highlightedId) {
      const timeout = setTimeout(() => setHighlightedId(null), 1200);
      return () => clearTimeout(timeout);
    }
  }, [highlightedId]);

  const handleProfileEdit = () => {
    setProfileForm({
      username: user?.username || "",
      email: user?.email || "",
      address: user?.address || "",
      favoriteTeam: user?.favoriteTeam || ""
    });
    setProfileModalOpen(true);
  };
  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };
  const handleProfileSave = () => {
    // Update user in AuthContext and localStorage
    const updatedUser = { ...user, ...profileForm };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    login(updatedUser, localStorage.getItem("token"));
    setProfileSaved(true);
    setTimeout(() => {
      setProfileSaved(false);
      setProfileModalOpen(false);
    }, 1200);
  };

  // Banner items
  const bannerItems = [
    { title: "Goal-Scoring Deals: Jerseys Up to 50% Off!", bgColor: "bg-red-600" },
    { title: "New Season, New Kits: Shop the Latest Jerseys!", bgColor: "bg-green-600" },
    { title: "Limited Time Kicks: Grab Jerseys Before They're Gone!", bgColor: "bg-blue-600" },
  ];

  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  // Filter products by search and category
  const filteredProducts = useMemo(() => {
    let filtered = Array.isArray(products) ? products : [];
    if (selectedCategory) {
      filtered = filtered.filter(
        (p) => p.categoryId === selectedCategory || p.categoryId?._id === selectedCategory
      );
    }
    if (productSearch) {
      filtered = filtered.filter((p) =>
        p.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.team?.toLowerCase().includes(productSearch.toLowerCase())
      );
    }
    return filtered;
  }, [products, selectedCategory, productSearch]);

  // Group orders by date
  const groupOrdersByDate = (orders) => {
    const grouped = {};
    orders.forEach((order) => {
      const dateKey = new Date(order.date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(order);
    });
    return grouped;
  };
  const groupedOrders = groupOrdersByDate(orders);

  // Flatten and filter orders for search and status
  const filteredOrders = useMemo(() => {
    let allOrders = [];
    Object.entries(groupedOrders).forEach(([date, ordersOnDate]) => {
      allOrders = allOrders.concat(ordersOnDate.map(order => ({ ...order, _date: date })));
    });
    if (orderStatus) {
      allOrders = allOrders.filter(order => order.status === orderStatus);
    }
    if (orderSearch) {
      allOrders = allOrders.filter(order =>
        order.products.some(product =>
          product.name.toLowerCase().includes(orderSearch.toLowerCase())
        )
      );
    }
    return allOrders;
  }, [groupedOrders, orderStatus, orderSearch]);

  // Add handlers for order actions
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailsModalOpen(true);
  };
  const handleCancelOrder = (orderId) => {
    setOrderToDelete(orderId);
    setDeleteModalOpen(true);
  };
  const confirmDelete = () => {
    if (!orderToDelete) return;
    deleteOrderMutation.mutate(orderToDelete, {
      onSuccess: () => {
        toast.success(`Order #${orderToDelete.slice(-5)} cancelled`);
        setDeleteModalOpen(false);
        setOrderToDelete(null);
      },
      onError: () => {
        toast.error("Failed to cancel order.");
        setDeleteModalOpen(false);
        setOrderToDelete(null);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-blue-100 to-green-100">
      {/* Centered Profile Card with Glassmorphism */}
      <div className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-2xl px-10 py-12 flex flex-col items-center w-full max-w-md border border-white/40">
        {/* Avatar */}
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center text-5xl font-extrabold text-white mb-4 shadow-lg border-4 border-white/60">
          {user?.username?.[0]?.toUpperCase() || <span>👤</span>}
        </div>
        <h2 className="text-3xl font-extrabold text-green-800 mb-2 tracking-wide">My Profile</h2>
        <span className="text-lg text-gray-800 dark:text-gray-100 font-semibold mb-1">{user?.username}</span>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-1">
          <Mail className="w-5 h-5" />
          <span className="text-base">{user?.email}</span>
        </div>
        {user?.address && (
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
            <MapPin className="w-5 h-5" />
            <span className="text-base">{user.address}</span>
          </div>
        )}
        <button
          onClick={handleProfileEdit}
          className="mt-4 px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-blue-700 hover:to-green-700 text-white rounded-full font-bold shadow-lg text-lg transition"
        >
          Edit Profile
        </button>
      </div>
      {/* Profile Edit Modal remains unchanged */}
      {profileModalOpen && (
        <Modal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)}>
          <div className="p-8 rounded-3xl bg-white/70 shadow-2xl max-w-md mx-auto flex flex-col items-center animate-fade-in backdrop-blur-md border border-white/40 relative">
            {/* Avatar Preview */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center text-4xl font-extrabold text-white mb-4 shadow-xl border-4 border-white ring-4 ring-green-200">
              {profileForm.username?.[0]?.toUpperCase() || <span>👤</span>}
            </div>
            <h2 className="text-2xl font-extrabold mb-1 text-green-800">Edit Profile</h2>
            <p className="text-gray-500 mb-6 text-sm">Update your account details below.</p>
            {profileSaved ? (
              <div className="flex flex-col items-center gap-2 my-8">
                <CheckCircle className="w-12 h-12 text-green-500" />
                <span className="text-green-700 font-bold text-lg">Profile updated!</span>
              </div>
            ) : (
              <>
                <div className="mb-4 w-full">
                  <label className="block text-sm font-medium mb-1 flex items-center gap-2"><User className="w-4 h-4" /> Username</label>
                  <input type="text" name="username" value={profileForm.username || ''} onChange={handleProfileChange} className="border rounded-2xl px-3 py-2 w-full focus:ring-2 focus:ring-green-400 bg-white/80" placeholder="Enter your username" autoComplete="off" />
                </div>
                <div className="mb-4 w-full">
                  <label className="block text-sm font-medium mb-1 flex items-center gap-2"><Mail className="w-4 h-4" /> Email</label>
                  <input type="email" name="email" value={profileForm.email || ''} onChange={handleProfileChange} className="border rounded-2xl px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 bg-white/80" placeholder="Enter your email" autoComplete="off" />
                </div>
                <div className="mb-6 w-full">
                  <label className="block text-sm font-medium mb-1 flex items-center gap-2"><MapPin className="w-4 h-4" /> Address</label>
                  <input type="text" name="address" value={profileForm.address || ''} onChange={handleProfileChange} className="border rounded-2xl px-3 py-2 w-full focus:ring-2 focus:ring-green-300 bg-white/80" placeholder="Enter your address" autoComplete="off" />
                </div>
                <div className="flex justify-end gap-3 w-full">
                  <button onClick={() => setProfileModalOpen(false)} className="bg-red-500 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold shadow transition">Cancel</button>
                  <button onClick={handleProfileSave} className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-2 rounded-full font-bold shadow-lg transition">Save</button>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
} 