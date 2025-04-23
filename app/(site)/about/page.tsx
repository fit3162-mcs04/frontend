export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 px-6 py-12 text-gray-800 dark:bg-black dark:text-white">
      <h1 className="mb-6 font-bold text-3xl">About Us</h1>
      <div className="max-w-3xl space-y-6 text-center text-lg">
        <p>
          We are a passionate team of four students from Monash University, collaborating on a project to apply
          technology in meaningful ways for healthcare. Our interdisciplinary background spans data science, digital
          media, and software development.
        </p>

        <p>
          This website is part of our academic project, focusing on using genetic data to predict the risk of stroke. By
          analyzing CSV files uploaded by users — typically containing simplified genetic information — our AI-powered
          tool provides an estimated risk level to help raise awareness and support preventative action.
        </p>

        <p>
          Our goal is to demonstrate how machine learning and accessible interfaces can empower individuals to better
          understand their health risks. Please note that this site is for educational and demonstrative purposes only,
          and should not be considered a replacement for professional medical advice.
        </p>

        <p>
          We hope our project sparks discussion about the future of personalized healthcare and inspires further
          innovation in health technology.
        </p>
      </div>
    </main>
  )
}
