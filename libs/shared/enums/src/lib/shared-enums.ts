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
}

export enum documentType {
  DOCUMENT = 'document',
  IMAGE = 'image',
  VIDEO = 'video',
}
