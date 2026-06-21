export const projectsQuery = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  description,
  status,
  tags,
  bgStart,
  bgEnd,
  mainImage,
  completionDate,
  visibility,
  liveLink,
  _createdAt,
  _updatedAt
}`;

export const projectByIdQuery = `*[_type == "project" && _id == $id][0] {
  _id,
  title,
  slug,
  description,
  status,
  tags,
  bgStart,
  bgEnd,
  mainImage,
  completionDate,
  visibility,
  liveLink,
  _createdAt
}`;

export const blogsQuery = `*[_type == "blog"] | order(publishedAt desc, _createdAt desc) {
  _id,
  title,
  slug,
  author,
  category,
  tags,
  description,
  status,
  views,
  likes,
  mainImage,
  publishedAt,
  _createdAt,
  _updatedAt
}`;

export const blogByIdQuery = `*[_type == "blog" && _id == $id][0] {
  _id,
  title,
  slug,
  author,
  category,
  tags,
  description,
  status,
  views,
  likes,
  mainImage,
  bodyHtml,
  metaTitle,
  metaDescription,
  keywords,
  publishedAt,
  _createdAt
}`;

export const clientsQuery = `*[_type == "client"] | order(_createdAt desc) {
  _id,
  name,
  logo,
  logoUrl,
  website,
  contactNumber,
  email,
  projectStatus,
  startDate,
  endDate,
  scope,
  budget,
  milestones,
  payments,
  assignedTeam[]{
    name,
    role,
    avatar,
    "teamAvatar": teamMember->image
  },
  documents,
  _createdAt,
  _updatedAt
}`;

export const clientByIdQuery = `*[_type == "client" && _id == $id][0] {
  _id,
  name,
  logo,
  logoUrl,
  website,
  contactNumber,
  email,
  projectStatus,
  startDate,
  endDate,
  scope,
  budget,
  milestones,
  payments,
  assignedTeam[]{
    name,
    role,
    avatar,
    "teamAvatar": teamMember->image
  },
  documents,
  _createdAt,
  _updatedAt
}`;

export const teamQuery = `*[_type == "teamMember"] | order(joinDate desc, _createdAt desc) {
  _id,
  name,
  role,
  department,
  email,
  phone,
  image,
  bio,
  status,
  joinDate,
  _createdAt
}`;

export const teamMemberByIdQuery = `*[_type == "teamMember" && _id == $id][0] {
  _id,
  name,
  role,
  department,
  email,
  phone,
  image,
  bio,
  status,
  joinDate,
  _createdAt
}`;

export const notificationsQuery = `*[_type == "notification"] | order(timestamp desc) {
  _id,
  type,
  title,
  message,
  timestamp,
  isRead,
  link
}`;

export const adminProfileQuery = `*[_type == "adminProfile"][0] {
  _id,
  name,
  email,
  role,
  avatar
}`;

export const unreadNotificationsCountQuery = `count(*[_type == "notification" && isRead != true])`;

export const recentActivityQuery = `{
  "projects": *[_type == "project"] | order(_updatedAt desc)[0...5] {
    _id, title, _updatedAt, status
  },
  "blogs": *[_type == "blog"] | order(_updatedAt desc)[0...5] {
    _id, title, _updatedAt, status
  },
  "clients": *[_type == "client"] | order(_updatedAt desc)[0...5] {
    _id, name, _updatedAt, projectStatus
  },
  "team": *[_type == "teamMember"] | order(_updatedAt desc)[0...5] {
    _id, name, _updatedAt, role
  }
}`;
