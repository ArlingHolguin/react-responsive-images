# React Responsive Images

Componente React para mostrar imágenes responsivas usando `<picture>` con soporte para diferentes formatos y tamaños.

---

## 🚀 Instalación

```bash
npm install react-responsive-images
```

---

## 🧱 Uso básico

```tsx
import { SourceSet } from "react-responsive-images";

const imageSet = [
  {
    max: 768,
    image: [
      { format: "webp", src: "/img-small.webp", width: 480, height: 300 },
      { format: "jpeg", src: "/img-small.jpg", width: 480, height: 300 },
    ],
  },
  {
    image: [
      { format: "webp", src: "/img-large.webp", width: 1200, height: 800 },
      { format: "jpeg", src: "/img-large.jpg", width: 1200, height: 800 },
    ],
  },
];

export function Example() {
  return (
    <SourceSet
      alt="Ejemplo de imagen"
      defaultCase={{
        format: "jpeg",
        src: "/img-default.jpg",
        width: 800,
        height: 600,
      }}
      imgs={imageSet}
      lazy
    />
  );
}
```

---

## 🧩 Uso en Laravel + React (Inertia)

Si estás usando Laravel 12 con React y tienes productos con una sola imagen (por ejemplo, desde `/storage`), puedes enviar la imagen desde el controlador así:

### Laravel Controller

```php
return Inertia::render('Products/Index', [
    'products' => Product::all()->map(function ($product) {
        return [
            'id' => $product->id,
            'name' => $product->name,
            'image' => [
                'format' => 'jpeg',
                'src' => asset('storage/img/' . $product->image),
                'width' => 800,
                'height' => 600,
            ],
        ];
    }),
]);
```

### React Component

```tsx
import { SourceSet } from "react-responsive-images";

export default function ProductsIndex({ products }) {
  return (
    <div className="grid grid-cols-2 gap-6 p-8">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded">
          <h2 className="text-lg font-bold mb-2">{product.name}</h2>
          <SourceSet
            alt={product.name}
            defaultCase={product.image}
            imgs={[{ image: [product.image] }]}
          />
        </div>
      ))}
    </div>
  );
}
```

---

## 📝 Requisitos

Este componente requiere tener instaladas las siguientes dependencias en tu proyecto:

```json
"peerDependencies": {
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```

---

## 📄 Licencia

MIT
