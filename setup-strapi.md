
# Strapi Setup Instructions

## 1. Install Strapi

```bash
cd /Users/suibrahi/Desktop/Interview_task
npx create-strapi-app@latest strapi-backend --quickstart
```

## 2. Start Strapi

```bash
cd strapi-backend
npm run develop
```

## 3. Create Admin User
- Visit: http://localhost:1337/admin
- Create your admin account

## 4. Create Content Types

### Team Members
- Go to Content-Type Builder
- Create Collection Type: "Team Member"
- Add fields:
  - name (Text, Required)
  - role (Text, Required) 
  - bio (Long Text)
  - image (Media, Single)
  - social_links (JSON)

### Services
- Create Collection Type: "Service"
- Add fields:
  - title (Text, Required)
  - slug (UID, Target: title)
  - description (Long Text)
  - icon (Media, Single)

### Testimonials
- Create Collection Type: "Testimonial"
- Add fields:
  - name (Text, Required)
  - position (Text, Required)
  - company (Text)
  - testimonial (Long Text, Required)
  - image (Media, Single)

### Subscribers
- Create Collection Type: "Subscriber"
- Add fields:
  - email (Email, Required, Unique)
  - subscribed_at (DateTime)

## 5. Set Permissions
- Go to Settings → Users & Permissions Plugin → Roles → Public
- Enable permissions for:
  - Team Member: find, findOne
  - Service: find, findOne
  - Testimonial: find, findOne
  - Subscriber: create

## 6. Add Sample Data

### Team Members
```json
{
  "name": "Alex Johnson",
  "role": "Senior Developer",
  "bio": "Passionate full-stack developer with 8+ years of experience.",
  "social_links": {
    "linkedin": "https://linkedin.com/in/alex",
    "github": "https://github.com/alex"
  }
}
```

### Services
```json
{
  "title": "Legal Consultation Services",
  "description": "Professional legal advice and consultation"
}
```

### Testimonials
```json
{
  "name": "Mohammed Saif",
  "position": "CEO/Company",
  "company": "Al Safar and Partners",
  "testimonial": "With the help of the hospitable staff of Al Safar and Partners I was able to get my work done without any hassle."
}
```

## 7. Test API
- Visit: http://localhost:1337/api/team-members
- Should return your data

## 8. Connect to Frontend
Your Next.js app is already configured to use Strapi!
