### List of Backend APIs

<br />

#### Authentication APIs

- `login` -> `/api/v1/auth/login`
  - `post` request
- `token verify` -> `/api/v1/auth/verify-user`
  - `post` request
- `token refresh` -> `/api/v1/auth/token-refresh`
  - `post` request
- `get profile` -> `/api/v1/profile/me`
  - `get` request
- `profile update` -> `/api/v1/profile/`
  - `patch` request
- `avatar upload` -> `/api/v1/profile/me/profile-image`
  - `post` request
- `get rooms` -> `/api/v1/rooms`
  - `get` request
- `get messages` -> `/api/v1/messages`
  - `get` request
  - `query params` -> roomId (required), limit?, page?
