import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <Head>
        <title>Welcome to Next Dashboard!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-white text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://github.com/romlescarl17/next-dashboard">
            Next Dashboard!
          </a>
        </h1>
        <p className="text-white mt-3 text-2xl">
          Get started by editing{' '}
          <code className="p-3 text-white font-mono text-lg bg-gray-800 rounded-md">
            pages/index.js
          </code>
        </p>
      </main>
    </div>
  )
}