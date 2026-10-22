import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  RotateCcw, 
  FileText, 
  ExternalLink,
  MapPin,
  AlertCircle,
  XCircle,
  ShoppingBag
} from 'lucide-react';

export const BuyerOrdersTab: React.FC = () => {
  const { 
    buyerOrders, 
    cancelOrder, 
    reorder, 
    setBuyerTab, 
    setSelectedProductId,
    setCurrentScreen,
    addToast 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedOrderReceipt, setSelectedOrderReceipt] = useState<Order | null>(null);

  const filteredOrders = buyerOrders.filter(order => {
    if (activeFilter === 'active') {
      return order.status === 'pending' || order.status === 'accepted' || order.status === 'shipped';
    }
    if (activeFilter === 'completed') {
      return order.status === 'delivered';
    }
    return true;
  });

  const getStepNumber = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 1;
      case 'accepted': return 2;
      case 'shipped': return 3;
      case 'delivered': return 4;
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-5 rounded-3xl shadow-md">
        <h2 className="text-xl font-bold font-display">My Orders</h2>
        <p className="text-pink-100 text-xs mt-0.5">
          Track boutique deliveries, view receipts & manage returns
        </p>

        {/* Filter Pills */}
        <div className="flex gap-2 mt-4 text-xs font-semibold">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeFilter === 'all'
                ? 'bg-white text-pink-600 shadow-sm'
                : 'bg-pink-600/50 text-white hover:bg-pink-600'
            }`}
          >
            All Orders ({buyerOrders.length})
          </button>
          <button
            onClick={() => setActiveFilter('active')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeFilter === 'active'
                ? 'bg-white text-pink-600 shadow-sm'
                : 'bg-pink-600/50 text-white hover:bg-pink-600'
            }`}
          >
            In Progress ({buyerOrders.filter(o => o.status !== 'delivered').length})
          </button>
          <button
            onClick={() => setActiveFilter('completed')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeFilter === 'completed'
                ? 'bg-white text-pink-600 shadow-sm'
                : 'bg-pink-600/50 text-white hover:bg-pink-600'
            }`}
          >
            Delivered ({buyerOrders.filter(o => o.status === 'delivered').length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-stone-200/80 p-6 space-y-3">
            <div className="w-14 h-14 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-bold text-stone-900">No Orders in this category</h3>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Explore authentic handcrafted dresses, jewelry & fashion pieces from indie boutiques.
            </p>
            <button
              onClick={() => setBuyerTab('home')}
              className="px-5 py-2.5 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              Explore Boutiques
            </button>
          </div>
        ) : (
          filteredOrders.map(order => {
            const step = getStepNumber(order.status);

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-stone-200/80 p-4 sm:p-5 shadow-sm hover:border-pink-200 transition-all space-y-4"
              >
                {/* Header Info */}
                <div className="flex items-start justify-between border-b border-stone-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-stone-900">
                        {order.orderNumber}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        order.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        order.status === 'shipped' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        order.status === 'accepted' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-400 block mt-0.5">
                      Placed on {order.orderDate}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedOrderReceipt(order)}
                    className="text-[11px] text-pink-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Receipt</span>
                  </button>
                </div>

                {/* Tracking Progress Bar */}
                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-stone-700">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-pink-600" />
                      Status: {
                        order.status === 'pending' ? 'Order Received · Boutique reviewing' :
                        order.status === 'accepted' ? 'Accepted · Packing in progress' :
                        order.status === 'shipped' ? 'Dispatched · In Transit' :
                        'Delivered to your address'
                      }
                    </span>
                    {order.trackingNo && (
                      <span className="font-mono text-[10px] text-pink-600 bg-pink-100/60 px-2 py-0.5 rounded">
                        {order.trackingNo}
                      </span>
                    )}
                  </div>

                  {/* 4 Steps timeline visual */}
                  <div className="relative pt-2">
                    <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-500"
                        style={{ width: `${(step / 4) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] text-stone-400 mt-1 font-semibold">
                      <span className={step >= 1 ? 'text-pink-600' : ''}>Placed</span>
                      <span className={step >= 2 ? 'text-pink-600' : ''}>Packed</span>
                      <span className={step >= 3 ? 'text-pink-600' : ''}>Shipped</span>
                      <span className={step >= 4 ? 'text-emerald-600 font-bold' : ''}>Delivered</span>
                    </div>
                  </div>
                </div>

                {/* Ordered Items Preview */}
                <div className="space-y-2.5">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedProductId(item.product.id);
                        setCurrentScreen('buyer_product_detail');
                      }}
                      className="flex gap-3 items-center p-2 rounded-2xl hover:bg-pink-50/30 transition-colors cursor-pointer group"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-xl object-cover bg-pink-50 shrink-0 border border-stone-100"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-stone-400 block">{item.product.boutiqueName || 'Boutique'}</span>
                        <h4 className="text-xs font-bold text-stone-900 truncate group-hover:text-pink-600 transition-colors">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          Qty: {item.quantity} · {item.selectedSize || 'Standard'} · {item.selectedColor || 'Standard'}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-stone-900 tabular-nums">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <ChevronRight className="w-4 h-4 text-stone-300 ml-auto mt-1" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Actions */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <div className="text-xs text-stone-600">
                    Total: <span className="font-extrabold text-pink-600 text-sm tabular-nums">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-[11px] font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                    )}

                    <button
                      onClick={() => reorder(order)}
                      className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Buy Again</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Order Receipt Modal */}
      {selectedOrderReceipt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] text-pink-600 font-bold uppercase tracking-wider block">Official Receipt</span>
                <h3 className="text-sm font-bold text-stone-900">Order {selectedOrderReceipt.orderNumber}</h3>
              </div>
              <button
                onClick={() => setSelectedOrderReceipt(null)}
                className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-stone-600">
              <div className="flex justify-between">
                <span>Date Placed:</span>
                <span className="font-semibold text-stone-900">{selectedOrderReceipt.orderDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Buyer Name:</span>
                <span className="font-semibold text-stone-900">{selectedOrderReceipt.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Contact Phone:</span>
                <span className="font-semibold text-stone-900">{selectedOrderReceipt.customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Address:</span>
                <span className="font-semibold text-stone-900 text-right truncate max-w-[170px]">
                  {selectedOrderReceipt.address.street}, {selectedOrderReceipt.address.city}
                </span>
              </div>
            </div>

            <div className="border-t border-stone-100 pt-2 space-y-1.5">
              <span className="font-bold text-stone-800 block text-[11px]">Items:</span>
              {selectedOrderReceipt.items.map((i, idx) => (
                <div key={idx} className="flex justify-between text-stone-600">
                  <span>{i.product.name} (x{i.quantity})</span>
                  <span className="font-bold text-stone-900 tabular-nums">₹{(i.price * i.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-100 pt-2 flex justify-between font-bold text-sm text-stone-900">
              <span>Total Paid:</span>
              <span className="text-pink-600 tabular-nums">₹{selectedOrderReceipt.totalAmount.toLocaleString('en-IN')}</span>
            </div>

            <button
              onClick={() => {
                addToast({ title: 'Invoice Downloaded', message: 'PDF receipt saved to downloads.', type: 'success' });
                setSelectedOrderReceipt(null);
              }}
              className="w-full py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
            >
              Download PDF Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
