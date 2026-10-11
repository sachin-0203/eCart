# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Product administration

Open `/admin/products` to manage the catalog. The admin pages use the Django
REST Framework product endpoints at `/api/products/` for listing, creating,
updating, and deleting products. Configure the backend URL with
`VITE_BACKEND_URL` in a local `frontend/.env.local` file; see
`frontend/.env.example`.

Backend settings and secrets are read from `backend/.env`. Copy
`backend/.env.example` to `backend/.env` and set the secret key and database
credentials for your environment. Install `backend/requirements.txt` before
starting Django. Allowed frontend origins are configured with
`CORS_ALLOWED_ORIGINS` (comma-separated); local Vite origins are the default.

Product fields in the form follow the backend `Product` model. Image uploads
are not included because the product API serializer does not expose product
images.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
