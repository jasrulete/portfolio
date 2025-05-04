import { SiPython, SiReact, SiCss3, SiHtml5 } from "react-icons/si";

function Skills() {
  const skills = [
    {
      name: "C++",
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg"
          alt="C++ Logo"
          className="h-12 w-12 object-contain"
        />
      ),
      description: "Efficient system programming and algorithm design",
    },
    {
      name: "Python",
      icon: <SiPython className="h-12 w-12 text-yellow-400" />,
      description: "Creating robust server-side applications and APIs",
    },
    {
      name: "React",
      icon: <SiReact className="h-12 w-12 text-blue-400" />,
      description: "Designing interactive and reactive user interfaces",
    },
    {
      name: "CSS",
      icon: <SiCss3 className="h-12 w-12 text-blue-600" />,
      description: "Styling modern and responsive web applications",
    },
    {
      name: "HTML",
      icon: <SiHtml5 className="h-12 w-12 text-orange-500" />,
      description: "Structuring web content for accessibility and clarity",
    },
    {
      name: "JavaScript",
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
          alt="JavaScript Logo"
          className="h-12 w-12 object-contain"
        />
      ),
      description: "Building dynamic and interactive web applications",
    },
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="mb-4">{skill.icon}</div>
              <h3 className="text-lg font-semibold text-center mb-2">
                {skill.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
