import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  // baseURL: "https://rapidcollaborate.in/elkjournals_backend/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Don't redirect if it's a login attempt
      if (!error.config.url.includes("/auth/login")) {
        localStorage.removeItem("token");
        window.location.href = "/unauthorized";
      }
    }
    return Promise.reject(error);
  }
);

export const journalApi = {
  getAll: () => api.get("/journals"),
  getById: (id) => api.get(`/journals/${id}`),
  create: (data) => {
    const headers =
      data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {};
    return api.post("/journals", data, { headers });
  },
  update: (id, data) => {
    const headers =
      data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {};
    return api.put(`/journals/${id}`, data, { headers });
  },
  delete: (id) => api.delete(`/journals/${id}`),
  addEditor: (id, editorData) =>
    api.post(`/journals/${id}/editors`, editorData),
  deleteEditor: (journalId, editorId) =>
    api.delete(`/journals/${journalId}/editors/${editorId}`),
  getDetailsByCategory: (route) =>
    api.post("/journals/details-by-category", { route }),
};

export const journalIssueApi = {
  getAll: () => api.get("/journal-issues"),
  getById: (id) => api.get(`/journal-issues/${id}`),
  create: (data) => api.post("/journal-issues", data),
  update: (id, data) => api.put(`/journal-issues/${id}`, data),
  delete: (id) => api.delete(`/journal-issues/${id}`),
  getByJournal: (journalId) => api.get(`/journal-issues/journal/${journalId}`),
};

export const authApi = {
  register: (data) => api.post("/auth/register", data),
  sendOTP: (data) => api.post("/auth/send-otp", data),
  verifyOTPLogin: (data) => api.post("/auth/verify-otp-login", data),
  changePassword: (data) => api.post("/auth/change-password", data),
  verifyUser: (data) => api.post("/auth/verify-user", data),
  resetPassword: (data) => api.post("/auth/reset-password", data),
};

export const applicationApi = {
  becomeEditor: (data) => {
    const headers = { "Content-Type": "multipart/form-data" };
    return api.post("/editor-applications", data, { headers });
  },
};

export const authorApi = {
  getAll: () => api.get("/authors"),
  getById: (id) => api.get(`/authors/${id}`),
};

export const editorApplicationApi = {
  getAll: () => api.get("/editor-applications"),
  getById: (id) => api.get(`/editor-applications/${id}`),
  delete: (id) => api.delete(`/editor-applications/${id}`),
};

export const journalCategoryApi = {
  getAll: () => api.get("/journal-categories"),
  getWithJournals: () => api.get("/journal-categories/with-journals"),
  getWithJournalsAndIssues: () =>
    api.get("/journal-categories/with-journals-and-issues"),
  create: (data) => api.post("/journal-categories", data),
  delete: (id) => api.delete(`/journal-categories/${id}`),
};

export const impactFactorApi = {
  add: (data) => api.post("/journal-impact-factors", data),
  getByJournal: (journalId) => api.get(`/journal-impact-factors/${journalId}`),
  delete: (id) => api.delete(`/journal-impact-factors/${id}`),
};

export const otpApi = {
  send: (data) => api.post("/otp/send", data),
  verify: (data) => api.post("/otp/verify", data),
};

export const manuscriptApi = {
  submit: (data) => {
    const headers = { "Content-Type": "multipart/form-data" };
    return api.post("/manuscripts/submit", data, { headers });
  },
  // Updated: Now accepts params for filtering (e.g., { status: 'Awaiting Copyright' })
  getAll: (params) => api.get("/manuscripts", { params }),
  getNewManuscriptDetails: (id) => api.get(`/manuscripts/new-manuscript/${id}`),
  getById: (id) => api.get(`/manuscripts/${id}`),
  getByAuthor: (authorId) => api.get(`/manuscripts/author/${authorId}`),
  updateStatus: (id, data) => api.patch(`/manuscripts/${id}/status`, data),
};

export const contactUsApi = {
  create: (data) => api.post("/contact-us", data),
  getAll: () => api.get("/contact-us"),
  delete: (id) => api.delete(`/contact-us/${id}`),
};

export const publicationApi = {
  getAll: (params) => api.get("/publications", { params }),
  getById: (id) => api.get(`/publications/${id}`),
  create: (data) => {
    const headers = { "Content-Type": "multipart/form-data" };
    return api.post("/publications", data, { headers });
  },
  update: (id, data) => {
    const headers = { "Content-Type": "multipart/form-data" };
    return api.put(`/publications/${id}`, data, { headers });
  },
  delete: (id) => api.delete(`/publications/${id}`),
};

export const conferenceApi = {
  create: (data) => api.post("/conferences", data),
  update: (id, data) => api.put(`/conferences/${id}`, data),
  delete: (id) => api.delete(`/conferences/${id}`),
  getAll: () => api.get("/conferences"),
  getById: (id) => api.get(`/conferences/${id}`),
  submitAbstract: (data) => {
    const headers = { "Content-Type": "multipart/form-data" };
    return api.post("/conferences/submit-abstract", data, { headers });
  },
};

export const conferenceTemplateApi = {
  getAll: () => api.get("/conferences/template"),
  getById: (id) => api.get(`/conferences/template/${id}`),
  create: (data) => {
    const headers = { "Content-Type": "multipart/form-data" };
    return api.post("/conferences/template", data, { headers });
  },
  update: (id, data) => {
    const headers = { "Content-Type": "multipart/form-data" };
    return api.put(`/conferences/template/${id}`, data, { headers });
  },
  delete: (id) => api.delete(`/conferences/template/${id}`),
};

export const copyrightApi = {
  getActiveTemplate: () => api.get("/copyright/template/active"),
  getManuscript: (manuscriptId) =>
    api.get(`/copyright/manuscript/${manuscriptId}`),
  submit: (data) => api.post("/copyright/submit", data),
  getSubmission: (manuscriptId) =>
    api.get(`/copyright/submission/${manuscriptId}`),
};

export const newsApi = {
  create: (data) => api.post("/news", data),
  getAll: () => api.get("/news"),
  getById: (id) => api.get(`/news/${id}`),
  update: (id, data) => api.put(`/news/${id}`, data),
  delete: (id) => api.delete(`/news/${id}`),
};
export const conferenceRegistrationApi = {
  create: (data) => api.post("/conference-registrations", data),
  getAll: () => api.get("/conference-registrations"),
  getById: (id) => api.get(`/conference-registrations/${id}`),
  getByConference: (conferenceId) =>
    api.get(`/conference-registrations/conference/${conferenceId}`),
  update: (id, data) => api.put(`/conference-registrations/${id}`, data),
  delete: (id) => api.delete(`/conference-registrations/${id}`),
};

export const abstractSubmissionApi = {
  submit: (data) => {
    const headers = { "Content-Type": "multipart/form-data" };
    return api.post("/abstract-submissions/submit-abstract", data, { headers });
  },
  getByAuthor: (authorId) => api.get(`/abstract-submissions/author/${authorId}`),
  getAll: () => api.get("/abstract-submissions"),
  updateStatus: (id, status) =>
    api.put(`/abstract-submissions/update-status/${id}`, { status }),
};

export default api;
