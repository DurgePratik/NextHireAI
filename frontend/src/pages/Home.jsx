import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-8 py-24 text-center">
          <h1 className="text-6xl font-bold">
            NextHire AI
          </h1>

          <p className="mt-6 text-xl max-w-3xl mx-auto text-slate-300">
            Smart Recruitment Platform for
            Candidates and Recruiters.
            Find jobs, upload resumes,
            manage applications, and
            leverage AI-powered hiring.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/register"
              className="bg-sky-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-slate-400 px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">
              Browse Jobs
            </h3>

            <p className="mt-3 text-gray-600">
              Explore opportunities from
              recruiters across domains.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">
              One Click Apply
            </h3>

            <p className="mt-3 text-gray-600">
              Apply to jobs instantly and
              track your applications.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">
              Resume Management
            </h3>

            <p className="mt-3 text-gray-600">
              Upload and manage resumes
              securely using MongoDB
              GridFS.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">
              AI Recruitment
            </h3>

            <p className="mt-3 text-gray-600">
              Resume Analysis, ATS Score,
              Skill Extraction and Job
              Matching (Coming Soon).
            </p>
          </div>
        </div>
      </section>

      {/* Candidate & Recruiter */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-slate-50 p-8 rounded-xl shadow">
              <h2 className="text-3xl font-bold mb-6 text-sky-600">
                For Candidates
              </h2>

              <ul className="space-y-4 text-gray-700">
                <li>✓ Create Profile</li>
                <li>✓ Upload Resume</li>
                <li>✓ Browse Jobs</li>
                <li>✓ Apply Instantly</li>
                <li>✓ Track Applications</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-8 rounded-xl shadow">
              <h2 className="text-3xl font-bold mb-6 text-sky-600">
                For Recruiters
              </h2>

              <ul className="space-y-4 text-gray-700">
                <li>✓ Create Jobs</li>
                <li>✓ Manage Openings</li>
                <li>✓ View Applicants</li>
                <li>✓ Download Resumes</li>
                <li>✓ Hire Faster</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Platform Overview
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <h3 className="text-5xl font-bold text-sky-600">
              100+
            </h3>

            <p className="mt-3 text-gray-600">
              Jobs Posted
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow text-center">
            <h3 className="text-5xl font-bold text-sky-600">
              500+
            </h3>

            <p className="mt-3 text-gray-600">
              Applications
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow text-center">
            <h3 className="text-5xl font-bold text-sky-600">
              200+
            </h3>

            <p className="mt-3 text-gray-600">
              Candidates
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-8 py-20 text-center">
          <h2 className="text-4xl font-bold">
            Ready to Get Started?
          </h2>

          <p className="mt-4 text-lg text-slate-300">
            Join NextHire AI and connect
            talent with opportunity.
          </p>

          <Link
            to="/register"
            className="inline-block mt-8 bg-sky-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-700 transition"
          >
            Register Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h3 className="text-2xl font-bold">
            NextHire AI
          </h3>

          <p className="mt-2 text-gray-400">
            Built with MERN Stack,
            MongoDB GridFS and AI.
          </p>

          <p className="mt-4 text-gray-500">
            Pratik Durge • IIT Guwahati
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;