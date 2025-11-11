import { motion } from "framer-motion"

const skills = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js", level: "Advanced" },
      { name: "TypeScript", level: "Advanced" },
      { name: "React", level: "Advanced" },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "Framer Motion", level: "Intermediate" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: "Advanced" },
      { name: "Express.js", level: "Advanced" },
      { name: "Prisma", level: "Intermediate" },
      { name: "PostgreSQL", level: "Intermediate" },
      { name: "REST APIs", level: "Advanced" },
    ],
  },
  {
    category: "AI & DevOps",
    items: [
      { name: "Python", level: "Intermediate" },
      { name: "OpenAI SDK", level: "Intermediate" },
      { name: "Gemini API", level: "Intermediate" },
      { name: "FastAPI", level: "Intermediate" },
      { name: "Agentic AI", level: "Intermediate" },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "Git & GitHub", level: "Advanced" },
      { name: "Vercel", level: "Advanced" },
      { name: "Supabase", level: "Intermediate" },
      { name: "Passport.js", level: "Intermediate" },
      { name: "ShadCN UI", level: "Advanced" },
    ],
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function Skills() {
  return (
    <section className="mt-16 md:mt-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold tracking-tight sm:text-3xl mb-10"
      >
        Technical Skills
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {skills.map((category) => (
          <motion.div
            key={category.category}
            variants={item}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-blue-600">
              {category.category}
            </h3>
            <ul className="space-y-2">
              {category.items.map((skill) => (
                <li
                  key={skill.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <span>{skill.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {skill.level}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}