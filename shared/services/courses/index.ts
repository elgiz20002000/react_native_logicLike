export const fetchCourses = async () => {
  const response = await fetch('https://logiclike.com/docs/courses.json');
  const data = await response.json();
  return data;
};
