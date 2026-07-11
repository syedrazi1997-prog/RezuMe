import { useState } from 'react';
import { X, Download, Lock, Check, Loader2, CreditCard, Shield } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeId: string | null;
  onPaid: () => void;
}

declare global {
  interface Window {
    Razorpay?: any;
  }
}

export default function PaymentModal({ isOpen, onClose, resumeId, onPaid }: PaymentModalProps) {
  const [status, setStatus] = useState<'idle' | 'processing' | 'verifying' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePay = async () => {
    setStatus('processing');
    setError('');
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-razorpay-order`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ resumeId }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `Payment service unavailable (${response.status})`);
      }

      const { orderId, amount, currency, keyId, alreadyPaid } = await response.json();

      if (alreadyPaid) {
        setStatus('success');
        onPaid();
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || !window.Razorpay) {
        throw new Error('Failed to load Razorpay checkout. Please check your connection.');
      }

      setStatus('verifying');

      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: 'RezuMe',
        description: 'Resume PDF Download',
        order_id: orderId,
        handler: async (response: any) => {
          try {
            const verifyUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-razorpay-payment`;
            const verifyResp = await fetch(verifyUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              },
              body: JSON.stringify({
                resumeId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            if (!verifyResp.ok) {
              const body = await verifyResp.json().catch(() => ({}));
              throw new Error(body.error || 'Payment verification failed');
            }

            setStatus('success');
            onPaid();
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Payment verification failed');
            setStatus('error');
          }
        },
        modal: {
          ondismiss: () => {
            setStatus('idle');
          },
        },
        theme: {
          color: '#0d9488',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (resp: any) => {
        setError(resp.error?.description || 'Payment failed. Please try again.');
        setStatus('error');
      });
      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
              <Check className="w-8 h-8 text-emerald-600" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-2">Payment Successful!</h2>
            <p className="text-stone-600 mb-6">Your resume is now unlocked for download.</p>
            <button
              onClick={() => {
                onClose();
                setTimeout(() => window.print(), 300);
              }}
              className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors flex items-center gap-2 mx-auto"
            >
              <Download className="w-5 h-5" />
              Download PDF Now
            </button>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mx-auto mb-4">
                <Download className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h2 className="text-xl font-bold text-white mb-1">Download Your Resume</h2>
              <p className="text-teal-100 text-sm">Pay just ₹1 to unlock PDF download</p>
            </div>

            <div className="p-6">
              <div className="bg-stone-50 rounded-xl p-4 mb-5 border border-stone-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-stone-600">Resume PDF Download</span>
                  <span className="text-2xl font-bold text-stone-900">₹1</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} />
                  Professional PDF export
                  <Check className="w-3.5 h-3.5 text-emerald-500 ml-2" strokeWidth={3} />
                  ATS-friendly format
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                onClick={handlePay}
                disabled={status === 'processing' || status === 'verifying'}
                className="w-full py-3.5 bg-stone-900 text-white font-semibold rounded-xl hover:bg-stone-800 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'processing' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating order...
                  </>
                ) : status === 'verifying' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Complete payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Pay ₹1 & Download
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-stone-400">
                <Shield className="w-3.5 h-3.5" />
                Secured by Razorpay
                <Lock className="w-3 h-3 ml-1" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
