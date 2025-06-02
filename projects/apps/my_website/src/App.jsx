import { motion } from 'motion/react'

import { Nav } from './components/nav'
import Js_svg from './assets/svg/js_svg'
import NodeJs_svg from './assets/svg/nodejs_svg'
import React_svg from './assets/svg/react_svg'
import GCP_svg from './assets/svg/gcp_svg'
import AWS_svg from './assets/svg/aws_svg'

function App() {
  return (
    <main className="flex h-auto w-full flex-col items-center bg-[#FCEFCB]">
      {/* Container */}
      <div className="shadow-left-right h-full w-full max-w-[1200px] bg-[#FAD59A]">
        {/* Introduction */}
        <section className="flex min-h-screen w-full flex-row items-center justify-between px-[2rem] py-[4rem] sm:px-[5rem] sm:py-[5rem]">
          <div className="flex w-full flex-col justify-center sm:w-[65%]">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1 } }}
              className="font-roboto mb-[1rem] text-[2rem] leading-[2.5rem] font-semibold sm:text-[2.5rem] sm:leading-[3rem]"
            >
              What&apos;s up! I&apos;m <strong>Jackson</strong> 👋
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1, delay: 0.2 } }}
              className="font-roboto mb-[1rem] text-[2.5rem] leading-[3rem] font-bold sm:text-[3rem] sm:leading-[3.5rem]"
            >
              Full-Stack Developer 🧑‍💻
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1, delay: 0.4 } }}
              className="font-roboto mb-[2rem] text-[1rem] leading-[1.5rem] sm:w-[90%] sm:text-[1.5rem] sm:leading-[2rem]"
            >
              I work across stack like{' '}
              <strong>JavaScript, Node.js, React, and PostgreSQL</strong> —
              always focused on writing clean, maintainable code and building
              scalable architecture. I also utilize cloud platforms such as{' '}
              <strong>
                Google Cloud Platform (GCP) and Amazon Web Services (AWS)
              </strong>{' '}
              to deploy resilient applications, manage infrastructure, and
              streamline development workflows.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1, delay: 0.6 } }}
              className="font-roboto relative flex w-full flex-row items-end gap-[0.5rem]"
            >
              <Js_svg />
              <NodeJs_svg />
              <React_svg />
              <GCP_svg />
              <AWS_svg />
              ... and more!
            </motion.div>
          </div>
          <div className="hidden sm:flex sm:w-[35%]">
            <img
              className="rounded-4xl shadow-2xl"
              src="images/tempProfile.jpg"
              alt="profile picture"
            />
          </div>
        </section>

        {/* About Me */}
        <section className="flex min-h-screen w-full flex-col px-[2rem] py-[4rem] sm:gap-[1rem] sm:px-[5rem] sm:py-[5rem]">
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 1 } }}
            className="font-roboto font-semibold underline underline-offset-[0.5rem] sm:text-[2.5rem] sm:leading-[3rem]"
          >
            About Me
          </motion.h1>
          <div className="m-auto flex flex-1 flex-col items-center justify-center gap-[1rem]">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
              className="font-roboto text-center [text-indent:1rem] sm:w-[90%] sm:[text-indent:3rem] sm:text-[1.5rem] sm:leading-[2.5rem]"
            >
              With a background in software engineering and a degree in Computer
              Science, I bring both technical precision and an eye for
              thoughtful design to every project. Over the past two years, I’ve
              collaborated with startups and agencies to develop{' '}
              <strong>responsive web applications</strong> and build scalable
              backend systems.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
              className="font-roboto text-center [text-indent:1rem] sm:w-[90%] sm:[text-indent:3rem] sm:text-[1.5rem] sm:leading-[2.5rem]"
            >
              Currently, I’m working full-time as a{' '}
              <strong>full-stack developer</strong>, sharpening my professional
              skills through real-world projects. Outside of work, I take on{' '}
              <strong>freelance opportunities</strong> to deepen my experience
              and grow my network.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
              className="font-roboto text-center [text-indent:1rem] sm:w-[85%] sm:[text-indent:3rem] sm:text-[1.5rem] sm:leading-[2.5rem]"
            >
              When I&apos;m not coding, you&apos;ll find me experimenting with
              new software tools or diving into topics that&apos;s I&apos;m
              interested in —<em>whether they&apos;re tech-related or not.</em>
            </motion.p>
          </div>
        </section>

        {/* Projects */}
        <section></section>

        {/* Resume */}
        <section className="flex min-h-screen w-full flex-col px-[2rem] py-[4rem] sm:gap-[1rem] sm:px-[5rem] sm:py-[5rem]">
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 1 } }}
            className="font-roboto font-semibold underline underline-offset-[0.5rem] sm:text-[2.5rem] sm:leading-[3rem]"
          >
            Resume
          </motion.h1>
          <div className="flex flex-col gap-6 text-[0.95rem] leading-relaxed text-neutral-800 sm:flex-row sm:justify-between">
            {/* Work Experience */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
            >
              <h2 className="text-xl font-semibold text-black">
                Work Experience
              </h2>

              <div className="mt-4">
                <h3 className="font-medium text-black">
                  Backend Developer · CareMate Health
                </h3>
                <p className="text-sm text-neutral-600">
                  Jan 2024 – Apr 2024 · Winnipeg, Canada
                </p>
                <ul className="mt-1 list-disc pl-5">
                  <li>Built RESTful APIs using Node.js, Express, PostgreSQL</li>
                  <li>Integrated AWS S3 and deployed on Elastic Beanstalk</li>
                  <li>Automated auth/validation with API Gateway & Lambda</li>
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-black">
                  Full Stack Developer · CONTEN.T
                </h3>
                <p className="text-sm text-neutral-600">
                  Jul 2024 – Present · Kuala Lumpur, Malaysia
                </p>
                <ul className="mt-1 list-disc pl-5">
                  <li>
                    Developing immersive branded sites with React + Next.js
                  </li>
                  <li>Using Firebase for backend, Auth, and Firestore</li>
                  <li>Deploying with AWS (S3, Route53) and managing domains</li>
                  <li>Integrated OpenAI and Gemini to enhance UX</li>
                </ul>
              </div>

              {/* Skills */}
              <div className='mt-[1rem]'>
                <h2 className="text-xl font-semibold text-black">
                  Technical Skills
                </h2>
                <p>
                  <span className="font-medium">Frontend:</span> React, Next.js,
                  Tailwind CSS
                </p>
                <p>
                  <span className="font-medium">Backend:</span> Node.js,
                  Express, Firebase Functions
                </p>
                <p>
                  <span className="font-medium">Cloud:</span> AWS (EC2, S3,
                  Elastic Beanstalk), Firebase
                </p>
                <p>
                  <span className="font-medium">Database:</span> PostgreSQL,
                  Firestore
                </p>
                <p>
                  <span className="font-medium">AI:</span> OpenAI API, Gemini
                  API
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
            >
              {/* Education */}
              <div>
                <h2 className="mt-8 text-xl font-semibold text-black">
                  Education
                </h2>
                <p>
                  <span className="font-medium">B.Sc. in Computer Science</span>
                  <br />
                  University of Manitoba · 2019 – 2024
                </p>
                <p className="mt-2">
                  <span className="font-medium">
                    Diploma in Infocomm Technology
                  </span>
                  <br />
                  PSB Academy, Singapore · 2017 – 2018
                </p>
              </div>

              {/* Languages */}
              <div>
                <h2 className="mt-8 text-xl font-semibold text-black">
                  Languages
                </h2>
                <p>
                  English (Intermediate), Mandarin (Fluent), Cantonese
                  (Intermediate)
                </p>
              </div>

              {/* Download button */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block w-fit rounded-lg bg-black px-4 py-2 text-white transition hover:bg-neutral-800"
              >
                Download PDF
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
