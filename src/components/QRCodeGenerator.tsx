import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sessionAPI } from '../api';
import { SessionDto, QrTokenResponse } from '../types/api';
import QRCode from 'qrcode';

interface QRCodeGeneratorProps {
  session: SessionDto;
  onClose: () => void;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ session, onClose }) => {
  const [qrData, setQrData] = useState<QrTokenResponse | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [validityMinutes, setValidityMinutes] = useState(10);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [showExistingQR, setShowExistingQR] = useState(false);

  // Check if session has started
  const sessionStartTime = new Date(session.startTime).getTime();
  const now = Date.now();
  const sessionHasStarted = now >= sessionStartTime;
  const timeUntilStart = Math.max(0, Math.floor((sessionStartTime - now) / 1000));

  // Load existing QR code if available
  useEffect(() => {
    const loadExistingQR = async () => {
      if (session.qrToken && session.qrTokenActive && session.qrTokenExpiresAt) {
        setShowExistingQR(true);
        const mockData: QrTokenResponse = {
          sessionId: session.id,
          qrToken: session.qrToken,
          checkInUrl: `${window.location.origin}/check-in?token=${session.qrToken}`,
          expiresAt: session.qrTokenExpiresAt,
        };
        setQrData(mockData);
        
        const url = await QRCode.toDataURL(JSON.stringify({
          sessionId: session.id,
          qrToken: session.qrToken,
        }), {
          width: 400,
          margin: 2,
        });
        setQrCodeUrl(url);
        
        // Calculate time remaining based on start time, not expiry
        const sessionStart = new Date(session.startTime).getTime();
        const expiresAt = new Date(session.qrTokenExpiresAt).getTime();
        const now = Date.now();
        
        // Time remaining is from start time to expiry
        const totalDuration = expiresAt - sessionStart;
        const elapsed = now - sessionStart;
        const remaining = Math.max(0, Math.floor((totalDuration - elapsed) / 1000));
        setTimeRemaining(remaining);
      }
    };
    loadExistingQR();
  }, [session]);

  const generateMutation = useMutation({
    mutationFn: ({ sessionId, validity }: { sessionId: number; validity: number }) =>
      sessionAPI.generateQR(sessionId, validity),
    onSuccess: async (data) => {
      setQrData(data);
      setShowExistingQR(false);
      const url = await QRCode.toDataURL(JSON.stringify({
        sessionId: session.id,
        qrToken: data.qrToken,
      }), {
        width: 400,
        margin: 2,
      });
      setQrCodeUrl(url);
      
      // Calculate time remaining based on start time
      const sessionStart = new Date(session.startTime).getTime();
      const expiresAt = new Date(data.expiresAt).getTime();
      const now = Date.now();
      
      // Time remaining from start time to expiry
      const totalDuration = expiresAt - sessionStart;
      const elapsed = now - sessionStart;
      const remaining = Math.max(0, Math.floor((totalDuration - elapsed) / 1000));
      setTimeRemaining(remaining);
    },
  });

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  const handleGenerate = () => {
    generateMutation.mutate({ sessionId: session.id, validity: validityMinutes });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">QR Code for Attendance</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>

        <div className="mb-4 p-4 bg-gray-50 rounded">
          <div className="font-semibold">{session.courseCode} - {session.courseTitle}</div>
          <div className="text-sm text-gray-600">
            {new Date(session.sessionDate).toLocaleDateString()} | {' '}
            {new Date(session.startTime).toLocaleTimeString()} - {' '}
            {new Date(session.endTime).toLocaleTimeString()}
          </div>
        </div>

        {!sessionHasStarted && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <div className="text-yellow-800 font-medium">Session hasn't started yet</div>
            <div className="text-sm text-yellow-600 mt-1">
              Starts in: {formatTime(timeUntilStart)}
            </div>
          </div>
        )}

        {!qrData && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                QR Code Validity (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={validityMinutes}
                onChange={(e) => setValidityMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={generateMutation.isPending || !sessionHasStarted}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {generateMutation.isPending ? 'Generating...' : 'Generate QR Code'}
            </button>
            {!sessionHasStarted && (
              <p className="text-sm text-gray-500 text-center">
                QR code can only be generated after session starts
              </p>
            )}
          </div>
        )}

        {qrData && qrCodeUrl && sessionHasStarted && (
          <div className="space-y-4">
            {showExistingQR && (
              <div className="bg-purple-50 border border-purple-200 rounded p-3 text-sm text-purple-700">
                Viewing existing QR code
              </div>
            )}
            
            <div className="flex justify-center">
              <img src={qrCodeUrl} alt="QR Code" className="border-4 border-blue-600 rounded" />
            </div>

            <div className="text-center">
              {timeRemaining > 0 ? (
                <div className="text-lg font-semibold text-green-600">
                  Time Remaining: {formatTime(timeRemaining)}
                </div>
              ) : (
                <div className="text-lg font-semibold text-red-600">
                  QR Code Expired
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded text-sm">
              <div className="font-medium mb-2">Check-in URL:</div>
              <div className="break-all text-gray-600">{qrData.checkInUrl}</div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleGenerate}
                disabled={!sessionHasStarted}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Regenerate
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
