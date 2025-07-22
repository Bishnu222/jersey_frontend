import React, { useContext, useState, useMemo, useEffect } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { useAdminProduct } from "../hooks/admin/useAdminProduct";
import { useAdminCategory } from "../hooks/admin/useAdminCategory";
import { getBackendImageUrl } from "../utils/backendImage";
import { useFetchOrdersByUser } from "../hooks/useCreateOrder";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import UserSidebar from "../components/auth/UserSlideBar";
import { Plus, ChevronRight, ShoppingCart } from "lucide-react";
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
  const [profileForm, setProfileForm] = useState({ username: user?.username || "", email: user?.email || "", address: user?.address || "" });
  const { login } = useContext(AuthContext);

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
    setProfileForm({ username: user?.username || "", email: user?.email || "", address: user?.address || "" });
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
    setProfileModalOpen(false);
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
    <div className="dark:bg-gray-900 bg-gray-100 text-black dark:text-white min-h-screen">
      {/* Top bar with notifications and profile */}
      <div className="flex justify-end items-center px-6 pt-4 gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-white" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">{cart.length}</span>
              )}
            </button>
            {/* Cart preview dropdown (optional, add highlight here if you have a preview) */}
          </div>
          <NotificationDropdown userId={user?._id} />
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow px-4 py-2 flex flex-col items-start min-w-[180px]">
            <span className="font-bold text-gray-800 dark:text-white">{user?.username}</span>
            <span className="text-xs text-gray-500 dark:text-gray-300">{user?.email}</span>
            {user?.address && <span className="text-xs text-gray-400">{user.address}</span>}
            <button onClick={handleProfileEdit} className="ml-2 text-xs text-blue-600 hover:underline">Edit</button>
          </div>
        </div>
      </div>

      {/* Banner */}
      <Slider {...bannerSettings} className="mb-10 rounded-lg overflow-hidden max-w-5xl mx-auto mt-6">
        {bannerItems.map((banner, i) => (
          <div
            key={i}
            className={`relative h-64 sm:h-80 md:h-[400px] flex items-center justify-center ${banner.bgColor}`}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white text-center px-4">
              {banner.title}
            </h2>
          </div>
        ))}
      </Slider>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Shop Filters */}
        <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
          <div className="flex gap-2 items-center">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="border rounded px-2 py-1 min-w-[160px]"
              disabled={loadingCategories}
            >
              <option value="">All Categories</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search jerseys..."
              value={productSearch}
              onChange={e => setProductSearch(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <button
            onClick={() => navigate("/normal/order")}
            className="text-blue-600 hover:underline flex items-center gap-1"
          >
            My Orders
            <ChevronRight size={16} />
          </button>
        </div>
        {/* Product Grid */}
        {loadingProducts ? (
          <div className="text-center text-gray-600 dark:text-gray-300">Loading jerseys...</div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
            {filteredProducts.map((jersey) => (
              <div
                key={jersey._id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-xl transition p-4 flex flex-col"
              >
                <img
                  src={getBackendImageUrl(jersey.productImage)}
                  alt={jersey.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h2 className="text-lg font-semibold text-center text-gray-800 dark:text-white mb-1">
                  {jersey.name || jersey.team}
                </h2>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-2">
                  {jersey.description || jersey.type}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    Rs {jersey.price?.toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleAddToCart(jersey)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">No products available right now.</p>
        )}

        {/* Recent Orders */}
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <select value={orderStatus} onChange={e => setOrderStatus(e.target.value)} className="border rounded px-2 py-1">
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
          </select>
          <input
            type="text"
            placeholder="Search by product name..."
            value={orderSearch}
            onChange={e => setOrderSearch(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
          {loadingOrders ? (
            <div className="text-center text-gray-600 dark:text-gray-300">Loading orders...</div>
          ) : filteredOrders.length === 0 ? (
            <p className="text-center text-gray-500">No orders found.</p>
          ) : (
            filteredOrders.slice(0, 4).map((order) => (
              <div key={order._id} className="relative mb-4">
                <MyOrderCard order={order} onDelete={() => handleCancelOrder(order._id)} />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={() => handleViewDetails(order)} className="bg-indigo-500 hover:bg-indigo-700 text-white px-3 py-1 rounded text-xs">View Details</button>
                  <button onClick={() => handleCancelOrder(order._id)} className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-xs">Cancel Order</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Cart Sidebar */}
      {/* <UserSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} clearCart={clearCart} onCheckout={onCheckout} highlightedId={highlightedId} /> */}
      <OrderDetailsModal order={selectedOrder} isOpen={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} />
      {/* <DeleteModal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={confirmDelete} title="Cancel Order" description="Are you sure you want to cancel this order? This action cannot be undone." /> */}
      {profileModalOpen && (
        <Modal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Username</label>
              <input type="text" name="username" value={profileForm.username} onChange={handleProfileChange} className="border rounded px-2 py-1 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" name="email" value={profileForm.email} onChange={handleProfileChange} className="border rounded px-2 py-1 w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input type="text" name="address" value={profileForm.address} onChange={handleProfileChange} className="border rounded px-2 py-1 w-full" />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setProfileModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
              <button onClick={handleProfileSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
} 