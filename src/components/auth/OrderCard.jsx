import {
  ShoppingCart,
  Clock,
  CheckCircle,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { getBackendImageUrl } from "../utils/backend-image";

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
      className="p-6 border border-slate-300 dark:border-gray-600 rounded-2xl shadow-xl bg-gradient-to-br from-white to-slate-100 dark:from-gray-900 dark:to-gray-800 hover:shadow-2xl transition-transform hover:scale-[1.01]"
      aria-label={`Order ${order._id}`}
    >
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">
        <div className="text-indigo-800 dark:text-indigo-300 font-extrabold text-lg tracking-wide">
          Order #{order._id.slice(-8)}
        </div>

        <div className="flex items-center space-x-4 mt-2 md:mt-0 text-sm text-gray-600 dark:text-gray-300">
          <time dateTime={order.date}>
            {new Date(order.date).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>

          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase ${status.color}`}
          >
            {status.icon}
            {status.label}
          </span>
        </div>
      </header>

      {/* Product List */}
      <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-52 overflow-y-auto mb-6">
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
                    className="w-12 h-12 rounded-lg object-cover border border-gray-400 dark:border-gray-500 shadow-sm"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                    🧢
                  </div>
                )}

                <div className="text-gray-800 dark:text-gray-100 font-semibold text-sm">
                  {item.name} × {item.quantity}
                </div>
              </div>
              <div className="text-indigo-600 dark:text-indigo-300 font-bold text-sm">
                Rs {formatCurrency(item.price * item.quantity)}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <footer className="flex justify-between items-center px-2 py-3 bg-indigo-50 dark:bg-indigo-900 rounded-xl text-indigo-900 dark:text-indigo-200 text-base font-semibold shadow-inner">
        <span>Total: Rs {formatCurrency(order.total)}</span>
        <button
          onClick={() => onDelete(order._id)}
          className="flex items-center gap-1 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors text-sm font-semibold"
        >
          <Trash2 className="w-5 h-5" />
          Delete
        </button>
      </footer>
    </article>
  );
}
