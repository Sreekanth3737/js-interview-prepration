export const DATA = [
  {
    id: "frontend",
    label: "Frontend Development",
    checked: false,
    children: [
      {
        id: "react",
        label: "React",
        checked: false,
        children: [
          { id: "hooks", label: "Hooks", checked: false },
          { id: "context", label: "Context API", checked: false },
          { id: "router", label: "React Router", checked: false },
        ],
      },
      {
        id: "vue",
        label: "Vue.js",
        checked: false,
        children: [
          { id: "composition", label: "Composition API", checked: false },
          { id: "vuex", label: "Vuex", checked: false },
        ],
      },
      { id: "angular", label: "Angular", checked: false },
    ],
  },
  {
    id: "backend",
    label: "Backend Development",
    checked: false,
    children: [
      {
        id: "nodejs",
        label: "Node.js",
        checked: false,
        children: [
          { id: "express", label: "Express.js", checked: false },
          { id: "fastify", label: "Fastify", checked: false },
        ],
      },
      { id: "python", label: "Python", checked: false },
      { id: "golang", label: "Go", checked: false },
    ],
  },
  {
    id: "database",
    label: "Databases",
    checked: false,
    children: [
      { id: "mysql", label: "MySQL", checked: false },
      { id: "postgresql", label: "PostgreSQL", checked: false },
      { id: "mongodb", label: "MongoDB", checked: false },
    ],
  },
];
