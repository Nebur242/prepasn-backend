export enum Role {
  USER = 'user',
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

export enum Message {
  CREATED = 'Created successfully !',
  UPDATED = 'Updated successfully !',
  DELETED = 'Deleted successfully !',
  FOUND = 'Found successfully !',
  NOT_FOUND = 'Not found !',
  ALREADY_EXISTS = 'Item already exists !',
  INVALID_CREDENTIALS = 'Invalid credentials !',
  INVALID_TOKEN = 'Invalid token !',
  INVALID_REQUEST = 'Invalid request !',
  INVALID_PARAMETERS = 'Invalid parameters !',
}

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
  PENDING = 'pending',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  DELETED = 'deleted',
  PUBLISHED = 'published',
}

export enum LANGUAGE {
  FR = 'fr',
  EN = 'en',
}

export enum FIREBASE_ERRORS {
  WRONG_PASSWORD = 'auth/wrong-password',
  TOO_MANY_REQUESTS = 'auth/too-many-requests',
  EMAIL_ALREADY_USED = 'auth/email-already-in-use',
  POPUP_CLOSED_BY_USER = 'auth/popup-closed-by-user',
  USER_NOT_FOUND = 'auth/user-not-found',
}

export enum DocumentType {
  DOCUMENT = 'document',
  IMAGE = 'image',
  VIDEO = 'video',
}
