import { useRef } from 'react';

const MAX_IMAGE_SIZE = 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('Não foi possível pré-visualizar esta imagem.'));
        return;
      }
      resolve({ dataUrl: reader.result, name: file.name });
    };
    reader.onerror = () => reject(new Error('Não foi possível abrir esta imagem.'));
    reader.readAsDataURL(file);
  });
}

function ImageUploadField({ id, label, image, onChange, onError }) {
  const inputRef = useRef(null);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      onError('Selecione uma imagem JPG, PNG ou WEBP.');
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      onError('A imagem deve ter no máximo 1 MB.');
      return;
    }

    try {
      onChange(await readImage(file));
      onError('');
    } catch (error) {
      onError(error.message);
    }
  }

  return (
    <div className="my-data-field my-data-image-field">
      <span className="my-data-label" id={`${id}-label`}>
        {label}
      </span>
      <div className="my-data-image-control">
        <div className="my-data-image-preview">
          {image ? (
            <img src={image.dataUrl} alt={`Pré-visualização: ${label}`} />
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 21v-1.5a7 7 0 0 1 14 0V21z" />
            </svg>
          )}
        </div>
        <div className="my-data-image-actions">
          <input
            ref={inputRef}
            className="my-data-file-input"
            id={id}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            aria-labelledby={`${id}-label`}
            onChange={handleFileChange}
          />
          <button
            className="my-data-upload-button"
            type="button"
            onClick={() => inputRef.current?.click()}
          >
            {image ? 'Trocar imagem' : 'Enviar imagem'}
          </button>
          {image && (
            <button
              className="my-data-remove-button"
              type="button"
              onClick={() => {
                onChange(null);
                onError('');
              }}
            >
              Remover
            </button>
          )}
          <span className="my-data-image-hint">JPG, PNG ou WEBP · até 1 MB</span>
        </div>
      </div>
    </div>
  );
}

export default ImageUploadField;
