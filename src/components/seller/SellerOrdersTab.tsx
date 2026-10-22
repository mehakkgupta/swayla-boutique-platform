import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import { 
  CheckCircle2, 
  Clock, 
  Truck, 
  PackageCheck, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Mail, 
  MapPin, 
  Send,
  AlertTriangle,
  Search,
  ExternalLink
} from 'lucide-react';

export const SellerOrdersTab: React.FC = () => {
  const { 
    orders, 
    acceptOrder, 
    markOrderShipped, 
    markOrderDelivered, 
    sendAbandonedRecovery 
  } = useApp();

  const [activeMainTab, setActiveMainTab] = useState<'all' | 'abandoned'>('all');
  const [activeStatus, setActiveStatus] = useState<OrderStatus>('all');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>('ord-3');
  const [searchOrder, setSearchOrder] = useState('');

  // Filter orders
  const filteredOrders = orders.filter(order => {
    if (activeMainTab === 'abandoned') {
      return order.isAbandoned;
    }
    if (order.isAbandoned) return false;

    if (activeStatus !== 'all' && order.status !== activeStatus) {
      return false;
    }

    if (searchOrder) {
      const q = searchOrder.toLowerCase();
      return (
        order.customerName.toLowerCase().includes(q) ||
        order.orderNumber.toLowerCase().includes(q) ||
        order.items.some(i => i.product.name.toLowerCase().includes(q))
      );
    }

    return true;
  });

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Pending</span>;
      case 'accepted':
        return <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">Accepted</span>;
      case 'shipped':
        return <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">Shipped</span>;
      case 'delivered':
        return <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Delivered</span>;
    }
  };

  const statusTabs: { id: OrderStatus; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'accepted', label: 'Accepted' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'delivered', label: 'Delivered' }
  ];

  return (
    <div className="space-y-4 pb-6">
      {/* Top Header / Banner matching Figma pink bar */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-5 rounded-2xl shadow-md">
        <h3 className="text-xl font-bold font-display">Orders</h3>
        <p className="text-pink-100 text-xs mt-0.5">Manage customer fulfillments & order status</p>

        {/* 2 Main Tabs: All Orders vs Abandoned Orders */}
        <div className="flex gap-4 mt-4 text-xs font-semibold border-b border-pink-400/40 pb-2">
          <button
            onClick={() => setActiveMainTab('all')}
            className={`pb-1 transition-all ${
              activeMainTab === 'all'
                ? 'text-white border-b-2 border-white'
                : 'text-pink-200 hover:text-white'
            }`}
          >
            All Orders ({orders.filter(o => !o.isAbandoned).length})
          </button>
          <button
            onClick={() => setActiveMainTab('abandoned')}
            className={`pb-1 transition-all flex items-center gap-1.5 ${
              activeMainTab === 'abandoned'
                ? 'text-white border-b-2 border-white'
                : 'text-pink-200 hover:text-white'
            }`}
          >
            <span>Abandoned Orders</span>
            <span className="bg-pink-700 text-white text-[10px] px-1.5 py-0.2 rounded-full">
              {orders.filter(o => o.isAbandoned).length}
            </span>
          </button>
        </div>
      </div>

      {/* Sub-status filters for All Orders */}
      {activeMainTab === 'all' && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {statusTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeStatus === tab.id
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchOrder}
          onChange={(e) => setSearchOrder(e.target.value)}
          placeholder="Search by customer name, order # or item..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:border-pink-500 focus:bg-white transition-colors"
        />
        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
      </div>

      {/* Order Cards List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200/80 p-6">
            <div className="w-12 h-12 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center mx-auto mb-3">
              <PackageCheck className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-stone-800">No Orders in this View</h4>
            <p className="text-xs text-stone-500 mt-1">
              {activeMainTab === 'abandoned' ? 'No abandoned carts pending recovery.' : 'No orders matching selected criteria.'}
            </p>
          </div>
        ) : (
          filteredOrders.map(order => {
            const isExpanded = expandedOrderId === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-stone-200/80 p-4 shadow-sm hover:border-pink-200 transition-all"
              >
                {/* Header Row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-xs">
                      {order.customerName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-stone-900">{order.customerName}</h4>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                        <span className="font-semibold text-stone-700">ORDER {order.orderNumber}</span>
                        <span>·</span>
                        <span>Order Date: {order.orderDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contextual Action Button matching Figma */}
                  <div>
                    {order.isAbandoned ? (
                      <button
                        onClick={() => sendAbandonedRecovery(order.id)}
                        className="px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm transition-colors"
                      >
                        <Send className="w-3 h-3" />
                        <span>Send Offer</span>
                      </button>
                    ) : order.status === 'pending' ? (
                      <button
                        onClick={() => acceptOrder(order.id)}
                        className="px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-[11px] font-semibold shadow-sm transition-colors"
                      >
                        Accept Order
                      </button>
                    ) : order.status === 'accepted' ? (
                      <button
                        onClick={() => markOrderShipped(order.id)}
                        className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm transition-colors"
                      >
                        <Truck className="w-3 h-3" />
                        <span>Mark as Shipped</span>
                      </button>
                    ) : order.status === 'shipped' ? (
                      <button
                        onClick={() => markOrderDelivered(order.id)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm transition-colors"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Confirm Delivery</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Delivered</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tracking & Details Card for Shipped or Expanded Orders matching Figma */}
                {(isExpanded || order.status === 'shipped') && (
                  <div className="mt-3.5 pt-3.5 border-t border-stone-100 bg-stone-50/70 p-3 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between text-stone-600">
                      <span className="text-[11px] text-stone-500">Products:</span>
                      <span className="font-semibold text-stone-800">
                        {order.items.map(i => `${i.product.name} (x${i.quantity})`).join(', ')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-stone-600">
                      <span className="text-[11px] text-stone-500">Total Amount:</span>
                      <span className="font-bold text-stone-900 tabular-nums">
                        ₹{order.totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {order.shippingDate && (
                      <div className="flex items-center justify-between text-stone-600">
                        <span className="text-[11px] text-stone-500">Shipping Date:</span>
                        <span className="font-medium text-stone-800">{order.shippingDate}</span>
                      </div>
                    )}

                    {order.trackingNo && (
                      <div className="flex items-center justify-between text-stone-600">
                        <span className="text-[11px] text-stone-500">Tracking No.:</span>
                        <span className="font-mono text-pink-600 font-bold select-all">
                          {order.trackingNo}
                        </span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-stone-200/60 flex items-start justify-between text-[11px] text-stone-500">
                      <div className="flex items-start gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span>
                          {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
                        </span>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <a href={`tel:${order.customerPhone}`} className="text-pink-600 hover:underline flex items-center gap-0.5">
                          <Phone className="w-3 h-3" />
                          <span>Call</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Accordion toggle footer */}
                <div className="mt-2 text-right">
                  <button
                    onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                    className="text-[11px] font-semibold text-stone-500 hover:text-stone-800 inline-flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'View Full Details'}</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
