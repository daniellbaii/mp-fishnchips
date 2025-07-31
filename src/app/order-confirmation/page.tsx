'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';
import { Order } from '@/types/menu';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (!orderId) {
      router.push('/menu');
      return;
    }

    try {
      if (typeof window === 'undefined') {
        router.push('/menu');
        return;
      }
      
      const orders = JSON.parse(localStorage.getItem('mp-fishnchips-orders') || '[]');
      const foundOrder = orders.find((o: Order) => o.id === orderId);
      
      if (!foundOrder) {
        router.push('/menu');
        return;
      }

      setOrder(foundOrder);
    } catch (error) {
      console.error('Error loading order:', error);
      router.push('/menu');
    } finally {
      setLoading(false);
    }
  }, [orderId, router]);

  if (loading) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!order) {
    return null;
  }

  const pickupTime = order.pickupTime ? new Date(order.pickupTime) : null;
  const estimatedReadyTime = pickupTime || new Date(new Date(order.createdAt).getTime() + 15 * 60000);

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">Thank you for your order, {order.customerInfo.name}</p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Confirmed
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium text-gray-800">{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Time:</span>
              <span className="font-medium text-gray-800">
                {new Date(order.createdAt).toLocaleString('en-AU')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Ready Time:</span>
              <span className="font-medium text-accent-600">
                {estimatedReadyTime.toLocaleTimeString('en-AU', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium text-gray-800">
                {order.paymentMethod === 'cash' ? 'Cash on pickup' : 'Card payment'}
              </span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Order</h3>
          
          <div className="space-y-4">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{item.menuItem.name}</h4>
                  {item.customizations.length > 0 && (
                    <div className="text-sm text-gray-600 mt-1">
                      {item.customizations.map(custom => (
                        <div key={`${custom.customizationId}-${custom.optionId}`}>
                          • {custom.name}
                          {custom.priceModifier !== 0 && (
                            <span className="text-gray-500">
                              {' '}({custom.priceModifier > 0 ? '+' : ''}${custom.priceModifier.toFixed(2)})
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-800">${item.totalPrice.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between text-lg font-semibold text-gray-800">
              <span>Total</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
          
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Name: </span>
              <span className="font-medium text-gray-800">{order.customerInfo.name}</span>
            </div>
            <div>
              <span className="text-gray-600">Phone: </span>
              <span className="font-medium text-gray-800">{order.customerInfo.phone}</span>
            </div>
            {order.customerInfo.email && (
              <div>
                <span className="text-gray-600">Email: </span>
                <span className="font-medium text-gray-800">{order.customerInfo.email}</span>
              </div>
            )}
            {order.customerInfo.notes && (
              <div>
                <span className="text-gray-600">Special Instructions: </span>
                <span className="font-medium text-gray-800">{order.customerInfo.notes}</span>
              </div>
            )}
          </div>
        </div>

        {/* Pickup Information */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <span>📍</span>
            Pickup Location
          </h3>
          
          <div className="text-blue-700 space-y-1">
            <p className="font-medium">Mount Pleasant Fish & Chips</p>
            <p>123 Canning Highway</p>
            <p>Mount Pleasant WA 6153</p>
            <p className="font-medium mt-2">📞 (08) 9123 4567</p>
          </div>

          <div className="mt-4 p-3 bg-white rounded border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Please note:</strong> We&apos;ll call you when your order is ready for pickup. 
              If you arrive early, your order may still be cooking!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/menu"
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold text-center transition-colors duration-200"
          >
            Order Again
          </Link>
          <Link 
            href="/"
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold text-center transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>

        {/* Receipt Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Keep this confirmation for your records.</p>
          <p>Show this order number when collecting: <strong>{order.id}</strong></p>
        </div>
      </div>
    </PageLayout>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <PageLayout>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      </PageLayout>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}