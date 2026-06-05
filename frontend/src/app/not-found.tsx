import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="relative flex items-center justify-center mb-4">
        <h1 className="text-9xl font-extrabold text-accent tracking-widest opacity-15 select-none">404</h1>
        <div className="bg-danger text-white text-xs px-2.5 py-1 rounded-sm rotate-12 absolute font-semibold shadow-sm whitespace-nowrap">
          Page Not Found
        </div>
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl mt-4">Uh-oh! We lost this page.</h2>

      <p className="mt-4 text-muted max-w-md mx-auto text-sm leading-relaxed">
        The quiz or page you are looking for doesn&apos;t exist, has been deleted, or the backend server is temporarily
        unreachable.
      </p>

      <div className="mt-8">
        <Link href="/quizzes" className="btn btn-primary">
          Go Back to Quizzes
        </Link>
      </div>
    </div>
  );
}
