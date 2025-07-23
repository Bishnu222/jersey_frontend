import {
  ShoppingCart,
  Clock,
  CheckCircle,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { getBackendImageUrl } from "../../utils/backendImage";

const statusConfig = {
  pending: {
    label: "Pending",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    icon: <Clock className="w-4 h-4 mr-1" />,
  },
  processing: {
    label: "Processing",
    color:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    icon: <RefreshCw className="w-4 h-4 mr-1 animate-spin-slow" />,
  },
  completed: {
    label: "Completed",
    color:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    icon: <CheckCircle className="w-4 h-4 mr-1" />,
  },
  default: {
    label: "Unknown",
    color:
      "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    icon: <ShoppingCart className="w-4 h-4 mr-1" />,
  },
};

function formatCurrency(amount) {
  return amount.toLocaleString("en-IN");
}

export default function MyOrderCard({ order, onDelete }) {
  const status = statusConfig[order.status] || statusConfig.default;

  return (
    <article
      className="p-0 border-2 border-green-600 rounded-2xl shadow-lg bg-white relative overflow-hidden hover:shadow-2xl transition-transform hover:scale-[1.01]"
      aria-label={`Order ${order._id}`}
    >
      {/* Football SVG background pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="30" stroke="#22c55e" strokeWidth="4" fill="#bbf7d0" />
        <rect x="120" y="120" width="50" height="50" rx="12" stroke="#22c55e" strokeWidth="4" fill="#bbf7d0" />
        <circle cx="160" cy="60" r="18" stroke="#22c55e" strokeWidth="3" fill="#bbf7d0" />
        <rect x="20" y="120" width="30" height="30" rx="8" stroke="#22c55e" strokeWidth="3" fill="#bbf7d0" />
      </svg>
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-0 rounded-t-2xl bg-green-600 text-white px-6 py-3 relative z-10">
        <div className="font-extrabold text-lg tracking-wide">
          Order #{order._id.slice(-8)}
        </div>
        <div className="flex items-center space-x-4 mt-2 md:mt-0 text-sm">
          <time dateTime={order.date} className="text-green-100">
            {new Date(order.date).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase bg-white text-green-700 border border-green-700`}
          >
            {status.icon}
            {status.label}
          </span>
        </div>
      </header>

      {/* Product List */}
      <ul className="divide-y divide-green-100 max-h-52 overflow-y-auto mb-6 px-6 pt-4 relative z-10">
        {order.products?.map((item) => {
          const imgSrc = item.productImage?.startsWith("http")
            ? item.productImage
            : getBackendImageUrl(item.productImage);

          return (
            <li
              key={item._id}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center space-x-4">
                {item.productImage ? (
                  <img
                    src={imgSrc}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover border border-green-400 shadow-sm"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                    🧢
                  </div>
                )}
                <div className="text-green-800 font-semibold text-base">
                  {item.name} × {item.quantity}
                </div>
              </div>
              <div className="text-green-700 font-bold text-sm">
                Rs {formatCurrency(item.price * item.quantity)}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <footer className="flex justify-between items-center px-6 py-4 bg-green-50 rounded-b-2xl text-green-900 text-base font-semibold shadow-inner border-t border-green-200 relative z-10">
        <span>Total: <span className="font-bold">Rs {formatCurrency(order.total)}</span></span>
        <button
          onClick={() => onDelete(order._id)}
          className="flex items-center gap-1 border border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition-colors text-sm font-semibold px-4 py-2 rounded-lg bg-white dark:bg-gray-900"
        >
          <Trash2 className="w-5 h-5" />
          Delete
        </button>
      </footer>
    </article>
  );
}
