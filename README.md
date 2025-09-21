# NextJS CMS for Dynamic Content Management

This project is a modern Content Management System (CMS) built with Next.js, designed to streamline website content management with a focus on SEO optimization and dynamic content updates. Leveraging Next.js features like Incremental Static Regeneration (ISR) and on-demand revalidation, this CMS allows users to manage categories and pages without code changes or rebuilding, ensuring instant content updates and optimal SEO performance.

## Features

- **Dynamic Content Management**: Create, update, and delete categories and pages effortlessly through an intuitive interface.
- **SEO Optimization**: Built-in tools for on-page SEO and content-specific SEO to enhance search engine visibility.
- **Incremental Static Regeneration (ISR)**: Automatically regenerate static pages at runtime without rebuilding the entire site, ensuring fresh content with minimal latency. Learn more about [Next.js ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating#incremental-static-regeneration-isr).
- **On-Demand Revalidation**: Trigger revalidation of specific pages or paths instantly via API routes, ensuring immediate content updates. See [Next.js On-Demand Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating#on-demand-revalidation) for details.
- **Drag-and-Drop Interface**: Reorder content or categories with a seamless drag-and-drop experience.
- **Authenticated User Management**: Secure access to the CMS with role-based authentication.
- **Responsive Design**: Fully responsive UI for managing content across devices.

## Screenshots

### CMS - Unauthenticated Homepage
Displays the CMS landing page for unauthenticated users.
![Unauthenticated Homepage](https://github.com/user-attachments/assets/d41005fe-1cb4-4609-8ad6-c36f8c718e9d)

### CMS - Authenticated Homepage
Shows the dashboard for authenticated users with access to content management tools.
![Authenticated Homepage](https://github.com/user-attachments/assets/8c4ffd15-7979-4d5f-952c-96a2910ede66)

### CMS - Category Creation and Category Page
Interface for creating and managing categories, including page organization.
![Category Creation](https://github.com/user-attachments/assets/a2bafebb-050d-431c-96c1-3fd458b83574)

### CMS - Category Page On-Page SEO
Tools to optimize on-page SEO elements like meta tags and descriptions.
![On-Page SEO](https://github.com/user-attachments/assets/1614df06-111f-4252-a22f-6d2ccd46f2df)

### CMS - Category Page Content SEO
Manage content-specific SEO settings for better search engine rankings.
![Content SEO](https://github.com/user-attachments/assets/ec4bc9fd-7714-4ad3-a947-77f2bb020efd)

### Website - Categories Page
Public-facing page listing all categories, optimized for user navigation.
![Categories Page](https://github.com/user-attachments/assets/0b24f4e7-403e-4444-a3a7-1628d8232c92)

### Website - Category Page
Displays all pages within a specific category, such as "Deadpool Movies."
![Category Page](https://github.com/user-attachments/assets/b48afe50-37a8-4307-bc3f-4eb3f1042f9f)

### Website - Category Page Hero Section
Visually appealing hero section for category pages, enhancing user engagement.
![Hero Section](https://github.com/user-attachments/assets/d05eb62b-2070-466e-8b79-c91f84a7991c)

## Tech Stack and Integrations

This CMS is built with a modern JavaScript ecosystem to ensure performance, scalability, and developer-friendly workflows:

- **[NextAuth.js](https://next-auth.js.org/)**: Provides secure authentication with support for multiple providers and role-based access control.
- **[Cloudinary](https://cloudinary.com/)**: Manages and optimizes media assets, enabling fast image and video delivery.
- **[Shadcn/UI](https://ui.shadcn.com/)**: A collection of reusable, customizable UI components for a polished and consistent interface.
- **[Prisma](https://www.prisma.io/)**: A modern ORM for database management, ensuring type-safe queries and seamless data modeling.
- **[Tanstack/React-Query](https://tanstack.com/query)**: Handles data fetching, caching, and synchronization for efficient and responsive data management.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid and responsive UI development.
- **[React-DnD](https://react-dnd.github.io/react-dnd/)**: Implements drag-and-drop functionality for intuitive content reordering.
- **[Zod](https://zod.dev/)**: Type-safe schema validation for forms and API inputs, integrated with **[React Hook Form](https://react-hook-form.com/)** for robust form handling.

## Use Case

This CMS is designed for website owners and content managers who need a seamless solution to maintain dynamic content without touching the codebase. By leveraging Next.js ISR and on-demand revalidation, the system ensures that content updates are reflected instantly on the live site, maintaining optimal SEO performance and user experience. For example, creating a new category like "Deadpool Movies" or updating a page's SEO settings can be done in real-time without redeploying the application.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the root directory and add the required environment variables:
   ```env
   GOOGLE_ID =
   GOOGLE_SECRET =
   NEXTAUTH_URL = http://localhost:3000
   NEXTAUTH_URL_INTERNAL = http://localhost:3000
   NEXTAUTH_SECRET = random_secret
   AUTH_USERS = ["email", "email2"]
   DATABASE_URL= MONGO_URL

   PUBLIC_KEY = IMAGEKIT_PUBLIC_KEY
   PRIVATE_KEY = IMAGEKIT_PRIVATE_KEY
   URL_ENDPOINT= IMAGEKIT_URL
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the CMS.

5. **Build for Production**:
   ```bash
   npm run build
   npm run start
   ```

## Usage

1. **Authentication**: Log in using the NextAuth.js-powered authentication system to access the CMS dashboard.
2. **Content Management**: Use the dashboard to create categories, add pages, and configure SEO settings.
3. **Drag-and-Drop**: Reorder categories or pages using the drag-and-drop interface.
4. **SEO Optimization**: Edit on-page and content-specific SEO settings to improve search engine rankings.
5. **Content Updates**: Leverage ISR and on-demand revalidation to update content instantly without rebuilding.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
