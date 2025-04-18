function Projects() {
  const projects = [
    {
      title: "Portfolio Website",
      description: "A personal portfolio website showcasing my projects and skills.",
      image: "https://scontent.fcgy2-4.fna.fbcdn.net/v/t39.30808-6/489056052_1058347886326843_3573214277028562017_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeE2mz8ShHTJ0lWFuDIlleGFs_qa30jkZBaz-prfSORkFhPF1auclcYYRrKqRCCkGW-iRfqAvLHU2aCl0U8SrkZn&_nc_ohc=4uRKDOj5n6gQ7kNvwFBNiUZ&_nc_oc=AdknoQykonhnwqvyzRGQ84N0SdaRd3wuXjbLn_dkILA_Th8ZvBpY2Jpn1CaiRLHkWUZ534c3uNiRtziM14fQ9b0g&_nc_zt=23&_nc_ht=scontent.fcgy2-4.fna&_nc_gid=oEGxgZxfKakCqVxRs3oCkw&oh=00_AfGvERoxE54HaAO3r8fN7ZaGCijl-E65ix-m1fHEFihV2w&oe=680831C9",
      tags: ["React", "HTML", "CSS"],
      github: "https://github.com/jasrulete/portfolio",
      demo: "#",
    },
    {
      title: "Portfolio Website",
      description: "A personal portfolio website showcasing my projects and skills.",
      image: "https://scontent.fcgy2-4.fna.fbcdn.net/v/t39.30808-6/489056052_1058347886326843_3573214277028562017_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeE2mz8ShHTJ0lWFuDIlleGFs_qa30jkZBaz-prfSORkFhPF1auclcYYRrKqRCCkGW-iRfqAvLHU2aCl0U8SrkZn&_nc_ohc=4uRKDOj5n6gQ7kNvwFBNiUZ&_nc_oc=AdknoQykonhnwqvyzRGQ84N0SdaRd3wuXjbLn_dkILA_Th8ZvBpY2Jpn1CaiRLHkWUZ534c3uNiRtziM14fQ9b0g&_nc_zt=23&_nc_ht=scontent.fcgy2-4.fna&_nc_gid=oEGxgZxfKakCqVxRs3oCkw&oh=00_AfGvERoxE54HaAO3r8fN7ZaGCijl-E65ix-m1fHEFihV2w&oe=680831C9",
      tags: ["React", "HTML", "CSS"],
      github: "https://github.com/jasrulete/portfolio",
      demo: "#",
    },
    {
      title: "Portfolio Website",
      description: "A personal portfolio website showcasing my projects and skills.",
      image: "https://scontent.fcgy2-4.fna.fbcdn.net/v/t39.30808-6/489056052_1058347886326843_3573214277028562017_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeE2mz8ShHTJ0lWFuDIlleGFs_qa30jkZBaz-prfSORkFhPF1auclcYYRrKqRCCkGW-iRfqAvLHU2aCl0U8SrkZn&_nc_ohc=4uRKDOj5n6gQ7kNvwFBNiUZ&_nc_oc=AdknoQykonhnwqvyzRGQ84N0SdaRd3wuXjbLn_dkILA_Th8ZvBpY2Jpn1CaiRLHkWUZ534c3uNiRtziM14fQ9b0g&_nc_zt=23&_nc_ht=scontent.fcgy2-4.fna&_nc_gid=oEGxgZxfKakCqVxRs3oCkw&oh=00_AfGvERoxE54HaAO3r8fN7ZaGCijl-E65ix-m1fHEFihV2w&oe=680831C9",
      tags: ["React", "HTML", "CSS"],
      github: "https://github.com/jasrulete/portfolio",
      demo: "#",
    },
  ]

  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative overflow-hidden" style={{ paddingBottom: "60%" }}>
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="absolute top-0 left-0 w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-3 py-1 rounded-full mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <a
                    href={project.github}
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Code
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

