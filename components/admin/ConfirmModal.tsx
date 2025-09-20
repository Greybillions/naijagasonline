'use client';
export default function ConfirmModal({
  open, title, description, confirmText='Confirm', cancelText='Cancel',
  onConfirm, onClose,
}:{
  open: boolean; title: string; description: string;
  confirmText?: string; cancelText?: string;
  onConfirm: () => Promise<void> | void; onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">{title}</h2>
        <p className="text-sm text-gray-600 mb-6">{description}</p>
        <div className="flex justify-center gap-3">
          <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded">
            {cancelText}
          </button>
          <button onClick={() => void onConfirm()} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
