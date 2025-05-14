import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ArrowRightIcon, Award, Brain, FileSpreadsheet } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us | FIT3162 | MCS04",
  description: "Learn about our team and our mission to analyze genetic stroke risk using AI technology",
}

export default function AboutPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Akito Hasegawa",
      role: "Tech Lead",
      bio: "Responsible for system architecture, code review, CI/CD and deployment",
      contact: "ahas0037@student.monash.edu",
    },
    {
      id: 2,
      name: "Lee Kay Chyuan",
      role: "Project Manager",
      bio: "Responsible for project coordination, timeline management, and documentation",
      contact: "klee0136@student.monash.edu",
    },
    {
      id: 3,
      name: "Zhu Kuiyuan",
      role: "Full-stack Developer",
      bio: "Responsible for front-end and back-end development, ensuring seamless user experience",
      contact: "kzhu0018@student.monash.edu",
    },
    {
      id: 4,
      name: "Tan Kok Wei",
      role: "ML Engineer",
      bio: "Responsible for machine learning model and data pipeline development and deployment",
      contact: "ktan0149@student.monash.edu",
    },
  ]

  const projectFeatures = [
    {
      id: 1,
      icon: <Brain className="h-12 w-12 text-indigo-600" />,
      title: "AI-Powered Analysis",
      description:
        "Our machine learning model analyzes genetic markers to estimate stroke risk levels with increasing accuracy",
    },
    {
      id: 2,
      icon: <FileSpreadsheet className="h-12 w-12 text-indigo-600" />,
      title: "Simple Data Upload",
      description: "Users can easily upload genetic data in CSV format for quick and secure analysis",
    },
    {
      id: 3,
      icon: <Award className="h-12 w-12 text-indigo-600" />,
      title: "Educational Purpose",
      description: "Designed as an academic project to demonstrate the potential of AI in personalized healthcare",
    },
  ]

  return (
    <div className="min-h-screen transition-opacity duration-700">
      <main className="container mx-auto max-w-6xl px-4 py-16">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
          ]}
        />
        {/* Hero Section */}
        <section className="mb-24 text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-4 py-1.5 text-gray-600 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              <span className="font-medium">FIT3162 Team Project</span>
              <Link
                href="/sign-in"
                className="ml-2 inline-flex items-center font-semibold text-indigo-600 duration-300 hover:opacity-80"
              >
                Explore now <ArrowRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          <h1 className="mb-8 font-bold text-5xl text-gray-900 md:text-7xl">
            Analyze genetic stroke risk
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">With AI</span>
          </h1>

          {/* Styled description container */}
          <div className="relative mx-auto mb-12 max-w-3xl">
            {/* Decorative elements */}
            <div className="-left-10 -top-5 absolute h-12 w-12 text-blue-400 opacity-20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <div className="-right-10 -bottom-5 absolute h-12 w-12 rotate-180 transform text-indigo-400 opacity-20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Content with styled border and background */}
            <div className="relative rounded-xl border border-blue-100 bg-white/70 px-8 py-6 shadow-lg backdrop-blur-sm">
              <p className="text-xl leading-relaxed">
                We're students from
                <span className="relative mx-1 inline-block">
                  <span className="relative z-10 font-semibold text-indigo-700">Monash University</span>
                  <span className="-z-0 absolute bottom-1 left-0 h-2 w-full rounded-sm bg-blue-100" />
                </span>
                developing an innovative approach to analyze genetic markers for
                <span className="relative mx-1 inline-block">
                  <span className="relative z-10 font-semibold text-indigo-700">ischemic stroke risk</span>
                  <span className="-z-0 absolute bottom-1 left-0 h-2 w-full rounded-sm bg-blue-100" />
                </span>
                assessment. Our interdisciplinary team combines expertise in data science, software engineering, and
                healthcare informatics to create a tool that could help in early risk identification.
              </p>
            </div>
          </div>

          {/* Added stats/highlights below description */}
          <div className="flex flex-wrap justify-center gap-8">
            <div className="rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-3 shadow-sm">
              <span className="font-bold text-indigo-600 text-xl">AI-Powered</span>
              <span className="ml-2 text-gray-600">Analysis</span>
            </div>
            <div className="rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-3 shadow-sm">
              <span className="font-bold text-indigo-600 text-xl">Genetic</span>
              <span className="ml-2 text-gray-600">Data Processing</span>
            </div>
            <div className="rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-3 shadow-sm">
              <span className="font-bold text-indigo-600 text-xl">Academic</span>
              <span className="ml-2 text-gray-600">Research Project</span>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="mb-20">
          <h2 className="mb-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-center font-bold text-4xl text-transparent">
            About Our Project
          </h2>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl">
            {/* Top decorative element */}
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />

            {/* Content with better padding and styling */}
            <div className="space-y-6 p-8 md:p-10">
              <p className="text-gray-700 text-lg leading-relaxed first-letter:float-left first-letter:mr-1 first-letter:font-bold first-letter:text-4xl first-letter:text-indigo-600">
                Welcome to our academic project site, where we're exploring the intersection of genetic data analysis
                and healthcare. As a team of four Monash University students, we're developing a platform that
                demonstrates how machine learning can be applied to genetic data to estimate stroke risk factors.
              </p>

              <div className="flex items-start space-x-4 rounded-lg border-blue-500 border-l-4 bg-blue-50 p-4">
                <div className="flex-shrink-0 text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Our application analyzes CSV files containing specific genetic markers associated with ischemic stroke
                  risk. By processing this data through our machine learning model, we aim to provide users with
                  insights into potential risk factors while highlighting the possibilities of AI in personalized
                  medicine.
                </p>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                This project represents our culminating work for{" "}
                <span className="font-semibold text-indigo-600">FIT3162</span>, where we've applied concepts from data
                science, software engineering, and UI/UX design to create a functional prototype that addresses a
                significant healthcare challenge.
              </p>

              <div className="mt-8 rounded-lg border-orange-500 border-l-4 bg-gradient-to-r from-red-50 to-orange-50 p-5">
                <p className="flex items-start font-medium">
                  <span className="mr-3 inline-block rounded-full bg-orange-100 p-1 text-orange-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </span>
                  <span>
                    <strong className="mb-1 block text-lg">Important Note:</strong>
                    This application is developed for educational and demonstration purposes only. The results and
                    analysis provided should not be considered medical advice or a substitute for consultation with
                    healthcare professionals.
                  </span>
                </p>
              </div>
            </div>

            {/* Stats or highlights */}
            <div className="grid grid-cols-3 divide-x divide-gray-200 bg-gray-50">
              <div className="p-4 text-center">
                <p className="font-bold text-2xl text-indigo-600">4</p>
                <p className="text-gray-600 text-sm">Team Members</p>
              </div>
              <div className="p-4 text-center">
                <p className="font-bold text-2xl text-indigo-600">FIT3162</p>
                <p className="text-gray-600 text-sm">Course Code</p>
              </div>
              <div className="p-4 text-center">
                <p className="font-bold text-2xl text-indigo-600">MCS04</p>
                <p className="text-gray-600 text-sm">Team ID</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="mb-12 text-center font-bold text-3xl">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {projectFeatures.map((feature) => (
              <div
                key={feature.id}
                className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="mb-3 text-center font-semibold text-xl">{feature.title}</h3>
                <p className="text-center text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="mb-12 text-center font-bold text-3xl">Meet Our Team</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="mb-4 flex justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 font-bold text-2xl text-white">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
                <h3 className="mb-1 text-center font-semibold text-xl">{member.name}</h3>
                <p className="mb-4 text-center font-medium text-indigo-600">{member.role}</p>
                <p className="mb-4 text-center text-gray-600">{member.bio}</p>
                <p className="text-center text-gray-500 text-sm">{member.contact}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-20 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 p-8">
          <h2 className="mb-6 text-center font-bold text-3xl">Our Mission</h2>
          <div className="mx-auto max-w-3xl space-y-4 text-center text-lg">
            <p>
              We aim to demonstrate how technological innovation can contribute to preventative healthcare by making
              complex genetic information more accessible and actionable.
            </p>
            <p>
              By creating this prototype, we hope to spark discussions about the future of personalized medicine and
              inspire further research at the intersection of artificial intelligence and healthcare.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="mb-6 font-bold text-2xl">Ready to see our project in action?</h2>
          <Link
            href="/discover"
            className="inline-flex items-center rounded-full bg-indigo-600 px-8 py-3 font-medium text-white transition-colors duration-300 hover:bg-indigo-700"
          >
            Explore the Application <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </section>
      </main>
    </div>
  )
}
