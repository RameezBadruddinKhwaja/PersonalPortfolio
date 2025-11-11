import { motion } from "framer-motion"

const education = [
  {
    title: "Governor Sindh IT Initiative (Panaverse Program)",
    period: "2023 - Present",
    description: "Specialized training in Web3 and Artificial Intelligence. Building real-world projects using Next.js, TypeScript, and AI technologies.",
  },
  {
    title: "ADP in Computer Information Systems",
    institution: "Hamdard University",
    period: "2019 - 2023",
    description: "Focused on Programming, Software Development, Data Management, and Computer Systems Architecture.",
  },
]

export function Education() {
  return (
    <section className="mt-16 md:mt-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold tracking-tight sm:text-3xl mb-10"
      >
        Education & Training
      </motion.h2>

      <div className="space-y-10">
        {education.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative pl-8 border-l-2 border-blue-600"
          >
            <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-[9px] top-0" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              {item.institution && (
                <p className="text-muted-foreground">{item.institution}</p>
              )}
              <p className="text-sm text-muted-foreground">{item.period}</p>
              <p className="text-muted-foreground mt-2">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}