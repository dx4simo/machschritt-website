import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, title }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  )
}
