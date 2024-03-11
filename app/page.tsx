import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Merritt Media Server"
};

export default function Page() {
  
  return (
    <main className="flex justify-center items-center w-min-screen h-max-screen">
      <h1 className="title">Welcome to Merritt Media Server!</h1>
      <p>Please <a href='/login'>Log-In</a> to continue.</p>
    </main>
  );

};