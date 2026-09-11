# Visitor Management

A small visitor-management dashboard built with React, TypeScript, Redux Toolkit, Tailwind CSS, and Axios.

## Deployed Link:-

https://neetu-visitortracker.netlify.app/


## Setup and execution

```bash
npm install
npm start
```

## Technology used

```bash
ReactJs
Typescript
Javascript
HTML
CSS
Reducx toolkit
Tailwind CSS
Axios
```

## Recorded Video:-
 
https://github.com/user-attachments/assets/75edbc3b-3391-4a62-95f8-442577a7ae66

## Mock API approach

The app uses Axios with a custom in-memory adapter in `src/api.ts`. It mirrors REST endpoints for login and visitor operations, adds a short network delay, and stores visitor changes in memory for the current browser session. The login endpoint accepts any valid email and password with at least six characters.

## Architecture and project structure

- `src/api.ts`: Axios client, mock adapter, seed data, and API operations.
- `src/store.ts`: Redux Toolkit store, async thunks, and auth/visitor state.
- `src/types.ts`: Shared domain types and payload contracts.
- `src/App.tsx`: Chooses the login or dashboard view from auth state.
- `src/components/`: Login, dashboard, visitor form, table, navigation, and shared UI components.
- `src/index.css` and Tailwind config: Global styles and utility CSS setup.

## Assumptions and technical decisions

- Visitor data is session-only because the mock store is held in module memory.
- A visitor name must contain letters, spaces, phone numbers must contain 10 to 15 digits.
- Visit dates may be today or later, matching the date input minimum.
- Redux Toolkit owns shared async state while form components own temporary field values and validation errors.

