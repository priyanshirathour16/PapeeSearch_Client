import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
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
            if (!error.config.url.includes('/auth/login')) {
                localStorage.removeItem('token');
                window.location.href = '/unauthorized';
            }
        }
        return Promise.reject(error);
    }
);

export const journalApi = {
    getAll: () => api.get('/journals'),
    getById: (id) => api.get(`/journals/${id}`),
    create: (data) => {
        const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
        return api.post('/journals', data, { headers });
    },
    update: (id, data) => {
        const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
        return api.put(`/journals/${id}`, data, { headers });
    },
    delete: (id) => api.delete(`/journals/${id}`),
    addEditor: (id, editorData) => api.post(`/journals/${id}/editors`, editorData),
    deleteEditor: (journalId, editorId) => api.delete(`/journals/${journalId}/editors/${editorId}`),
    getDetailsByCategory: (route) => api.post('/journals/details-by-category', { route }),
};

export const journalIssueApi = {
    getAll: () => api.get('/journal-issues'),
    getById: (id) => api.get(`/journal-issues/${id}`),
    create: (data) => api.post('/journal-issues', data),
    update: (id, data) => api.put(`/journal-issues/${id}`, data),
    delete: (id) => api.delete(`/journal-issues/${id}`),
};

export const authApi = {
    register: (data) => api.post('/auth/register', data),
};

export const applicationApi = {
    becomeEditor: (data) => {
        const headers = { 'Content-Type': 'multipart/form-data' };
        return api.post('/editor-applications', data, { headers });
    }
};

export const authorApi = {
    getAll: () => api.get('/authors'),
    getById: (id) => api.get(`/authors/${id}`)
};

export const editorApplicationApi = {
    getAll: () => api.get('/editor-applications'),
    getById: (id) => api.get(`/editor-applications/${id}`),
    delete: (id) => api.delete(`/editor-applications/${id}`),
};

export const journalCategoryApi = {
    getAll: () => api.get('/journal-categories'),
    getWithJournals: () => api.get('/journal-categories/with-journals'),
    create: (data) => api.post('/journal-categories', data),
    delete: (id) => api.delete(`/journal-categories/${id}`),
};

export const impactFactorApi = {
    add: (data) => api.post('/journal-impact-factors', data),
    getByJournal: (journalId) => api.get(`/journal-impact-factors/${journalId}`),
    delete: (id) => api.delete(`/journal-impact-factors/${id}`),
};

export const manuscriptApi = {
    submit: (data) => {
        const headers = { 'Content-Type': 'multipart/form-data' };
        return api.post('/manuscripts', data, { headers });
    }
};

export default api;
