import { useEffect, useState } from "react";
import OrderCard from "../../../components/shared/userDashboard/OrderCard";
import Model from './Model';
import { fetchOrders } from "../../../api/UserDashboard/orders";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };
  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading your orders...</p>;
  }

  return (
    <div className="relative bg-[#F5F5F5] min-h-screen">
      <h1 className="text-[#2563EB] text-2xl font-bold mb-1">My Orders</h1>
      <p className="text-gray-600 mb-6">
        Track and manage all your RR Softech orders in one place
      </p>

      {/* Orders List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={() => handleViewDetails(order)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No orders found.</p>
        )}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <Model 
        selectedOrder={selectedOrder} 
        setSelectedOrder={setSelectedOrder}
        visibleTabs={['Chatting', 'Transaction', 'Payment']}
         />
      )}
    </div>
  );
}
