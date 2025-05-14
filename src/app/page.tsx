'use client';

import Navigation from './components/Navigation';
import "./globals.css";
import "./page.module.css";
import SigninForm from './components/SigninForm';
import SignupForm from './components/SignupForm';

export default function Home() {

  return (
    <main>
      <Navigation />
      <section>
        <SigninForm />
      </section>
      <section>
        <SignupForm />
      </section>
    </main>
  );
}
