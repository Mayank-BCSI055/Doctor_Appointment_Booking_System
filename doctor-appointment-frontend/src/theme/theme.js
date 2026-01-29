export const getTheme = () => {
  return localStorage.getItem('theme') || 'light';
};

export const setTheme = (theme) => {
  localStorage.setItem('theme', theme);
  document.body.classList.toggle('dark', theme === 'dark');
};

export const initTheme = () => {
  const theme = getTheme();
  document.body.classList.toggle('dark', theme === 'dark');
};
