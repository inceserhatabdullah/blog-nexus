src/
├── core/ # Uygulamanın Altyapısı (Motor)
│ ├── config/ # Environment ve Uygulama Ayarları
│ │ └── app-config.ts
│ ├── database/ # Veritabanı Bağlantısı ve Prisma
│ │ ├─ generated/ # Prisma generated dosyaları
│ │ ├── prisma.service.ts
│ │ └── database.module.ts
│ ├── enums/ # Sabit Değerler ve Enumlar
│ │ └── authorities.ts # (Admin, Editor, Guest vb.)
│ └── filters/ # Global Hata Yakalayıcılar (Opsiyonel)
│
├── modules/ # İş Mantığı ve Özellikler (Feature Modules)
│ └── auth/ # Kimlik Doğrulama Modülü
│ ├── dto/ # Data Transfer Objects (LoginDto, RegisterDto)
│ ├── strategies/ # JWT Stratejileri (Passport)
│ ├── auth.controller.ts
│ ├── auth.service.ts
│ └── auth.module.ts
│
├── app.module.ts # Tüm modüllerin toplandığı ana merkez
└── main.ts # Uygulamanın giriş noktası (Fastify, Prefix, Port)
