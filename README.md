# Company Portfolio

A modern, responsive multilingual website built with Next.js 14, TypeScript, and Strapi CMS. Features Arabic (RTL) and English (LTR) language support, dynamic content management, and professional legal firm design.

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd Interview_task
npm install
```

### 2. Start Frontend
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### 3. Setup Strapi Backend
```bash
# In a new terminal
npx create-strapi-app@latest strapi-backend --quickstart
cd strapi-backend
npm run develop
```

### 4. Admin Access
**Strapi Admin Panel**: `http://localhost:1338/admin`

**Demo Credentials** (for testing):
- **Email**: `admin@admin.com`
- **Password**: `admin@123`

> ⚠️ **Note**: These are demo credentials for testing only. Create your own admin account in production.

## ✨ Features

### Frontend Features
- **Multilingual Support**: Arabic (RTL) and English (LTR)
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Dynamic Content**: Strapi CMS integration
- **Video Backgrounds**: Hero section with dynamic media
- **Interactive Components**: Services dropdown, team carousel, testimonials
- **Search Functionality**: Global search across content
- **Newsletter Subscription**: With duplicate prevention

### Backend Features (Strapi)
- **Content Types**: Team Members, Services, Testimonials, Videos, Subscribers
- **Media Management**: Images and videos
- **RESTful API**: With population queries
- **Admin Panel**: User-friendly interface

## 🛠️ Tech Stack

```
Frontend:
├── Next.js 14 (App Router)
├── TypeScript
├── Tailwind CSS
├── Redux Toolkit
├── next-intl (i18n)
├── Formik + Yup (Forms)
└── React Hot Toast

Backend:
├── Strapi v5
├── SQLite (Development)
├── Media Library
└── REST API
```

## 📊 API Endpoints

### Frontend URLs
- **Homepage**: `http://localhost:3000/en` or `http://localhost:3000/ar`
- **Services**: `http://localhost:3000/en/services`
- **Service Detail**: `http://localhost:3000/en/services/[slug]`

### Strapi API
- **Team Members**: `GET /api/team-members?populate=*`
- **Services**: `GET /api/services?populate=*`
- **Testimonials**: `GET /api/testimonials?populate=*`
- **Videos**: `GET /api/videos?populate=*`
- **Subscribers**: `POST /api/subscribers`

## 🔧 Content Types Setup

After starting Strapi, create these content types:

### 1. Team Member
- **name** (Text, Required)
- **role** (Text, Required)
- **bio** (Long Text)
- **image** (Media, Single)
- **social_links** (JSON)

### 2. Service
- **title** (Text, Required)
- **slug** (UID, Target: title)
- **description** (Long Text)
- **content** (Long Text)
- **icon** (Media, Single)

### 3. Testimonial
- **name** (Text, Required)
- **position** (Text, Required)
- **company** (Text)
- **testimonial** (Long Text, Required)
- **image** (Media, Single)

### 4. Video
- **title** (Text)
- **description** (Long Text)
- **background** (Media, Multiple)

### 5. Subscriber
- **email** (Email, Required, Unique)
- **subscribed_at** (DateTime)

## 🔐 API Permissions

In Strapi Admin:
**Settings → Users & Permissions → Roles → Public**

Enable these permissions:
- ✅ **Team-member**: `find`, `findOne`
- ✅ **Service**: `find`, `findOne`
- ✅ **Testimonial**: `find`, `findOne`
- ✅ **Video**: `find`, `findOne`
- ✅ **Subscriber**: `create`

## 🌐 Multilingual Features

### Language Switching
- **English**: `http://localhost:3000/en`
- **Arabic**: `http://localhost:3000/ar`
- Use header language selector for switching

### RTL Support
- Automatic direction for Arabic
- Proper text alignment
- RTL-aware components

## 📱 Mobile Responsive

### Features
- Hamburger navigation menu
- Touch-friendly interactions
- Responsive typography
- Hidden/shown elements by breakpoint
- Mobile-optimized hero section

## 🔒 Error Handling

### Newsletter Subscription
- ✅ Duplicate email prevention
- ✅ Form validation
- ✅ Network error handling
- ✅ User feedback with toasts

### API Requests
- ✅ Graceful fallbacks
- ✅ Loading states
- ✅ Error notifications

## 🚀 Deployment

### Frontend
```bash
npm run build
npm start
```

### Strapi
```bash
cd strapi-backend
npm run build
npm run start
```

## 📂 Project Structure

```
Interview_task/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Header/           # Navigation
│   ├── Hero/             # Hero section
│   ├── Team/             # Team carousel
│   ├── Testimonials/     # Testimonials slider
│   ├── Footer/           # Footer with newsletter
│   └── LanguageSelector/ # Language switching
├── lib/                  # Utilities
│   └── strapi.ts         # API client
├── messages/             # i18n translations
│   ├── en.json          # English
│   └── ar.json          # Arabic
├── store/               # Redux store
│   ├── slices/          # State slices
│   └── index.ts         # Store config
├── public/              # Static assets
├── .env.local           # Environment variables
└── strapi-backend/      # Strapi CMS
```

## 🧪 Testing

### Demo Data
The application includes fallback data for testing without Strapi.

### Manual Testing
- ✅ Language switching
- ✅ Mobile navigation
- ✅ API endpoints
- ✅ Form submissions
- ✅ Video/image backgrounds
- ✅ RTL layout

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 📄 License

MIT License - Feel free to use for learning and testing.

---

**Built for demonstration purposes** 🚀

### Quick Commands
```bash
# Start development
npm run dev

# Build for production
npm run build

# Start Strapi
cd strapi-backend && npm run develop

# Install dependencies
npm install
```
