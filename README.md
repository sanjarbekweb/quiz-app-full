# Quiz Question Manager

A Vite frontend and Express backend for viewing, adding, editing, and deleting quiz questions. The backend stores questions in `backend/questions.json`.

## Run locally

Use Node.js 22.12+ and npm. From the repository root:

```sh
npm install --prefix backend
npm install --prefix frontend
```

Start these in separate terminals:

```sh
npm run dev --prefix backend
npm run dev --prefix frontend
```

The backend listens on **5000**. Open Vite's printed URL for the frontend.

The root `npm run dev` currently calls a nonexistent backend `start` script. Use the commands above until that script is fixed.

## API

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/questions` | List questions |
| POST | `/api/questions` | Add `question`, `options`, and `answer` fields |
| PUT | `/api/questions/:id` | Update an existing question |
| DELETE | `/api/questions/:id` | Delete a question |

## Project layout

- `backend/server.js` — routes and JSON file persistence.
- `backend/questions.json` — editable question data.
- `frontend/src/main.js` — question management UI.
- `frontend/src/style.css` — presentation.
- `frontend/vite.config.js` — development proxy configuration.

The active frontend requests use absolute `http://localhost:5000` URLs; changing the Vite proxy alone will not change those requests.

## Build and limitations

Use `npm run build --prefix frontend` and `npm run preview --prefix frontend` to build and preview the UI. Keep the backend running.

File writes are not coordinated for concurrent clients, IDs are derived from array length, and there is no authentication or comprehensive input validation. Use this as a local CRUD exercise. No automated tests are configured. See [LICENSE](LICENSE).
