
const storage = {
    get: (key) => JSON.parse(localStorage.getItem(key)),
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    remove: (key) => localStorage.removeItem(key),
  };
  
  // Users and Posts keys for Local Storage
  export const USERS_KEY = 'users';
  export const POSTS_KEY = 'posts';
  
  export const getUsers = () => storage.get(USERS_KEY) || [];
  export const saveUsers = (users) => storage.set(USERS_KEY, users);
  
  export const getPosts = () => storage.get(POSTS_KEY) || [];
  export const savePosts = (posts) => storage.set(POSTS_KEY, posts);
  
