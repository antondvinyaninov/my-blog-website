import { useState, useEffect, useRef } from 'react';
import { X, Check, Upload } from 'lucide-react';

interface MediaLibraryProps {
  onSelect: (url: string) => void;
  onClose: () => void;
  selectedUrl?: string;
}

interface MediaItem {
  name: string;
  url: string;
  size: number;
  modified: string;
}

export default function MediaLibrary({ onSelect, onClose, selectedUrl }: MediaLibraryProps) {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(selectedUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadImages = () => {
    setLoading(true);
    fetch('/api/media.json')
      .then(res => res.json())
      .then(data => {
        setImages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading images:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        alert(`✅ Изображение загружено!\nРазмер: ${Math.round(result.size / 1024)}KB\nЭкономия: ${result.savings}%`);
        loadImages(); // Перезагружаем список
        setSelected(result.url); // Автоматически выбираем загруженное изображение
      } else {
        alert(`❌ Ошибка: ${result.message}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ Ошибка при загрузке изображения');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSelect = () => {
    if (selected) {
      onSelect(selected);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Выбрать изображение</h3>
          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Upload size={18} />
              {uploading ? 'Загрузка...' : 'Загрузить'}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-500">Загрузка изображений...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">Нет изображений</p>
              <p className="text-sm text-slate-400 mt-2">Добавьте изображения в папку public/images/</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img) => (
                <div
                  key={img.url}
                  onClick={() => setSelected(img.url)}
                  className={`group relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    selected === img.url
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  {selected === img.url && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-white text-xs truncate">{img.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {selected ? 'Изображение выбрано' : 'Выберите изображение'}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleSelect}
              disabled={!selected}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Выбрать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
